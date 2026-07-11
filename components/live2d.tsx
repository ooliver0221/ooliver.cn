"use client";

import { useEffect, useRef, useState } from "react";
import { HashLoader } from "react-spinners";

import { personalConfig } from "@/config/personal";

const CUBISM2_URLS = [
  "/live2d.js",
  "/live2d.min.js",
  "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display@master/lib/live2d.min.js",
  "https://cdn.jsdelivr.net/gh/nova1751/pixi-live2d-display@master/lib/live2d.min.js",
];

function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${url}`));
    document.head.appendChild(s);
  });
}

async function loadCubism2Runtime() {
  for (const url of CUBISM2_URLS) {
    try {
      await loadScript(url);
      return;
    } catch {
      continue;
    }
  }
  throw new Error("Cubism 2 runtime not found. Place live2d.js in public/.");
}

interface Live2DProps {
  className?: string;
}

export default function Live2D({ className }: Live2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<import("pixi.js").Application | null>(null);
  const modelRef = useRef<import("pixi-live2d-display/cubism2").Live2DModel | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !personalConfig.live2d.enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const resizeApp = () => {
      const app = appRef.current;
      const model = modelRef.current;
      if (!app || !model) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;

      app.renderer.resize(w, h);

      const scale = Math.max(
        0.02,
        Math.min(0.13, (w / model.width) * 0.85, (h / model.height) * 0.75),
      );

      model.scale.set(scale);
      model.x = w / 2;
      model.y = h / 2;
    };

    const setup = async () => {
      // Strict Mode remount: re-attach existing app and re-observe
      if (appRef.current) {
        container.appendChild(appRef.current.view as HTMLCanvasElement);
        resizeApp();
        observerRef.current = new ResizeObserver(() => {
          resizeApp();
        });
        observerRef.current.observe(container);
        return;
      }

      try {
        await loadCubism2Runtime();

        const [PIXI, { Live2DModel }] = await Promise.all([
          import("pixi.js"),
          import("pixi-live2d-display/cubism2"),
        ]);

        if (cancelled) return;

        const w = container.clientWidth || 300;
        const h = container.clientHeight || 300;

        const app = new PIXI.Application({
          width: w,
          height: h,
          backgroundAlpha: 0,
          antialias: true,
        });
        appRef.current = app;
        const canvas = app.view as HTMLCanvasElement;
        canvas.style.display = "block";
        container.appendChild(canvas);

        const model = await Live2DModel.from(
          `/${personalConfig.live2d.modelPath}`,
          { ticker: PIXI.Ticker.shared },
        );

        if (cancelled) {
          app.destroy(true, { children: true });
          appRef.current = null;
          return;
        }

        modelRef.current = model;

        model.pivot.set(model.width / 2, model.height * 0.63);

        model.eventMode = "static";
        model.cursor = "grab";

        let dragging = false;
        let dragX = 0;
        let dragY = 0;

        model.on("pointerdown", (e: import("pixi.js").FederatedPointerEvent) => {
          dragging = true;
          dragX = e.global.x - model.x;
          dragY = e.global.y - model.y;
          model.cursor = "grabbing";
        });
        model.on("pointermove", (e: import("pixi.js").FederatedPointerEvent) => {
          if (dragging) {
            model.x = e.global.x - dragX;
            model.y = e.global.y - dragY;
          }
        });
        model.on("pointerup", () => { dragging = false; model.cursor = "grab"; });
        model.on("pointerupoutside", () => { dragging = false; model.cursor = "grab"; });

        app.stage.addChild(model);
        resizeApp();

        observerRef.current = new ResizeObserver(() => {
          resizeApp();
        });
        observerRef.current.observe(container);

        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Live2D 模型加载失败");
          setLoading(false);
        }
      }
    };

    setup();

    return () => {
      cancelled = true;
      // Detach canvas but keep PIXI app alive for Strict Mode remount
      if (appRef.current) {
        const canvas = appRef.current.view as HTMLCanvasElement;
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  if (!personalConfig.live2d.enabled) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
    >
      {loading && !error && (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#eef0f7" size={40} />
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center w-full h-full text-xs text-gray-500 dark:text-gray-400 text-center px-2">
          {error}
        </div>
      )}
    </div>
  );
}
