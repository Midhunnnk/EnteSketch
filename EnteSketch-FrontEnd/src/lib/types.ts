export interface Shape {
    id: string;
    x: number;
    y: number;
    fill: string;
    width: number;
    height: number;
    type: "Rectangle" | "Circle" | "Arrow" ;
    name:string
    text?:string
  }
  