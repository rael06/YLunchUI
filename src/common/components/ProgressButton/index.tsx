import { CheckCircle, Error } from "@mui/icons-material";
import { Box, Button, CircularProgress, SxProps } from "@mui/material";

export type ProgressButtonStatus = "idling" | "loading" | "success" | "error";
type Props = React.ComponentPropsWithoutRef<"button"> & {
  label: string;
  onClick?: () => void;
  status: ProgressButtonStatus;
  type?: "submit" | "button";
  variant?: "outlined" | "text" | "contained";
  sx?: SxProps;
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
  disabled,
  sx = {},
}: Props) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "auto",
      }}
    >
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled || status === "loading"}
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
