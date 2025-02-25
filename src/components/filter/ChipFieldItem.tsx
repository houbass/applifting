import React from "react";
import { Box, Chip } from "@mui/material";

interface Props {
  label: string
  onClick?: () => void
  onDelete?: () => void
  size?: "small" | "medium"
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
}

const ChipFieldItem = ({
  label, onClick, onDelete, size = "small", color = "default",
}: Props) => {

  return (
    <Box 
      mb={1} 
      mr={1}
      display="inline-block"
    >
      <Chip 
        color={color} 
        label={label} 
        size={size}
        onClick={onClick}
        onDelete={onDelete}
      />
    </Box>
  )
}

export default ChipFieldItem;