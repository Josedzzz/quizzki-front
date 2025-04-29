/**
 * function to validate the email and password
 * @param email - the email for the login
 * @param password - the password for the login
 * @returns an error message or null if everything is ok
 */
export const validateLoginForm = (
  email: string,
  password: string,
): string | null => {
  if (!email || email.trim() === "") {
    return "El email es requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "El email debe ser válido";
  }
  if (!password || password.trim() === "") {
    return "La contraseña es requerida";
  } else if (password.length < 3) {
    return "La contraseña debe tener al menos 4 caracteres";
  }
  return null;
};
