
export interface AudioPreview {
  url: string
  file: File
}

export interface Message {
  text: string,
  type: "info" | "success" | "error"
}
