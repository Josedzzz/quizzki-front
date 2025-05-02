import { ApiResponse, Subject, Topic, Group, Question } from "../utils/types";

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

/**
 * promise function to get the groups by subject
 * @param token - the admin token
 * @param subjectId - the id of the subject
 * @returns all the groups
 */
export const getGroupsBySubjectService = async (
  token: string,
  subjectId: string,
): Promise<ApiResponse<Group[]>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/teacher/subjects/${subjectId}/groups`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const errorResponse: ApiResponse<null> = await response.json();
    if (!response.ok) {
      throw new Error(errorResponse.message);
    }
    if (errorResponse.status === "ERROR") {
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Group[]> = await response.json();
    if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error obteniendo los grupos: ", error);
    throw error;
  }
};

/**
 * promise function to get the questions by subject
 * @param token - the token of the admin
 * @param topicId - the id of the
 * @returns ell the questions
 */
export const getQuestionsByTopicService = async (
  token: string,
  topicId: string,
): Promise<ApiResponse<Question[]>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/teacher/topics/${topicId}/questions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const errorResponse: ApiResponse<null> = await response.json();
    if (!response.ok) {
      throw new Error(errorResponse.message);
    }
    if (errorResponse.status === "ERROR") {
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Question[]> = await response.json();
    if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error obteniendo las preguntas: ", error);
    throw error;
  }
};
