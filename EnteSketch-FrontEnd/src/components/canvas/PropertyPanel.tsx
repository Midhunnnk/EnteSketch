import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useShapeStore } from "@/hooks/useShapeStore";

export default function PropertyPanel() {
  const shapes = useShapeStore((state) => state.shapes);
  const selectedShapeId = useShapeStore((state) => state.selectedShapeId);
  const updateShape = useShapeStore((state) => state.updateShape);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Find the selected shape
  const selectedShape = shapes.find((shape) => shape.id === selectedShapeId);

  // When the selectedShapeId changes, open the sheet if a shape is selected
  useEffect(() => {
    if (selectedShapeId) {
      setIsSheetOpen(true); // Open the sheet when a shape is selected
    }
  }, [selectedShapeId]);

  if (!selectedShape) {
    return <div className="h-screen "></div>;
  }

  return (

        <div className="w-64 grid gap-4 py-4">
          {/* Position */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="x" className="text-right">
              X Position
            </Label>
            <Input
              id="x"
              value={selectedShape.x}
              onChange={(e) =>
                updateShape({ id: selectedShape.id, x: Number(e.target.value) })
              }
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="y" className="text-right">
              Y Position
            </Label>
            <Input
              id="y"
              value={selectedShape.y}
              onChange={(e) =>
                updateShape({ id: selectedShape.id, y: Number(e.target.value) })
              }
              className="col-span-3"
            />
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width
            </Label>
            <Input
              id="width"
              value={selectedShape.width}
              onChange={(e) =>
                updateShape({ id: selectedShape.id, width: Number(e.target.value) })
              }
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height
            </Label>
            <Input
              id="height"
              value={selectedShape.height}
              onChange={(e) =>
                updateShape({ id: selectedShape.id, height: Number(e.target.value) })
              }
              className="col-span-3"
            />
          </div>

          {/* Color */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Input
              id="color"
              type="color"
              value={selectedShape.fill}
              onChange={(e) =>
                updateShape({ id: selectedShape.id, fill: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>

  
  );
}
