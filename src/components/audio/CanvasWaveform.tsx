
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { debounce } from "lodash";

interface Props {
  data: number[];
  height?: number;
}

const CanvasWaveform = ({
  data, height = 50
}: Props) =>{

  // States
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasTimerRef = useRef<HTMLCanvasElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // TODO total time with data
  const totalTime = 260000; // ms
  const [currentTime, setCurrentTime] = useState<number>(150000);

  // Resizing
  useEffect(() => {
    // resize on initial render
    onResize();

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  // draw waveform
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const xDelta = canvasWidth / data.length;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    
    async function drawWaveform() {
      if (!ctx) return;
    
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      
      for (let i = 0; i < data.length; i++) {

        // Biggere space when it getting smaller
        let divisor = 1;

        if( canvas.width >= 300 && canvas.width < 500) {
          divisor = 2;
        }

        if(canvas.width < 300) {
          divisor = 3;
        }

        if(i % divisor !== 0) continue;
        const x = i * xDelta;
        const y = Math.abs(data[i] * (canvas.height * 2));
        ctx.moveTo(x, canvas.height / 2 - y);
        ctx.lineTo(x, canvas.height / 2 + y);
      }

      ctx.stroke()
    }

    drawWaveform();
  }, [containerWidth]);
  
  // Draw timer
  useEffect(() => {
    if (!canvasTimerRef.current) return;
    const canvas = canvasTimerRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const timeRatio = currentTime / totalTime;
    const x = canvasWidth * timeRatio;

    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvasWidth, canvasHeight);

    function drawTimer() {
      if (!ctx) return;
      ctx.beginPath();

      // Time field
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, x, canvasHeight);
  
      // Time line
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.beginPath(); 
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }

    drawTimer();
  }, [containerWidth, currentTime]);

  // Utils
  const debouncedResize = useCallback(debounce(onResize, 200), [])

  function onResize() {
    if(!containerRef.current) return;
    const thisWidth = containerRef.current.offsetWidth;
    setContainerWidth(thisWidth)
  }

  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if(!isInteracting) return;
    const pickedX = e.nativeEvent.offsetX;
    const pickedTime = getPickedTime(pickedX) || 0;
    setCurrentTime(pickedTime);
  }

  function onMouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    setIsInteracting(true)
    const pickedX = e.nativeEvent.offsetX;
    const pickedTime = getPickedTime(pickedX) || 0;
    setCurrentTime(pickedTime)
  }

  function onTouchMove(e: React.TouchEvent<HTMLCanvasElement>) {
    console.log(e.touches)
    if(!canvasTimerRef.current) return;
    const rect = canvasTimerRef.current.getBoundingClientRect();
    const pickedX = e.touches[0].clientX - rect.left;
    const pickedTime = getPickedTime(pickedX) || 0;
    setCurrentTime(pickedTime)
  }

  function getPickedTime(pickedX: number) {
    if(!containerRef.current) return;
    const canvasWidth = containerRef.current.offsetWidth;
    const ratio = pickedX / canvasWidth;
    return totalTime * ratio;
  }

  return (
    <Box ref={containerRef} width="100%" height={height}>
      {containerWidth && (
        <>
          <Box position="absolute">
            <canvas ref={canvasRef} width={containerWidth} height={height} />
          </Box>

          <Box position="absolute">
            <canvas 
              onClick={() => setIsInteracting(false)} 
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onTouchMove={onTouchMove}
              ref={canvasTimerRef} 
              width={containerWidth} 
              height={height} 
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default CanvasWaveform;