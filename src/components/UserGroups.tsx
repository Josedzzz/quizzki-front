import { useEffect, useState } from "react";
import {
  getStudentEvaluationsService,
  getStudentGroupsService,
  presentEvaluationUserService,
} from "../services/userService";
import {
  UserGroup,
  UserEvaluation,
  EvaluationCredentialsUser,
} from "../utils/types";
import UserPresentEvaluation from "./UserPresentEvaluation";

export default function UserGroups() {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [evaluations, setEvaluations] = useState<UserEvaluation[] | null>(null);
  const [message, setMessage] = useState("");
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingEvaluations, setLoadingEvaluations] = useState(false);
  const [presentationId, setPresentationId] = useState<string | null>(null);
  const [loadingPresentation, setLoadingPresentation] = useState(false);
  const [evaluationId, setEvaluationId] = useState<number | null>(null);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authUserToken="))
    ?.split("=")[1];
  const userId = localStorage.getItem("userId") || "1";

  const handleEvaluationClick = async (evalItem: UserEvaluation) => {
    if (!token || !userId) return;
    setLoadingPresentation(true);
    try {
      const credentials = {
        idEvaluation: evalItem.ID_EVALUACION,
        idStudent: Number(userId),
        ipSource: "127.0.0.1",
      };
      const res = await presentEvaluationUserService(
        token,
        userId,
        credentials,
      );
      setPresentationId(res.data.id_presentacion);
      setEvaluationId(evalItem.ID_EVALUACION);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoadingPresentation(false);
    }
  };

  const handleGroupClick = async (groupId: number) => {
    if (!token || !userId) return;
    if (selectedGroupId === groupId) {
      setSelectedGroupId(null);
      setEvaluations(null);
      return;
    }
    try {
      setSelectedGroupId(groupId);
      setLoadingEvaluations(true);
      const now = new Date();
      const actualDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const credentials: EvaluationCredentialsUser = {
        idGroup: groupId,
        idStudent: Number(userId || 111),
        actualDate,
      };
      const res = await getStudentEvaluationsService(
        token,
        userId,
        credentials,
      );
      setEvaluations(Array.isArray(res.data) ? res.data : [res.data]);
      setMessage("");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoadingEvaluations(false);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      if (!token || !userId) return;
      try {
        setLoadingGroups(true);
        const res = await getStudentGroupsService(token, userId);
        setGroups(res.data || []);
        setMessage("");
      } catch (err: any) {
        setMessage(err.message);
      } finally {
        setLoadingGroups(false);
      }
    };
    fetchGroups();
  }, []);

  if (presentationId && evaluationId) {
    return (
      <UserPresentEvaluation
        presentationId={presentationId}
        evaluationId={String(evaluationId)}
      />
    );
  }

  return (
    <main className="flex items-center justify-center bg-zinc-900 w-full min-h-[calc(100vh-6rem)] p-6 text-white">
      <div className="max-w-4xl w-full mx-auto bg-zinc-800 rounded-xl shadow-md p-6 border-4 border-blue-500 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-400">Mis Grupos</h1>

        {loadingGroups ? (
          <i className="fas fa-spinner animate-spin" />
        ) : (
          <ul className="space-y-4">
            {groups.map((group) => (
              <li
                key={group.ID_GRUPO}
                className={`p-4 rounded cursor-pointer border ${
                  selectedGroupId === group.ID_GRUPO
                    ? "bg-blue-500 border-blue-700"
                    : "bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                }`}
                onClick={() => handleGroupClick(group.ID_GRUPO)}
              >
                <p className="font-semibold">{group.NOMBRE_GRUPO}</p>
                <p className="text-sm text-zinc-300">
                  Materia: {group.NOMBRE_MATERIA}
                </p>
              </li>
            ))}
          </ul>
        )}

        {evaluations && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-blue-500">
              Evaluaciones del grupo
            </h2>
            <ul className="space-y-3">
              {evaluations.map((evalItem) => (
                <li
                  key={evalItem.ID_EVALUACION}
                  className="p-4 rounded bg-zinc-700 border border-blue-500 cursor-pointer hover:bg-zinc-600"
                  onClick={() => handleEvaluationClick(evalItem)}
                >
                  <p className="font-semibold text-blue-500">
                    {evalItem.NOMBRE}
                  </p>
                  <p className="text-sm text-zinc-300">
                    Fecha:{" "}
                    {new Date(evalItem.FECHA_HORA_INICIO).toLocaleString()} -{" "}
                    {new Date(evalItem.FECHA_HORA_FIN).toLocaleString()}
                  </p>
                  <p className="text-sm text-zinc-300">
                    Preguntas: {evalItem.NUMERO_PREGUNTAS} | Tiempo máximo:{" "}
                    {evalItem.TIEMPO_MAX} min
                  </p>
                  <p className="text-sm text-zinc-300">
                    Estado: {evalItem.ESTADO}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {loadingEvaluations && <i className="fas fa-spinner animate-spin" />}

        {loadingPresentation && (
          <div className="mb-4 text-blue-400 font-semibold flex items-center gap-2">
            <i className="fas fa-spinner animate-spin" />
            Iniciando evaluación...
          </div>
        )}

        {message && (
          <p className="mt-4 text-red-400 font-semibold">{message}</p>
        )}
      </div>
    </main>
  );
}
