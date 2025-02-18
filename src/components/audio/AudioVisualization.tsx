import React, { useEffect, useRef, useState } from "react";

const AudioVisualization = ({
  url
}: { url: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [bufferLength, setBufferLength] = useState<number>(0);
  const [dataArray, setDataArray] = useState<Uint8Array>(new Uint8Array(0));

  useEffect(() => {
    if (!audioRef.current) return;

    const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const analyserNode = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audioRef.current);
    
    source.connect(analyserNode);
    analyserNode.connect(ctx.destination);

    analyserNode.fftSize = 1024; // Defines the resolution of waveform
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    setAnalyser(analyserNode);
    setBufferLength(bufferLength);
    setDataArray(dataArray);

    return () => {
      ctx.close();
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    function draw() {
      if (!ctx || !analyser) return;
      animationFrameId = requestAnimationFrame(draw);
      
      analyser.getByteTimeDomainData(dataArray);
            
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.strokeStyle = "#ff5500";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, dataArray, bufferLength]);

  return (
    <div className="audio-player">
      <audio ref={audioRef} controls src={url}></audio>
      <canvas ref={canvasRef} width={60} height={60}></canvas>
    </div>
  );
}

export default AudioVisualization;