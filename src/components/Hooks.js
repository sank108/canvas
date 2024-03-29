import React, { useEffect, useRef, useState } from 'react'

export function useOnDraw (onDraw) {
    const canvasRef = useRef(null);

    const isDrawingRef = useRef(false);
    const mouseMoveListenerRef = useRef(null);
    const mouseDownListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    const previousPointRef = useRef(null);

    const [rectCurrentX,setRectCurrentX] = useState(0);
    const [rectCurrentY,setRectCurrentY] = useState(0);

    // useEffect(() => {
    //     return () => {
    //         if(mouseMoveListenerRef.current){
    //             window.removeEventListener("mousemove", mouseMoveListenerRef.current);
    //         }
    //         if(mouseUpListenerRef.current){
    //             window.removeEventListener("mouseup", mouseUpListenerRef.current);
    //         }
            
    //     }
    // },[]);


    function setCanvasRef(ref){
        if(!ref) return;
        if(canvasRef.current){
            canvasRef.current.removeEventListener("mousedown", mouseDownListenerRef.current);
        }
        
        canvasRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener();
    }

    function initMouseMoveListener () {
        const mouseMoveListener = (e) => {
            //console.log({x:e.clientX,y:e.clientY});
            if(isDrawingRef.current){
                const point = computePointInCanvas(e.clientX,e.clientY);
                setRectCurrentX(e.clientX);
                setRectCurrentY(e.clientY);
                //console.log(rectCurrentX);
                const ctx = canvasRef.current.getContext('2d');
                if(onDraw) onDraw(ctx,point,previousPointRef.current,rectCurrentX,rectCurrentY);
                let obj = {
                    a : previousPointRef.current,
                    b : point
                }

                // console.log(obj);
                previousPointRef.current = point;
                //console.log(obj);
            }
            
        }
        mouseMoveListenerRef.current = mouseMoveListener;
        window.addEventListener("mousemove",mouseMoveListener);
    }

    function initMouseUpListener () {
        const listener = () => {
            isDrawingRef.current = false;
            previousPointRef.current = null;
        }
        mouseUpListenerRef.current = listener;
        window.addEventListener("mouseup",listener);
    }

    function initMouseDownListener() {
        if(!canvasRef.current) return;
        const listener = () => {
            isDrawingRef.current = true;
            
        }
        mouseDownListenerRef.current = listener;

        canvasRef.current.addEventListener("mousedown",listener);
    }

    

    function computePointInCanvas(clientX,clientY){
        if(canvasRef.current){
            const boundingRect = canvasRef.current.getBoundingClientRect();
            //console.log(boundingRect);
            return{
                x: clientX - boundingRect.left,
                y: clientY - boundingRect.top
            }
        }else{
            return null;
        }
        
        
    }

    return setCanvasRef;
   
}

