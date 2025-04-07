import { Shape } from "@/lib/types";
import { create } from "zustand";

interface ShapeStore {
  shapes: Shape[]; // Fixed the property name
  toggleShape: (id: string) => void; // Fixed the function name
  addShape: (type: Shape["type"]) => void;
  selectedShapeId: string | null; // ✅ Track selected shape
  selectShape: (id: string | null) => void;
  updateShape: (updatedShape:Partial<UpdateShapeProps>)=> void;

}

interface UpdateShapeProps {
    id: string;
    x: number;
    y: number;
    fill?: string;
    width?: number;
    height?: number;
    rotation:number;
}

export const useShapeStore = create<ShapeStore>((set) => ({
  shapes: [],

  selectedShapeId: null,

  toggleShape: (id) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === id
          ? {
              ...shape,
            }
          : shape
      ),
    })),

  selectShape: (id) => set({ selectedShapeId: id }),

  addShape: (type: Shape["type"]) =>
    set((state) => {
      const newShape: Shape | Shape[] | null = (() => {
        switch (type) {
          case "Rectangle":
            return {
              id: crypto.randomUUID(),
              x: 100,
              y: 100,
              fill: "",
              width: 120,
              height: 80,

              type: "Rectangle",
              name: "Rectangle",
            };

          case "Circle":
            return {
              id: crypto.randomUUID(),
              x: 200,
              y: 200,
              fill: "",
              width: 80, // Diameter
              height: 80, // Diameter

              type: "Circle",
              name: "Circle",
            };

          case "Arrow":
            return {
              id: crypto.randomUUID(),
              x: 200,
              y: 200,
              fill: "",
              width: 80, // Diameter
              height: 80, // Diameter

              type: "Arrow",
              name: "Arrow",
            };

          default:
            return null; // Ensure a valid return type
        }
      })();

      return newShape
        ? {
            shapes: [
              ...state.shapes,
              ...(Array.isArray(newShape) ? newShape : [newShape]),
            ],
          }
        : state;
    }),


    updateShape: (updatedShape: Partial<UpdateShapeProps>) =>
        set((state) => ({
          shapes: state.shapes.map((shape) =>
            shape.id === updatedShape.id ? { ...shape, ...updatedShape } : shape
          ),
        })),
      
}));
