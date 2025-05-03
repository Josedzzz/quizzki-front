// basic structure for a response
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// credentials to send with the request

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface QuestionCredentials {
  statement: string;
  isPublic: string;
  questionType: string;
  composedQuestionId: number | null;
  topicId: number;
  professorId: number;
}

export interface AnswerCredentials {
  description: string;
  isCorrect: string;
  idQuestion: number;
}

export interface EvaluationCredentials {
  maxTime: number;
  questionCount: number;
  coursePercentage: number;
  name: string;
  passingPercentage: number;
  startDateTime: string;
  endDateTime: string;
  randomQuestionCount: number;
  topicId: number;
  professorId: number;
  groupId: number;
}

export interface AssignQuestionCredentials {
  idQuestion: number;
  idEvaluation: number;
  percentage: number;
  hasMaxTime: string;
  questionTime: number;
}

// interfaces for the response format

export interface TokenId {
  token: string;
  id: string;
}

export interface Subject {
  ID_MATERIA: number;
  NOMBRE: string;
}

export interface Topic {
  ID_TEMA: number;
  NOMBRE: string;
}

export interface Group {
  ID_GRUPO: number;
  NOMBRE: string;
  SEMESTRE: number;
  ID_MATERIA: number;
}

export interface Question {
  ID_PREGUNTA: number;
  ENUNCIADO: string;
  ES_PUBLICA: string;
  TIPO_PREGUNTA: string;
  ID_PREGUNTA_COMPUESTA: number | null;
  ID_TEMA: number;
  ID_PROFESOR: number;
  ESTADO: string;
}

export interface QuestionId {
  idQuestion: string;
}

export interface AnswerId {
  idAnswerOption: string;
}

export interface EvaluationId {
  idEvaluation: string;
}
