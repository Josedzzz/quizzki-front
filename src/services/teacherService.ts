import {
  ApiResponse,
  Subject,
  Topic,
  Group,
  Question,
  QuestionCredentials,
  QuestionId,
  AnswerCredentials,
  AnswerId,
  EvaluationCredentials,
  EvaluationId,
  AssignQuestionCredentials,
} from "../utils/types";

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
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Subject[]> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
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
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Topic[]> = await response.json();
    if (responseData.status === "Error") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
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
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Group[]> = await response.json();
    if (responseData.status === "Error") {
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
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<Question[]> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
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

/**
 * promise function to create a question
 * @param token - the token of the admin
 * @param credentials - the credentials of the question
 * @returns the new question id
 */
export const createQuestionService = async (
  token: string,
  credentials: QuestionCredentials,
): Promise<ApiResponse<QuestionId>> => {
  try {
    const response = await fetch(`${API_URL}/api/teacher/question/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<QuestionId> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error creando la preguntas: ", error);
    throw error;
  }
};

/**
 * promise function to create a answer
 * @param token - the token of the admin
 * @param credentials - the credentials of the answer
 * @returns the new answer id
 */
export const createAnswerService = async (
  token: string,
  credentials: AnswerCredentials,
): Promise<ApiResponse<AnswerId>> => {
  try {
    const response = await fetch(`${API_URL}/api/teacher/answerOption/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<AnswerId> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error creando la respuesta: ", error);
    throw error;
  }
};

/**
 * promise function to create a evaluation
 * @param token - the token of the admin
 * @param credentials - the credentials of the evaluation
 * @returns the id of the new evaluation
 */
export const createEvaluationService = async (
  token: string,
  credentials: EvaluationCredentials,
): Promise<ApiResponse<EvaluationId>> => {
  try {
    const response = await fetch(`${API_URL}/api/teacher/evaluation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorResponse: ApiResponse<null> = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData: ApiResponse<EvaluationId> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error creando la evaluacion: ", error);
    throw error;
  }
};

/**
 * promise function to assign a random question to a evaluation
 * @param token - the token of the admin
 * @param evaluationId - the id of the evaluation
 * @returns a confirmation message
 */
export const assignRandomQuestionService = async (
  token: string,
  evaluationId: string,
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/teacher/evaluation/${evaluationId}/assign-random-questions`,
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
    const responseData: ApiResponse<null> = await response.json();
    if (responseData.status === "ERROR") {
      throw new Error(responseData.message);
    } else if (responseData.data) {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error agregando las preguntas random: ", error);
    throw error;
  }
};

/**
 * promise function to assign a question to a evaluation
 * @param token - the token of the admin
 * @param credentials - the credentials to add assign the question
 * @returns a confirmation message
 */
export const assignQuestionService = async (
  token: string,
  credentials: AssignQuestionCredentials,
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/teacher/evaluation/assign-question`,
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
    } else if (responseData.status !== "ERROR") {
      return responseData;
    } else {
      console.log(response);
      throw new Error("Formato no esperado para la respuesta");
    }
  } catch (error) {
    console.error("Error agregando la pregunta: ", error);
    throw error;
  }
};
