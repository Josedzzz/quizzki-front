import React, { useEffect, useState } from "react";
import { Group, Subject } from "../utils/types";
import {
  getGroupsBySubjectService,
  getSubjectsService,
} from "../services/teacherService";

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [expandedSubjectId, setExpandedSubjectId] = useState<number | null>(
    null,
  );
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadingGroupsBySubjectId, setLoadingGroupsBySubjectId] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  /**
   * gets all the subjects
   * @returns
   */
  const handleGetSubjects = async () => {
    setIsLoading(true);
    if (!token) return setMessage("Token de autenticación no encontrado");
    try {
      const response = await getSubjectsService(token);
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * gets all the groups by subject
   * @param subjectId - the id of the subject
   * @returns
   */
  const handleSubjectClick = async (subjectId: number) => {
    if (!token) return setMessage("Token de autenticación no encontrado");
    if (expandedSubjectId === subjectId) {
      setExpandedSubjectId(null);
    } else {
      setLoadingGroupsBySubjectId(subjectId);
      try {
        const response = await getGroupsBySubjectService(
          token,
          subjectId.toString(),
        );
        setGroups(response.data);
        setExpandedSubjectId(subjectId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingGroupsBySubjectId(null);
      }
    }
  };

  useEffect(() => {
    handleGetSubjects();
  }, []);

  return (
    <main className="flex items-center justify-center bg-transparent w-full min-h-[calc(100vh-6rem)] p-6">
      <div className="max-w-4xl w-full mx-auto bg-transparent rounded-xl shadow-md p-6 border-4 border-blue-500">
        <h1 className="text-2xl font-bold text-white mb-4">Materias</h1>
        {message && <p className="text-white mb-4">{message}</p>}

        {isLoading ? (
          <div className="flex items-center gap-2 text-blue-400 mb-4">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Cargando materias...</span>
          </div>
        ) : (
          <table className="w-full text-left text-white border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-zinc-700">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <React.Fragment key={subject.ID_MATERIA}>
                  <tr>
                    <td
                      colSpan={2}
                      onClick={() => handleSubjectClick(subject.ID_MATERIA)}
                      className="cursor-pointer hover:bg-zinc-700 rounded px-4 py-2 transition"
                    >
                      <div className="flex justify-between items-center">
                        <span>
                          {subject.ID_MATERIA} — {subject.NOMBRE}
                        </span>
                        <div className="flex items-center gap-2 text-blue-400">
                          {loadingGroupsBySubjectId === subject.ID_MATERIA && (
                            <i className="fas fa-spinner fa-spin" />
                          )}
                          <span>
                            {expandedSubjectId === subject.ID_MATERIA
                              ? "▲"
                              : "▼"}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {expandedSubjectId === subject.ID_MATERIA && (
                    <tr className="text-blue-400">
                      <td colSpan={2} className="px-4 py-2">
                        {groups.length > 0 ? (
                          <ul className="list-disc ml-4 space-y-1">
                            {groups.map((group) => (
                              <li key={group.ID_GRUPO}>
                                Grupo {group.NOMBRE} — Semestre {group.SEMESTRE}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-zinc-400">
                            No hay grupos disponibles
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
