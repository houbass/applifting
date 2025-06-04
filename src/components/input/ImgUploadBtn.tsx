import { useRef } from "react";
import { Button } from "@mui/material";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

export default function ImgUploadBtn({
  onChange,
  variant = "text",
  color = "primary",
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={onChange}
      />

      <Button
        variant={variant}
        color={color}
        onClick={() => inputRef.current?.click()}
      >
        Select File
      </Button>
    </>
  );
}
