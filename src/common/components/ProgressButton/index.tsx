import { CheckCircle, Error } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";

export type ProgressButtonStatus = "idling" | "loading" | "success" | "error";
type Props = {
  label: string;
  onClick?: () => void;
  status: ProgressButtonStatus;
  type?: "submit" | "button";
  variant?: "outlined" | "text" | "contained";
};

const colors: Record<
  ProgressButtonStatus,
  "primary" | "secondary" | "success" | "error"
> = {
  idling: "primary",
  loading: "secondary",
  success: "success",
  error: "error",
};

export default function ProgressButton({
  label,
  onClick,
  status,
  type = "button",
  variant = "outlined",
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "auto",
      }}
    >
      <Button
        type={type}
        onClick={onClick}
        disabled={status === "loading"}
        variant={variant}
        color={colors[status]}
      >
        <span
          style={{ visibility: status === "idling" ? "visible" : "hidden" }}
        >
          {label}
        </span>
      </Button>
      {status === "loading" && (
        <CircularProgress
          size={20}
          style={{
            position: "absolute",
          }}
        />
      )}
      {status === "success" && (
        <CheckCircle
          color="success"
          style={{
            position: "absolute",
          }}
        />
      )}
      {status === "error" && (
        <Error
          color="error"
          style={{
            position: "absolute",
          }}
        />
      )}
    </Box>
  );
}
