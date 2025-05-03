import { ApiResponse, LoginCredentials, TokenId } from "../utils/types";

const API_URL = "http://localhost:8081";

/**
 * promise function to login
 * @param credentials - the email and password
 * @param userType - the userType for the login
 * @returns the id and token
 */
export const loginService = async (
  credentials: LoginCredentials,
  userType: string,
): Promise<ApiResponse<TokenId>> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<TokenId> = await response.json();
    if (responseData.status === "ERROR") {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error durante el login: ", error);
    throw error;
  }
};
