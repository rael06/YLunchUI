import { Button, CircularProgress } from "@mui/material";
import classes from "./styles.module.scss";

export type ProgressButtonStatus = "idling" | "loading" | "success" | "error";
type Props = {
  label: string;
  onClick: () => void;
  status: ProgressButtonStatus;
};

export default function ProgressButton({ label, onClick, status }: Props) {
  return (
    <div className={classes.wrapper}>
      <Button onClick={onClick} disabled={status === "loading"}>
        {status === "loading" ? "" : label}
      </Button>
      {status === "loading" && (
        <CircularProgress
          size={20}
          style={{
            position: "absolute",
          }}
        />
      )}
    </div>
  );
}
