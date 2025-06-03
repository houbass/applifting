import { Button } from "@mui/material";

// Types
import { UseFormRegister } from "react-hook-form";
import { NewArticleFormData } from "@/types/types";
import { useRef } from "react";

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
        accept="image/*"
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
