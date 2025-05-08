import { useEffect, useState } from "react";
import {
  assignQuestionService,
  assignRandomQuestionService,
  getQuestionsByTopicService,
} from "../services/teacherService";
import { Question } from "../utils/types";

interface AdminQuestionsProps {
  evaluationId: number;
  token: string;
  topicId: number;
}

export default function AdminQuestions({
  evaluationId,
  token,
  topicId,
}: AdminQuestionsProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [credentials, setCredentials] = useState({
    idQuestion: 0,
    percentage: 0,
    hasMaxTime: "N",
    questionTime: 0,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestionsByTopicService(token, String(topicId));
        setQuestions(res.data ?? []);
      } catch (err) {
        console.error(err);
        setMessage("Error al cargar preguntas del tema.");
      }
    };
    fetchQuestions();
  }, [token, topicId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: name === "hasMaxTime" ? value : Number(value),
    }));
  };

  const handleAssignManual = async () => {
    try {
      setLoading(true);
      await assignQuestionService(token, {
        ...credentials,
        idEvaluation: evaluationId,
      });
      setMessage("Pregunta asignada correctamente.");
    } catch (err: any) {
      setMessage(err.message || "Error asignando pregunta.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRandom = async () => {
    try {
      setLoading(true);
      await assignRandomQuestionService(token, String(evaluationId));
      setMessage("Preguntas aleatorias asignadas correctamente.");
    } catch (err: any) {
      setMessage(err.message || "Error asignando preguntas aleatorias.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuestion = (questionId: number) => {
    setCredentials((prev) => ({
      ...prev,
      idQuestion: questionId,
    }));
  };

  return (
    <main className="flex items-center justify-center bg-zinc-900 w-full min-h-[calc(100vh-6rem)] p-6">
      <div className="max-w-5xl w-full mx-auto bg-zinc-800 rounded-2xl shadow-xl p-8 border border-blue-500 text-white max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Asignar preguntas a la evaluación
        </h2>

        <div className="border-t border-zinc-600 pt-6">
          <h3 className="text-xl font-semibold mb-4">
            Preguntas disponibles del tema
          </h3>
          {questions.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {questions.map((q) => (
                <li
                  key={q.ID_PREGUNTA}
                  onClick={() => handleSelectQuestion(q.ID_PREGUNTA)}
                  className={`cursor-pointer border p-4 rounded transition ${
                    credentials.idQuestion === q.ID_PREGUNTA
                      ? "border-blue-500 bg-zinc-700"
                      : "border-zinc-600 bg-zinc-800"
                  }`}
                >
                  <p className="font-semibold">{q.ENUNCIADO}</p>
                  <p className="text-sm text-zinc-400">
                    Tipo: {q.TIPO_PREGUNTA} | Pública: {q.ES_PUBLICA}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-400">No hay preguntas disponibles.</p>
          )}
        </div>

        {/* Asignar pregunta aleatoria */}
        <div className="border-t border-zinc-600 pt-6">
          <h3 className="text-xl font-semibold mb-4">
            Asignar pregunta aleatoria
          </h3>
          <button
            onClick={handleAssignRandom}
            disabled={loading}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 w-full ${loading ? "opacity-50 cursor-wait" : ""}`}
          >
            {loading ? "Cargando..." : "Asignar preguntas aleatorias"}
          </button>
        </div>

        {/* Asignar pregunta manualmente */}
        <div className="border-t border-zinc-600 pt-6">
          <h3 className="text-xl font-semibold mb-4">
            Asignar pregunta manualmente
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="idQuestion"
                className="block text-sm font-medium text-white"
              >
                ID de la pregunta
              </label>
              <input
                id="idQuestion"
                type="number"
                name="idQuestion"
                placeholder="ID de la pregunta"
                value={credentials.idQuestion}
                onChange={handleChange}
                className="w-full bg-zinc-700 border border-zinc-600 px-4 py-2 rounded text-white"
              />
            </div>
            <div>
              <label
                htmlFor="percentage"
                className="block text-sm font-medium text-white"
              >
                Porcentaje
              </label>
              <input
                id="percentage"
                type="number"
                name="percentage"
                placeholder="Porcentaje"
                value={credentials.percentage}
                onChange={handleChange}
                className="w-full bg-zinc-700 border border-zinc-600 px-4 py-2 rounded text-white"
              />
            </div>
            <div>
              <label
                htmlFor="hasMaxTime"
                className="block text-sm font-medium text-white"
              >
                Tiempo máximo
              </label>
              <select
                id="hasMaxTime"
                name="hasMaxTime"
                value={credentials.hasMaxTime}
                onChange={handleChange}
                className="w-full bg-zinc-700 border border-zinc-600 px-4 py-2 rounded text-white"
              >
                <option value="N">Sin tiempo máximo</option>
                <option value="Y">Con tiempo máximo</option>
              </select>
            </div>
            {credentials.hasMaxTime === "YES" && (
              <div>
                <label
                  htmlFor="questionTime"
                  className="block text-sm font-medium text-white"
                >
                  Tiempo en segundos
                </label>
                <input
                  id="questionTime"
                  type="number"
                  name="questionTime"
                  placeholder="Tiempo en segundos"
                  value={credentials.questionTime}
                  onChange={handleChange}
                  className="w-full bg-zinc-700 border border-zinc-600 px-4 py-2 rounded text-white"
                />
              </div>
            )}
            <button
              onClick={handleAssignManual}
              disabled={loading}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 w-full ${loading ? "opacity-50 cursor-wait" : ""}`}
            >
              {loading ? "Cargando..." : "Asignar pregunta manual"}
            </button>
          </div>
        </div>

        {message && <p className="text-white font-bold mt-4">{message}</p>}
      </div>
    </main>
  );
}
