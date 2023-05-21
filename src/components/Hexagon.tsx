import classNames from "classnames";
import * as React from "react";
import { COLORS } from "../assets/colors";
import HexagonTile from "../models/hexagonTile";
import Point from "../models/point";
import { hexToPixel } from "../services/hexService";
import { calculateCoordinates, LayoutDimension } from "./Layout";

type H = { data?: any; hex: HexagonTile; props: HexagonProps };

export type HexagonDragEventHandler<T = Element, AdditionalData = any> = (
  event: React.DragEvent<T>,
  h: H,
  additionalData?: AdditionalData
) => void;

export type HexagonDragDropEventHandler<T = Element, AdditionalData = any> = (
  event: React.DragEvent<T>,
  h: H,
  additionalData: AdditionalData
) => void;

export type HexagonMouseEventHandler<T = SVGGElement> = (
  event: React.MouseEvent<T, globalThis.MouseEvent>,
  h: H
) => void;

export type HexagonProps = {
  hex: HexagonTile;
  layout: LayoutDimension;
  fill?: string;
  className?: string;
  cellStyle?: React.CSSProperties | undefined;
  data?: any;
  onMouseEnter?: HexagonMouseEventHandler;
  onMouseLeave?: HexagonMouseEventHandler;
  onClick?: HexagonMouseEventHandler;
  onDragStart?: HexagonDragEventHandler;
  onDragEnd?: HexagonDragEventHandler;
  onDragOver?: HexagonDragEventHandler;
  onDrop?: HexagonDragDropEventHandler<any, TargetProps>;
  onMouseOver?: HexagonMouseEventHandler;
  children?: React.ReactNode | React.ReactNode[];
  onCtrlMouseClick?: HexagonMouseEventHandler;
};

type TargetProps = {
  hex: HexagonTile;
  pixel: Point;
  data?: any;
  fill?: string;
  className?: string;
};

/**
 * Renders a Hexagon cell at the given rqs-based coordinates.
 */
export function Hexagon(
  props: HexagonProps &
    Omit<
      React.SVGProps<SVGGElement>,
      | "transform"
      | "onDragStart"
      | "onDragEnd"
      | "onDrop"
      | "onDragOver"
      | "onMouseEnter"
      | "onClick"
      | "onMouseOver"
      | "onMouseLeave"
    >
) {
  // destructure props into their values
  const {
    hex,
    layout,
    fill,
    cellStyle,
    className,
    children,
    onDragStart,
    onDragEnd,
    onDrop,
    onDragOver,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
    data,
    fillOpacity,
    ...rest
  } = props;

  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const fillId = fill ? `url(#${fill})` : undefined;
  const draggable = { draggable: true } as any;
  const cellStyleModified = {
    ...cellStyle,
    stroke: isMouseOver ? COLORS.red[5] : cellStyle?.stroke,
    strokeWidth: isMouseOver ? 1.5 : cellStyle?.strokeWidth,
  };

  const pixel = hexToPixel(hex, layout);

  const angle = layout.orientation ? 0 : Math.PI / 6;
  const cornerCoords = calculateCoordinates(layout.size.x, angle);

  const points = cornerCoords.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <g
      className={classNames("hexagon-group", className)}
      transform={`translate(${pixel.x + layout.size.x}, ${
        pixel.y + layout.size.y
      })`}
      {...rest}
      {...draggable}
      onDragStart={(e) => {
        if (onDragStart) {
          const targetProps: TargetProps = {
            hex: hex,
            pixel,
            data: data,
            fill: fill,
            className: className,
          };
          e.dataTransfer.setData("hexagon", JSON.stringify(targetProps));
          onDragStart(e, { data, hex, props });
        }
      }}
      onDragEnd={(e) => {
        if (onDragEnd) {
          e.preventDefault();
          const success = e.dataTransfer.dropEffect !== "none";
          onDragEnd(e, { hex, props }, success);
        }
      }}
      onDrop={(e) => {
        if (onDrop) {
          e.preventDefault();
          const target = JSON.parse(e.dataTransfer.getData("hexagon"));
          onDrop(e, { data, hex, props }, target);
        }
      }}
      onDragOver={(e) => {
        if (onDragOver) {
          onDragOver(e, { data, hex, props });
        }
      }}
      onMouseEnter={(e) => {
        setIsMouseOver(true);
        if (onMouseEnter) {
          onMouseEnter(e, { data, hex, props });
        }
      }}
      onClick={(e) => {
        if (onClick) {
          onClick(e, { data, hex, props });
        }
      }}
      onMouseOver={(e) => {
        if (onMouseOver) {
          onMouseOver(e, { data, hex, props });
        }
      }}
      onMouseLeave={(e) => {
        setIsMouseOver(false);
        if (onMouseLeave) {
          onMouseLeave(e, { data, hex, props });
        }
      }}
      onKeyDown={(e) => {
        if (e.ctrlKey) {
        }
      }}
    >
      <g className="hexagon">
        <polygon points={points} fill={fillId} style={cellStyleModified} />
        {children}
      </g>
    </g>
  );
}

export default Hexagon;
