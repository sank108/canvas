import React from 'react'
import { useOnDraw } from './Hooks'

const Canva = ({
    width,height
}) => {

    const setCanvasRef = useOnDraw(onDraw);

    function onDraw(ctx,point,previousPointRef,rectCurrentX,rectCurrentY) {
      // drawLine(previousPointRef,point,ctx,"#000000",5);
      drawSquare(previousPointRef,point,ctx,rectCurrentX,rectCurrentY);
    }



    function drawSquare(start,end,ctx,rectCurrentX,rectCurrentY){
      
      start = start ?? end;
      
      ctx.beginPath();
      // ctx.arc(start.x,start.y,2,0,2 * Math.PI);
      //ctx.strokeRect(start.x,start.y,rectCurrentX-start.x,rectCurrentY-start.y);
      ctx.strokeRect(start.x,start.y,rectCurrentX,rectCurrentY);
      // console.log(start.x+rectCurrentX);
      // console.log(start.y+rectCurrentY);
      
      
    
      
      
      

    }

    function drawLine(
      start,
      end,
      ctx,
      color,
      width
    ) {
      start = start ?? end;
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.moveTo(start.x,start.y);
      ctx.lineTo(end.x,end.y);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(start.x,start.y,2,0,2 * Math.PI);
      ctx.fill();
      
    }


    
  return (
    <canvas 
        width={width} 
        height={height}
        className=''
        ref={setCanvasRef}
    ></canvas>
  )
}

export default Canva