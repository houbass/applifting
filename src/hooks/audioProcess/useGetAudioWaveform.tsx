import { useEffect, useState } from "react";

const useGetAudioWaveform = (url: string | undefined) => {
  // States
  const [audioWaveData, setAudioWaveData] = useState<number[] | undefined>(
    undefined
  );

  // Extract meta data from audio file
  async function getWaveform() {
    if (!url) return;
    const numberOfSlices = 600;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const rawData = audioBuffer.getChannelData(1);
    const sampleSize = Math.floor(rawData.length / numberOfSlices);
    const filteredData = [];

    for (let i = 0; i < numberOfSlices; i++) {
      if (i % 4 === 0) {
        const slice = rawData.slice(i * sampleSize, (i + 1) * sampleSize);
        let avarage = 0;

        slice.forEach((item) => {
          avarage += Math.abs(item);
        });
        avarage = avarage / slice.length;

        filteredData.push(avarage);
      }
    }

    setAudioWaveData(filteredData);
  }

  useEffect(() => {
    if (url) {
      getWaveform();
    } else {
      setAudioWaveData(undefined);
    }
  }, [url]);

  return audioWaveData;
};

export default useGetAudioWaveform;
