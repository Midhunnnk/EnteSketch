import React, { useRef } from "react";
import { Stage, Layer, Circle, Rect, Transformer, Arrow } from "react-konva";
import { CanvasDock } from "../dock/Dock";
import { useShapeStore } from "@/hooks/useShapeStore";
import Konva from "konva";
import { Shape } from "@/lib/types";
import PropertyPanel from "./PropertyPanel";
import { Html } from "react-konva-utils";

const Canvas: React.FC = () => {
  const canvasShapes = useShapeStore((state) => state.shapes);
  const selectedShapeId = useShapeStore((state) => state.selectedShapeId);
  const transformRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<{ [key: string]: Konva.Node | null }>({});
  const selectShape = useShapeStore((state) => state.selectShape);
  const updateShape = useShapeStore((state) => state.updateShape);

  React.useEffect(() => {
    if (!transformRef.current) return;

    // Find the selected node from shapeRefs
    const selectedNode = selectedShapeId
      ? shapeRefs.current[selectedShapeId]
      : null;

    if (selectedNode) {
      // Ensure the Transformer is applied to the correct node
      transformRef.current.nodes([selectedNode]);
      transformRef.current.getLayer()?.batchDraw();
    } else {
      transformRef.current.nodes([]); // Clear selection if nothing is selected
      transformRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShapeId, canvasShapes]); // Depend on `shapes` to update correctly

  const renderShape = (shape: Shape) => {
    const commonProps = {
      ref: (el: Konva.Node | null) => {
        shapeRefs.current[shape.id] = el;
      },
      x: shape.x,
      y: shape.y,
      fill: shape.fill,
      draggable: true,
      onClick: () => {
        // toggleShape(shape.id);
        selectShape(shape.id);
      },
      onDragEnd: (e: any) => {
        const newX = Math.max(0, e.target.x()); // Prevent left movement beyond x = 0
        const newY = Math.max(0, e.target.y()); // Prevent top movement beyond y = 0

        // updateShape({ ...shape, x: newX, y: newY });
      },
      onDragMove: (e: any) => {
        const shape = e.target;
        const box = shape.getClientRect();

        let newX = shape.x();
        let newY = shape.y();

        // Restrict Left and Top movement
        if (box.x < 0) newX = 0;
        if (box.y < 0) newY = 0;

        // if(stageRef.current!=null)
        // {
        //   if (box.x + box.width > stageRef.current.width()) {
        //     newX = stageRef.current.width() - box.width;
        //   }
        //   if (box.y + box.height > stageRef.current.height()) {
        //     newY = stageRef.current.height() - box.height;
        //   }
        // }
        // Restrict Right and Bottom movement

        shape.setAttrs({ x: newX, y: newY });
      },
      onTransformEnd: (e: any) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        updateShape({
          ...shape,
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
        });
      },
    };

    switch (shape.type) {
      case "Rectangle":
        return (
          <Rect
            key={shape.id}
            {...commonProps}
            width={shape.width}
            height={shape.height}
            //   rotation={shape.rotation}
            stroke="black"
          />
        );

      case "Circle":
        return (
          <Circle
            key={shape.id}
            {...commonProps}
            radius={shape.width / 2}
            stroke="black"
          />
        );

      case "Arrow":
        return (
          <Arrow
            key={shape.id}
            {...commonProps}
            points={[0, 0, 100, 100]}
            stroke={"black"}
          />
        );

      default:
        return null;
    }
  };

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <div className="w-full ">
      <CanvasDock />

      <Stage
        height={window.innerHeight}
        width={window.innerWidth}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {canvasShapes.map(renderShape)}

          <Html>
            <div className="fixed ">
              <PropertyPanel />
            </div>
          </Html>
          {/* Transformer */}
          {selectedShapeId && (
            <Transformer
              ref={transformRef}
              flipEnabled={false}
              boundBoxFunc={(oldBox, newBox) => {
                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5)
                  return oldBox;
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
