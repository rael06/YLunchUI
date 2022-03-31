export const standardEmailRegExp =
  /^[a-z0-9._-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,20}$/;

export const ynovEmailRegExp =
  /^(:?[a-z]{1,50}(?:[_-](?:[a-z]{1,50})+)*)\.(:?[a-z]{1,50}(?:[_-](?:[a-z]{1,50})+)*)@ynov.com$/;

export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

export const phoneNumberRegExp = /^0[6-7][0-9]{8}$/;

export const firstOrLastNameRegExp =
  /^(:?[A-Za-zÀ-ÖØ-öø-ÿ]{1,50}(?:[ \-'](?:[A-Za-zÀ-ÖØ-öø-ÿ]{1,50})+)*)$/;
