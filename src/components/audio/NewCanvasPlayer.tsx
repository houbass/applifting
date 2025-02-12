import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function NewCanvasPlayer({
  url
}: {url: string}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    async function drawWaveform() {
      if (!ctx) return;
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const rawData = audioBuffer.getChannelData(1);
      const sampleSize = Math.floor(rawData.length / canvas.width);
      const filteredData = [];

      for (let i = 0; i < canvas.width; i ++) {
        if(i % 4 === 0) {          
          const slice = rawData.slice(i * sampleSize, (i + 1) * sampleSize);
          let avarage = 0;
          
          slice.forEach((item) => {
            avarage += Math.abs(item)
          })
          avarage = avarage / slice.length
          // TODO normalize option (use max)
          //const max = Math.max(...Array.from(slice));

          filteredData.push(avarage);
        } else {
          filteredData.push(0)
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      
      for (let i = 0; i < filteredData.length; i++) {
        const x = i;
        const y = Math.abs(filteredData[i] * (canvas.height * 1.5));
        ctx.moveTo(x, canvas.height / 2 - y);
        ctx.lineTo(x, canvas.height / 2 + y);
      }

      ctx.stroke()
    }

    drawWaveform();
  }, []);

  // TODO resize pres Box ref.height + onResize listener s debouncem
  return (
    <Box>
      <audio ref={audioRef} controls src={url}></audio>
      <canvas ref={canvasRef} width={600} height={50}></canvas>
    </Box>
  );
}
