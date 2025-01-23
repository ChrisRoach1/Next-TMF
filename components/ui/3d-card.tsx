"use client";
import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const MouseEnterContext = createContext<{
  mouseEnter: boolean;
  setMouseEnter: (mouseEnter: boolean) => void;
}>({
  mouseEnter: false,
  setMouseEnter: () => {},
});

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setPosition({ x, y });
  };

  return (
    <MouseEnterContext.Provider value={{ mouseEnter, setMouseEnter }}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          onMouseMove={handleMouseMove}
          className={cn(
            "relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transform: mouseEnter
              ? `rotateY(${(position.x - 0.5) * 20}deg) rotateX(${
                  (position.y - 0.5) * 20
                }deg) scale3d(1.1, 1.1, 1.1)`
              : "rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const CardItem = ({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  as?: any;
}) => {
  const { mouseEnter } = useContext(MouseEnterContext);
  return (
    <Tag
      className={cn("transition-transform duration-200 ease-linear", className)}
      style={{
        transform: mouseEnter
          ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`
          : "translateX(0px) translateY(0px) translateZ(0px)",
      }}
    >
      {children}
    </Tag>
  );
}; 