import { useEffect, useState } from "react";
import { EvaluationCredentials, Group, Topic } from "../utils/types";
import {
  createEvaluationService,
  getGroupsBySubjectService,
  getSubjectsService,
  getTopicsService,
} from "../services/teacherService";
import AdminQuestions from "./AdminQuestions";

export default function AdminEvaluation() {
  const [credentials, setCredentials] = useState<EvaluationCredentials>({
    maxTime: 0,
    questionCount: 0,
    coursePercentage: 0,
    name: "",
    passingPercentage: 0,
    startDateTime: "",
    endDateTime: "",
    randomQuestionsCount: 0,
    topicId: 0,
    professorId: Number(localStorage.getItem("adminId")) || 1,
    groupId: 0,
  });
  const [createdEvaluationId, setCreatedEvaluationId] = useState<number | null>(
    null,
  );
  const [groups, setGroups] = useState<Group[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showQuestionsComponent, setShowQuestionsComponent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  // Cargar materias y temas al iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!token) return;
        const subjectsRes = await getSubjectsService(token);
        const topicsRes = await getTopicsService(token);
        setTopics(topicsRes.data);

        // Obtener todos los grupos de todas las materias
        const allGroups: Group[] = [];
        for (const subject of subjectsRes.data) {
          const groupRes = await getGroupsBySubjectService(
            token,
            subject.ID_MATERIA.toString(),
          );
          allGroups.push(...groupRes.data);
        }
        setGroups(allGroups);
      } catch (err: any) {
        setMessage("Error cargando datos: " + err.message);
      }
    };
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "startDateTime" || name === "endDateTime") {
      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }
    setCredentials((prev) => ({
      ...prev,
      [name]:
        name.includes("Percentage") ||
        name.includes("Count") ||
        name === "topicId" ||
        name === "groupId" ||
        name === "professorId" ||
        name === "maxTime"
          ? Number(value)
          : value,
    }));
  };

  const handleCreateEvaluation = async () => {
    if (!token) return setMessage("Token de autenticación no encontrado");
    try {
      setIsLoading(true);
      const response = await createEvaluationService(token, credentials);
      setMessage(response.message);
      setCreatedEvaluationId(Number(response.data.idEvaluation));
      setShowQuestionsComponent(true);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center bg-zinc-900 w-full min-h-[calc(100vh-6rem)] p-6">
      {!showQuestionsComponent ? (
        <div className="max-w-4xl w-full mx-auto bg-zinc-800 rounded-2xl shadow-xl p-8 border border-blue-500 text-white max-h-[80vh] overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-blue-400">
            Crear Evaluación
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-zinc-300">Nombre</label>
              <input
                name="name"
                value={credentials.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">
                Tiempo máximo (min)
              </label>
              <input
                name="maxTime"
                type="number"
                value={credentials.maxTime}
                onChange={handleChange}
                placeholder="Tiempo máximo"
                className="p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">
                Número de preguntas
              </label>
              <input
                name="questionCount"
                type="number"
                value={credentials.questionCount}
                onChange={handleChange}
                placeholder="Número de preguntas"
                className="p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">
                Preguntas aleatorias
              </label>
              <input
                name="randomQuestionsCount"
                type="number"
                value={credentials.randomQuestionsCount}
                onChange={handleChange}
                placeholder="Preguntas aleatorias"
                className="p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">
                Porcentaje de aprobación
              </label>
              <input
                name="passingPercentage"
                type="number"
                value={credentials.passingPercentage}
                onChange={handleChange}
                placeholder="Porcentaje de aprobación"
                className="p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">
                Porcentaje del curso
              </label>
              <input
                name="coursePercentage"
                type="number"
                value={credentials.coursePercentage}
                onChange={handleChange}
                placeholder="Porcentaje del curso"
                className="p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">
                Fecha y hora de inicio
              </label>
              <input
                name="startDateTime"
                type="datetime-local"
                value={credentials.startDateTime}
                onChange={handleChange}
                className="p-3 rounded bg-zinc-700 text-white w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">
                Fecha y hora de finalización
              </label>
              <input
                name="endDateTime"
                type="datetime-local"
                value={credentials.endDateTime}
                onChange={handleChange}
                className="p-3 rounded bg-zinc-700 text-white w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">Grupo</label>
              <select
                name="groupId"
                value={credentials.groupId}
                onChange={handleChange}
                className="p-3 rounded bg-zinc-700 text-white w-full"
              >
                <option value={0}>Seleccione un grupo</option>
                {groups.map((group) => (
                  <option key={group.ID_GRUPO} value={group.ID_GRUPO}>
                    Grupo {group.NOMBRE} - Semestre {group.SEMESTRE}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">Tema</label>
              <select
                name="topicId"
                value={credentials.topicId}
                onChange={handleChange}
                className="p-3 rounded bg-zinc-700 text-white w-full"
              >
                <option value={0}>Seleccione un tema</option>
                {topics.map((topic) => (
                  <option key={topic.ID_TEMA} value={topic.ID_TEMA}>
                    {topic.NOMBRE}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCreateEvaluation}
            disabled={isLoading}
            className={`my-6 px-6 py-3 rounded-xl transition duration-200 font-semibold text-white ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creando..." : "Crear Evaluación"}
          </button>

          {message && <p className="text-white font-bold">{message}</p>}
        </div>
      ) : (
        createdEvaluationId !== null &&
        token && (
          <AdminQuestions
            evaluationId={createdEvaluationId}
            token={token}
            topicId={credentials.topicId}
          />
        )
      )}
    </main>
  );
}
