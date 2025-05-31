import { Button } from "@mui/material";

// Types
import { UseFormRegister } from "react-hook-form";
import { NewArticleFormData } from "@/pages/create-article";

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
  register?: UseFormRegister<NewArticleFormData>;
}

// TODO make input logic better
export default function ImgUploadBtn({
  onChange,
  variant = "text",
  color = "primary",
  register,
}: Props) {
  return (
    <Button variant={variant} color={color} component="label">
      Upload an Image
      {register ? (
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          {...register("image", { required: "Image is required" })}
          onChange={onChange}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onChange}
        />
      )}
    </Button>
  );
}
