import React from "react";

export default function Effects() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-red-300 rounded-full opacity-30 animate-float-slow"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-yellow-300 rounded-full opacity-30 animate-float-medium"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-red-200 rounded-full opacity-40 animate-float-fast"></div>
      <div className="absolute bottom-1/3 right-1/2 w-32 h-32 bg-yellow-200 rounded-full opacity-40 animate-float-slow"></div>
    </div>
  );
}
