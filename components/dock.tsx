"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Link, Tooltip } from "@heroui/react";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-[50px] sm:h-[58px] p-1.5 sm:p-2 flex items-end gap-1.5 sm:gap-2 rounded-2xl",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseLeave={() => mouseX.set(Infinity)}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        {...props}
        className={cn(dockVariants({ className }), className)}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
  tooltip?: string;
  url?: string;
  qrCode?: string;
}

const DockIcon = ({
  size: _size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  tooltip,
  url,
  qrCode,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    if (!qrOpen) return;
    const handler = () => setQrOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [qrOpen]);

  if (qrCode) {
    const toggleQr = (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setQrOpen((v) => !v);
    };

    return (
      <Tooltip content={tooltip} placement="bottom">
        <div ref={containerRef} className="relative group">
          <motion.div
            ref={ref}
            className={cn(
              "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-midnight border-2 border-transparent dark:border-knight dark:bg-darkBg",
              className,
            )}
            style={{ width }}
            onClick={toggleQr}
            onTouchEnd={toggleQr}
            {...props}
          >
            {children}
          </motion.div>
          <div
            className={cn(
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50",
              qrOpen ? "block" : "hidden group-hover:block",
            )}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 ring-1 ring-black/5 w-44 h-44">
              <img
                alt={tooltip ?? "QR Code"}
                className="w-full h-full rounded-lg object-contain"
                src={qrCode}
              />
            </div>
          </div>
        </div>
      </Tooltip>
    );
  }

  const iconButton = (
    <motion.div
      ref={ref}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-midnight border-2 border-transparent dark:border-knight dark:bg-darkBg",
        className,
      )}
      style={{ width }}
      {...props}
    >
      {children}
    </motion.div>
  );

  return (
    <Tooltip content={tooltip} placement="bottom">
      <Link isExternal color="foreground" href={url}>
        {iconButton}
      </Link>
    </Tooltip>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
