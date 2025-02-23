
export interface User {
  email: string
  uid: string
}

export interface Alert {
  text: string,
  type: "info" | "success" | "error"
}