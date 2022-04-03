import { ApiError } from "../../models/Common";

function translatedApiErrors(
  entityDescription: string
): Record<number, string> {
  return {
    400: "Quelque chose s'est mal passé, veuillez réessayer ultérieurement !",
    401: "Utilisateur non authentifié, veuillez-vous reconnecter !",
    403: "Accès interdit !",
    404: `${entityDescription} introuvable !`,
    409: `${entityDescription} déjà existant !`,
  };
}

export function translateApiErrors(
  error: ApiError,
  entityDescription: string
): string {
  if (
    error.status === 400 &&
    error.title === "One or more validation errors occurred."
  ) {
    return "Données invalides !";
  }
  return translatedApiErrors(entityDescription)[error.status];
}
