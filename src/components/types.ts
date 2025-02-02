
export interface AudioPreview {
  url: string
  file: File
}

export interface FormData {
  projectName: string,
  instrumentSelection: string[],
  styleSelection: string[],
  audioPreview: AudioPreview | null
}
