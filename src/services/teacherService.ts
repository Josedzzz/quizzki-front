import { ApiResponse, Subject, Topic } from "../utils/types";

const API_URL = "http://localhost:8081";

/**
 * promise function to get all the subjects
 * @param token - the admin token
 * @returns all the subjects
 */
export const getSubjectsService = async (
  token: string,
): Promise<ApiResponse<Subject[]>> => {
  try {
    const response = await fetch(`${API_URL}/api/teacher/subjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const errorResponse: ApiResponse<null> = await response.json();
    if (!response.ok) {
      throw new Error(errorResponse.message);
    }
    if (errorResponse.status === "ERROR") {
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Subject[]> = await response.json();
    if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error obteniendo la materia: ", error);
    throw error;
  }
};

/**
 * promise function to get all the topics
 * @param token - the admin token
 * @returns all the topics
 */
export const getTopicsService = async (
  token: string,
): Promise<ApiResponse<Topic[]>> => {
  try {
    const response = await fetch(`${API_URL}/api/teacher/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const errorResponse: ApiResponse<null> = await response.json();
    if (!response.ok) {
      throw new Error(errorResponse.message);
    }
    if (errorResponse.status === "ERROR") {
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Topic[]> = await response.json();
    if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error obteniendo los temas: ", error);
    throw error;
  }
};
