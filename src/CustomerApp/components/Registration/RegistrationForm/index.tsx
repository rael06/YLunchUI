import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../common/components/FormInput";
import ProgressButton, {
  ProgressButtonStatus,
} from "../../../../common/components/ProgressButton";
import {
  firstOrLastNameRegExp,
  passwordRegExp,
  phoneNumberRegExp,
  ynovEmailRegExp,
} from "../../../../constants/regexps";
import { progressButtonRecoveryTimeout } from "../../../../constants/timeouts";
import { ApiError } from "../../../../models/Common";
import { CustomerCreateDto } from "../../../../models/Customer";
import { RegisterApi } from "../../../../services/api/authentication";

interface Inputs extends FieldValues {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<Inputs>({ mode: "onBlur" });

  const mutation = useMutation((data: CustomerCreateDto) => RegisterApi(data), {
    onSuccess: () => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idling");
        navigate("/customer/login", {
          state: {
            message: "Un email de confirmation vous a été envoyé",
          },
        });
      }, progressButtonRecoveryTimeout);
    },
    onError: (_: ApiError) => {
      setStatus("error");
      setTimeout(() => {
        setStatus("idling");
      }, progressButtonRecoveryTimeout);
    },
  });

  const submit = (data: CustomerCreateDto) => {
    setStatus("loading");
    mutation.mutate(data);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", paddingY: 2 }}
      component={"form"}
      onSubmit={handleSubmit((data) => submit(data))}
    >
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
        label="Nom*"
        name="lastname"
        initialValue="lastname"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: firstOrLastNameRegExp,
            message:
              "Votre nom ne doit contenir que des caractères alphabétiques. Exemple : Dupont",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Prénom*"
        name="firstname"
        initialValue="firstname"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: firstOrLastNameRegExp,
            message:
              "Votre prénom ne doit contenir que des caractères alphabétiques. Exemple : Henri",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Téléphone*"
        name="phoneNumber"
        initialValue="0623015217"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: phoneNumberRegExp,
            message:
              "Le numero de téléphone doit respecter le format : '0612345678'",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Adresse mail*"
        name="email"
        initialValue="firstname.lastname@ynov.com"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message: "Votre email de respecter le format : prenom.nom@ynov.com",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Mot de passe*"
        name="password"
        type="password"
        initialValue={"Password1234."}
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: passwordRegExp,
            message:
              "Votre mot de passe doit contenir au moins 8 caractères, 1 lettre miniscule, 1 lettre majuscule, 1 caractère spécial et 1 chiffre",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Confirmation du mot de passe*"
        name="passwordConfirm"
        type="password"
        initialValue={"Password1234."}
        rules={{
          required: "Ce champs est requis",
          validate: {
            match: (value: any) =>
              value === getValues().password ||
              "Les mots doivent être identiques",
          },
        }}
      />
      <ProgressButton type="submit" label="Envoyer" status={status} />
    </Box>
  );
}
