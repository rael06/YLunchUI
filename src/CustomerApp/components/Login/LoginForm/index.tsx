import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import FormInput from "../../../../common/components/FormInput";
import ProgressButton from "../../../../common/components/ProgressButton";
import { ynovEmailRegExp } from "../../../../common/constants/regexps";
import useAsyncAction from "../../../../common/hooks/useAsyncAction";
import useCurrentUser from "../../../../common/hooks/useCurrentUser";
import { LoginRequestDto } from "../../../../common/models/Authentication";
import { ApiError } from "../../../../common/models/Common";
import {
  getCurrentUserApi,
  loginApi,
} from "../../../../common/services/api/authentication";
import { translateApiErrors } from "../../../../common/translations/apiErrors";

interface Inputs extends FieldValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: "onBlur" });
  const { setCurrentUser } = useCurrentUser();
  const { actAsync, status, error: loginApiError } = useAsyncAction<ApiError>();

  const mutation = useMutation(
    "user",
    (data: LoginRequestDto) => loginApi(data),
    {
      onSuccess: async () => {
        setCurrentUser(await getCurrentUserApi());
      },
      onError: (error: ApiError) => {
        throw error;
      },
    }
  );

  async function submit(data: LoginRequestDto) {
    await actAsync({
      asyncAction: async () => await mutation.mutateAsync(data),
      onSuccessTimeoutAsync: async () =>
        location.state &&
        (location.state as { isFromRegistration: boolean }).isFromRegistration
          ? navigate("/customer/restaurants")
          : navigate(-1),
      onErrorAsync: async () => {
        setCurrentUser(undefined);
      },
    });
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", paddingY: 2 }}
      component={"form"}
      onSubmit={handleSubmit((data) => submit(data))}
    >
      {location.state && (
        <Typography>
          {(location.state as { message: string }).message}
        </Typography>
      )}
      <Typography
        variant="caption"
        sx={{ marginBottom: 2 }}
        textAlign={"right"}
      >
        Champ obligatoire*
      </Typography>
      <FormInput
        register={register}
        errors={errors}
        label="Adresse mail*"
        name="email"
        // Todo remove initialValue
        initialValue="firstname.lastname@ynov.com"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Votre email doit respecter le format : prenom.nom@ynov.com",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Mot de passe*"
        name="password"
        type="password"
        // Todo remove initialValue
        initialValue={"Password1234."}
        rules={{
          required: "Ce champs est requis",
        }}
      />
      <ProgressButton
        type="submit"
        label="Se connecter"
        status={status}
        sx={{ marginTop: 3 }}
      />

      <Typography
        color="error"
        visibility={
          loginApiError && loginApiError.status === 401 ? "visible" : "hidden"
        }
      >
        Identifiants inconnus ! Veuillez verifier vos identifiants ou vous
        enregistrer.
      </Typography>
      <Typography
        color="error"
        visibility={
          loginApiError && loginApiError.status !== 401 ? "visible" : "hidden"
        }
      >
        {translateApiErrors(loginApiError, "Utilisateur")}
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Button
          onClick={() => navigate("/customer/registration")}
          variant="outlined"
        >
          S'enregistrer
        </Button>
      </Box>
    </Box>
  );
}
