import React from "react";
import {
  defaultErrorRecoveryTimeout,
  defaultSuccessRecoveryTimeout,
} from "./../constants/timeouts";

type AsyncActionStatus = "idle" | "loading" | "success" | "error";

type ActAsyncParams<TError> = {
  asyncAction: () => Promise<unknown>;
  onSuccessAsync?: () => Promise<void>;
  onSuccessTimeoutAsync?: () => Promise<void>;
  onErrorAsync?: (error: TError) => Promise<void>;
  onErrorTimeoutAsync?: () => Promise<void>;
  successRecoveryTimeout?: number;
  errorRecoveryTimeout?: number;
};

function useAsyncAction<TError>() {
  const [status, setStatus] = React.useState<AsyncActionStatus>("idle");
  const [error, setError] = React.useState<TError>();

  async function actAsync({
    asyncAction,
    onSuccessAsync = async () => {},
    onSuccessTimeoutAsync = async () => {},
    onErrorAsync = async () => {},
    onErrorTimeoutAsync = async () => {},
    successRecoveryTimeout = defaultSuccessRecoveryTimeout,
    errorRecoveryTimeout = defaultErrorRecoveryTimeout,
  }: ActAsyncParams<TError>) {
    setStatus("loading");
    try {
      await asyncAction();
      setStatus("success");
      await onSuccessAsync();
      setTimeout(async () => {
        setStatus("idle");
        await onSuccessTimeoutAsync();
      }, successRecoveryTimeout);
    } catch (error) {
      setStatus("error");
      setError(error as TError);
      await onErrorAsync(error as TError);
      setTimeout(async () => {
        setStatus("idle");
        await onErrorTimeoutAsync();
      }, errorRecoveryTimeout);
    }
  }

  return { actAsync, status, error };
}

export default useAsyncAction;
