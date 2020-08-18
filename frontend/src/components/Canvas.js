import React, { useEffect, useRef } from "react";

/**
 * Props:
 * objects - list of objects to draw, e.g.
 * [{ type: "strokeRectangle", color: #00FFFF", x: 100, y: 100, width: 200, height: 100 }]
 */
const Canvas = ({ objects, imageSrc }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      objects.forEach((object) => {
        switch (object.type) {
          case "strokeRectangle": {
            const { color, x, y, width, height } = object;
            ctx.strokeStyle = color;
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, width, height);
            break;
          }

          default:
            break;
        }
      });
    };
  }, [objects, imageSrc]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
