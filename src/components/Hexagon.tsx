import classNames from "classnames";
import * as React from "react";
import { COLORS } from "../assets/colors";
import HexagonTile from "../models/HexagonTile";
import Point from "../models/Point";
import { hexToPixel } from "../services/HexService";
import { useLayoutContext } from "./Layout";

type H = { data?: any; state: { hex: HexagonTile }; props: HexagonProps };

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
  q: number;
  r: number;
  s: number;
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
    q,
    r,
    s,
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

  const { layout, points } = useLayoutContext();

  const svgRef = React.useRef<SVGElement>(null);

  const { hex, pixel } = React.useMemo(() => {
    const hex = { q, r, s, blocked: false };
    const pixel = hexToPixel(hex, layout);
    return {
      hex,
      pixel,
    };
  }, [q, r, s, layout]);

  // for backwards compatibility
  const state = { hex };

  const fillId = fill ? `url(#${fill})` : undefined;
  const draggable = { draggable: true } as any;
  const cellStyleModified = {
    ...cellStyle,
    stroke: isMouseOver ? COLORS.red[5] : cellStyle?.stroke,
    strokeWidth: isMouseOver ? "5" : cellStyle?.strokeWidth,
  };

  // const buildWall = (e: React.MouseEvent<SVGGElement>) => {
  //   if (e.ctrlKey && e.button === 0) {
  //     if (props.onCtrlMouseClick) {
  //       props.onCtrlMouseClick(e, { data, state, props });
  //     }
  //   }
  // };

  return (
    <g
      ref={svgRef}
      className={classNames("hexagon-group", className)}
      transform={`translate(${pixel.x}, ${pixel.y})`}
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
          onDragStart(e, { data, state, props });
        }
      }}
      onDragEnd={(e) => {
        if (onDragEnd) {
          e.preventDefault();
          const success = e.dataTransfer.dropEffect !== "none";
          onDragEnd(e, { state, props }, success);
        }
      }}
      onDrop={(e) => {
        if (onDrop) {
          e.preventDefault();
          const target = JSON.parse(e.dataTransfer.getData("hexagon"));
          onDrop(e, { data, state, props }, target);
        }
      }}
      onDragOver={(e) => {
        if (onDragOver) {
          onDragOver(e, { data, state, props });
        }
      }}
      onMouseEnter={(e) => {
        setIsMouseOver(true);
        if (onMouseEnter) {
          onMouseEnter(e, { data, state, props });
        }
      }}
      onClick={(e) => {
        if (onClick) {
          onClick(e, { data, state, props });
        }
      }}
      onMouseOver={(e) => {
        if (onMouseOver) {
          onMouseOver(e, { data, state, props });
        }
      }}
      onMouseLeave={(e) => {
        setIsMouseOver(false);
        if (onMouseLeave) {
          onMouseLeave(e, { data, state, props });
        }
      }}
      onKeyDown={(e) => {
        if (e.ctrlKey) {
        }
      }}
    >
      <g className="hexagon">
        {/* <defs>
          <pattern id="imgpattern" x="0" y="0" width="10" height="10">
            <image
              width="4%"
              height="7%"
              x="-7"
              y="-10"
              preserveAspectRatio="none"
              href={soldier}
            />
          </pattern>
        </defs> */}
        <polygon points={points} fill={fillId} style={cellStyleModified} />

        {children}
      </g>
    </g>
  );
}

export default Hexagon;
