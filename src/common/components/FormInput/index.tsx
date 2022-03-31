import { TextField } from "@mui/material";
import { Path, UseFormRegister, FieldValues } from "react-hook-form";

type FieldData<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  rules: {};
  register: UseFormRegister<T>;
  errors: FieldValues;
  type?: string;
  initialValue?: unknown;
};

export default function FormInput<T extends FieldValues>({
  label,
  name,
  rules,
  register,
  errors,
  type = "text",
  initialValue = "",
}: FieldData<T>) {
  return (
    <TextField
      error={!!errors[name]}
      size="small"
      {...register(name, rules)}
      label={label}
      helperText={errors[name] ? errors[name]?.message : " "}
      type={type}
      variant="filled"
      defaultValue={initialValue}
    />
  );
}
