import { Button } from "@mui/material";

// Types
import { UseFormRegister } from "react-hook-form";
import { NewArticleFormData } from "@/pages/create-article";
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
  register: UseFormRegister<NewArticleFormData>;
}

// TODO make input logic better
export default function ImgUploadBtn({
  onChange,
  variant = "text",
  color = "primary",
  register,
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
