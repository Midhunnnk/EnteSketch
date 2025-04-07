"use client";

import React from "react";
import { Dock, DockIcon } from "../magicui/dock";
import { useShapeStore } from "@/hooks/useShapeStore";

export type IconProps = React.HTMLAttributes<SVGElement>;



export function CanvasDock() {
 
  const addShape = useShapeStore((state)=>state.addShape)
  
  return (
    <div className="">
      <Dock direction="middle" className="fixed left-0 right-0 z-50 ">
        <DockIcon
        onClick={()=>{
            addShape("Rectangle")
        }}
        >
          <Icons.sqaure className="size-6" />
        </DockIcon>
        <DockIcon
         onClick={()=>{
          addShape("Circle")
         }}
        >
          <Icons.circle className="size-6" />
        </DockIcon>

        <DockIcon 
        
        onClick={()=>{
          addShape("Arrow")
         }}
        >
          <Icons.linearrow className="size-6" />
        </DockIcon>

        <DockIcon>
          <Icons.pencil className="size-6" />
        </DockIcon>
      </Dock>
    </div>
  );
}

const Icons = {
  sqaure: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H17.8031C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2837 20.7822 19.9074C21 19.48 21 18.921 21 17.8031V6.19691C21 5.07899 21 4.5192 20.7822 4.0918C20.5905 3.71547 20.2837 3.40973 19.9074 3.21799C19.4796 3 18.9203 3 17.8002 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  circle: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  linearrow: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3646 5.63623H11.2939M18.3646 5.63623L18.3643 12.7073M18.3646 5.63623L5.63672 18.3642"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pencil: (props: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="black" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  ),
};
