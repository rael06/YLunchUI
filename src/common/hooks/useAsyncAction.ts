import React from "react";
import {
  defaultErrorRecoveryTimeout,
  defaultSuccessRecoveryTimeout,
} from "./../constants/timeouts";

type AsyncActionStatus = "idling" | "loading" | "success" | "error";

type ActParams = {
  asyncAction: () => Promise<unknown>;
  onSuccessAsync?: () => Promise<void>;
  onSuccessTimeoutAsync?: () => Promise<void>;
  onErrorAsync?: (error: unknown) => Promise<void>;
  onErrorTimeoutAsync?: () => Promise<void>;
  successRecoveryTimeout?: number;
  errorRecoveryTimeout?: number;
};

function useAsyncAction() {
  const [status, setStatus] = React.useState<AsyncActionStatus>("idling");

  async function actAsync({
    asyncAction,
    onSuccessAsync = async () => {},
    onSuccessTimeoutAsync = async () => {},
    onErrorAsync = async () => {},
    onErrorTimeoutAsync = async () => {},
    successRecoveryTimeout = defaultSuccessRecoveryTimeout,
    errorRecoveryTimeout = defaultErrorRecoveryTimeout,
  }: ActParams) {
    setStatus("loading");
    try {
      await asyncAction();
      setStatus("success");
      await onSuccessAsync();
      setTimeout(async () => {
        setStatus("idling");
        await onSuccessTimeoutAsync();
      }, successRecoveryTimeout);
    } catch (error) {
      setStatus("error");
      await onErrorAsync(error);
      setTimeout(async () => {
        setStatus("idling");
        await onErrorTimeoutAsync();
      }, errorRecoveryTimeout);
    }
  }

  return { actAsync, status };
}

export default useAsyncAction;
