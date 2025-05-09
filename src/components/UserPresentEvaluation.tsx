import { useEffect, useState } from "react";
import { QuestionOptionsUser, QuestionUser } from "../utils/types";
import {
  finishEvaluationUserService,
  getQuestionOptionsUserService,
  getQuestionsUserService,
  registerAnswerUserService,
} from "../services/userService";

interface UserEvaluationProps {
  presentationId: string;
  evaluationId: string;
}

export default function UserPresentEvaluation({
  presentationId,
  evaluationId,
}: UserEvaluationProps) {
  const [questions, setQuestions] = useState<QuestionUser[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null,
  );
  const [options, setOptions] = useState<Record<number, QuestionOptionsUser[]>>(
    {},
  );
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [answerLoading, setAnswerLoading] = useState<number | null>(null); // ID de la pregunta cargando

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authUserToken="))
    ?.split("=")[1];
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!token || !userId) return;
      try {
        const response = await getQuestionsUserService(token, evaluationId);
        const data = response.data?.preguntas;
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.warn("No se recibieron preguntas válidas.");
          setQuestions([]);
        }
      } catch (err) {
        console.error("No se pudieron cargar las preguntas.", err);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [token, presentationId, userId]);

  const handleQuestionClick = async (questionId: number) => {
    setSelectedQuestionId(questionId);
    if (!token || !userId) return;
    if (!options[questionId]) {
      try {
        const response = await getQuestionOptionsUserService(
          token,
          String(questionId),
        );
        const opciones = response.data?.opciones;
        if (Array.isArray(opciones)) {
          setOptions((prev) => ({ ...prev, [questionId]: opciones }));
        }
      } catch (err) {
        console.error("No se pudieron cargar las opciones.", err);
      }
    }
  };

  const handleAnswerSelect = async (questionId: number, answerId: number) => {
    if (!token || !userId) return;
    setAnswerLoading(questionId);
    try {
      await registerAnswerUserService(token, userId, {
        idEvaluationPresentation: Number(presentationId),
        idQuestion: questionId,
        idAnswer: answerId,
      });
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    } catch (err) {
      console.error("Error al registrar respuesta.", err);
    } finally {
      setAnswerLoading(null);
    }
  };

  const handleFinishEvaluation = async () => {
    if (!token || !userId) return;
    try {
      setSubmitting(true);
      const response = await finishEvaluationUserService(
        token,
        Number(presentationId),
      );
      alert(
        "Evaluación finalizada correctamente. Nota: " +
          response.data.calificacion,
      );
      window.location.reload();
    } catch (err) {
      console.error("Error al finalizar evaluación.", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen text-white bg-zinc-900">
        <p className="text-xl">Cargando preguntas...</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center bg-zinc-900 w-full min-h-[calc(100vh-6rem)] p-6 text-white">
      <div className="max-w-4xl w-full mx-auto bg-zinc-800 rounded-xl shadow-md p-6 border-4 border-blue-500 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">Evaluación</h1>

        {questions.map((q) => (
          <div
            key={q.ID_PREGUNTA}
            className="mb-6 border-b border-zinc-600 pb-4"
          >
            <div
              className={`cursor-pointer font-semibold text-lg ${
                selectedQuestionId === q.ID_PREGUNTA
                  ? "text-blue-500"
                  : "text-white hover:text-blue-400"
              }`}
              onClick={() => handleQuestionClick(q.ID_PREGUNTA)}
            >
              {q.ENUNCIADO}
            </div>

            {selectedQuestionId === q.ID_PREGUNTA && options[q.ID_PREGUNTA] && (
              <div className="mt-3 ml-4 space-y-2">
                {options[q.ID_PREGUNTA].map((opt) => {
                  const isSelected =
                    selectedAnswers[q.ID_PREGUNTA] === opt.ID_RESPUESTA;
                  const isDisabled = answerLoading === q.ID_PREGUNTA;

                  return (
                    <label
                      key={opt.ID_RESPUESTA}
                      className={`flex items-center gap-2 p-2 rounded border ${
                        isSelected
                          ? "bg-blue-500 border-blue-600 text-white"
                          : "bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                      } ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.ID_PREGUNTA}`}
                        checked={isSelected}
                        onChange={() =>
                          handleAnswerSelect(q.ID_PREGUNTA, opt.ID_RESPUESTA)
                        }
                        disabled={isDisabled}
                      />
                      <span>{opt.DESCRIPCION}</span>
                    </label>
                  );
                })}

                {answerLoading === q.ID_PREGUNTA && (
                  <div className="text-blue-400 mt-2 text-sm">
                    <i className="fas fa-spinner animate-spin mr-2" />
                    Registrando respuesta...
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="mt-8 text-center">
          <button
            onClick={handleFinishEvaluation}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
          >
            {submitting ? (
              <span>
                <i className="fas fa-spinner animate-spin mr-2" />
                Enviando...
              </span>
            ) : (
              "Entregar evaluación"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
