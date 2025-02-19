
export interface AudioPreview {
  url: string
  file: File
  duration: number
  waveform?: number[]
}

export interface FormData {
  projectName: string,
  instrumentSelection: string[],
  styleSelection: string[],
  audioPreview: AudioPreview | null
}

export interface AudioCollectionItem {
  id: string;
  duration: number;
  instruments: string[];
  projectName: string;
  style: string[];
  timeStamp: number;
  uid: string;
  waveform: number[];
  url: string;
  userName: string;
}