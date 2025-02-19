
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
