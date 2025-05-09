import {
  ApiResponse,
  EvaluationCredentialsUser,
  FinishEvaluation,
  PresentationCredentials,
  PresentationId,
  QuestionOptionResponse,
  QuestionUserResponse,
  RegisterAnswerCredentials,
  UserEvaluation,
  UserGroup,
} from "../utils/types";

const API_URL = "http://localhost:8081";

/**
 * promise function to get the groups of a student
 * @param token - the user token
 * @param userId - the id of the user
 * @returns all the groups
 */
export const getStudentGroupsService = async (
  token: string,
  userId: string,
): Promise<ApiResponse<UserGroup[]>> => {
  try {
    const response = await fetch(`${API_URL}/api/student/${userId}/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<UserGroup[]> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
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
 * promise function to get the evaluations of a student
 * @param token - the token of the user
 * @param userId - the id of the user
 * @param credentials - the credentials to get the evaluations
 * @returns all the evaluations
 */
export const getStudentEvaluationsService = async (
  token: string,
  userId: string,
  credentials: EvaluationCredentialsUser,
): Promise<ApiResponse<UserEvaluation>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/student/${userId}/evaluations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credentials),
      },
    );
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<UserEvaluation> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error obteniendo las evaluaciones: ", error);
    throw error;
  }
};

/**
 * promise function to present a evaluation
 * @param token - the token of the user
 * @param userId - the id of the user
 * @param credentials - the credentials to get the evaluation
 * @returns the id of the evaluation to present
 */
export const presentEvaluationUserService = async (
  token: string,
  userId: string,
  credentials: PresentationCredentials,
): Promise<ApiResponse<PresentationId>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/student/${userId}/evaluations/present`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credentials),
      },
    );
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<PresentationId> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error a la hora de presentar la evaluación: ", error);
    throw error;
  }
};

/**
 * promise function to get the questions
 * @param token - the token of the user
 * @param evaluationId - the id of the evaluation
 * @returns all the questions of the presentation
 */
export const getQuestionsUserService = async (
  token: string,
  evaluationId: string,
): Promise<ApiResponse<QuestionUserResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/student/evaluations/${evaluationId}/questions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<QuestionUserResponse> =
      await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error(
      "Error a la hora de obtener las preguntas de la evaluacion: ",
      error,
    );
    throw error;
  }
};

/**
 * promise function to get the question options
 * @param token - the token of the user
 * @param questionId - the id of the question
 * @returns all the question options
 */
export const getQuestionOptionsUserService = async (
  token: string,
  questionId: string,
): Promise<ApiResponse<QuestionOptionResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/student/evaluations/questions/${questionId}/options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<QuestionOptionResponse> =
      await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error(
      "Error a la hora de obtener las preguntas de la evaluacion: ",
      error,
    );
    throw error;
  }
};

/**
 * promise function to register a answer
 * @param token - the token of the user
 * @param userId - the id of the user
 * @param credentials - the credentials to add an answer
 * @returns a confirmation message
 */
export const registerAnswerUserService = async (
  token: string,
  userId: string,
  credentials: RegisterAnswerCredentials,
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/student/${userId}/evaluations/register-answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credentials),
      },
    );
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<null> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error a la hora de enviar la respuesta: ", error);
    throw error;
  }
};

/**
 * promise function to finish a evaluation
 * @param token - the token of the user
 * @param presentationId - the id of the presentation
 * @returns a confirmation message
 */
export const finishEvaluationUserService = async (
  token: string,
  presentationId: number,
): Promise<ApiResponse<FinishEvaluation>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/student/evaluations/${presentationId}/finish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<FinishEvaluation> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error(
      "Error a la hora de enviar la solución de la evaluación: ",
      error,
    );
    throw error;
  }
};
