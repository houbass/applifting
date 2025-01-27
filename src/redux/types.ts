
export interface User {
  displayName: string
  email: string
  uid: string
}

export interface Alert {
  text: string,
  type: "info" | "success" | "error"
}