import { CheckCircle, Error } from "@mui/icons-material";
import { Button, CircularProgress, Box } from "@mui/material";
import classes from "./styles.module.scss";

export type ProgressButtonStatus = "idling" | "loading" | "success" | "error";
type Props = {
  label: string;
  onClick?: () => void;
  status: ProgressButtonStatus;
  type?: "submit" | "button";
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
        variant="outlined"
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
