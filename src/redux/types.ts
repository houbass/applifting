
export interface User {
  photoURL: string | null
  email: string
  uid: string
}

export interface Alert {
  text: string,
  type: "info" | "success" | "error"
}