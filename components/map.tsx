"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import L from "leaflet";

import { personalConfig } from "@/config/personal";

const TILE_URL =
  "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";

const DARK_FILTER =
  "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)";

export default function MapComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const { resolvedTheme } = useTheme();

  const applyTileBackgrounds = useCallback(
    (map: L.Map, color: string) => {
      const pane = map.getPane("tilePane");
      if (!pane) return;
      pane.querySelectorAll<HTMLElement>(".leaflet-tile").forEach((t) => {
        t.style.background = color;
      });
    },
    [],
  );

  const applyTheme = useCallback(
    (map: L.Map, dark: boolean) => {
      const container = map.getContainer();
      const tilePane = map.getPane("tilePane");
      if (!container || !tilePane) return;

      if (dark) {
        container.style.background = "#1a1a1a";
        tilePane.style.filter = DARK_FILTER;
      } else {
        container.style.background = "";
        tilePane.style.filter = "";
      }
      // Always fix tile seams — light background for light mode,
      // dark background for dark mode.
      applyTileBackgrounds(map, dark ? "#1a1a1a" : "#fef9f0");
    },
    [applyTileBackgrounds],
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: personalConfig.map.center as L.LatLngExpression,
      zoom: personalConfig.map.zoom,
      zoomControl: false,
      attributionControl: false,
    });

    const tiles = L.tileLayer(TILE_URL, {
      subdomains: ["1", "2", "3", "4"],
      maxZoom: 18,
    }).addTo(map);

    L.circleMarker(personalConfig.map.center as L.LatLngExpression, {
      radius: 8,
      fillColor: "#e74c3c",
      fillOpacity: 0.9,
      color: "#fff",
      weight: 2,
    }).addTo(map);

    mapRef.current = map;
    tileLayerRef.current = tiles;

    return () => {
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const tiles = tileLayerRef.current;
    if (!map || !tiles) return;

    applyTheme(map, resolvedTheme === "dark");

    const onTileLoad = () => {
      applyTheme(map, resolvedTheme === "dark");
    };
    tiles.on("load", onTileLoad);

    return () => {
      tiles.off("load", onTileLoad);
    };
  }, [resolvedTheme, applyTheme]);

  return <div ref={containerRef} className="w-full h-full" />;
}
