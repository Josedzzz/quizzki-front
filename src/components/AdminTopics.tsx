import { useEffect, useState } from "react";
import {
  AnswerCredentials,
  Question,
  QuestionCredentials,
  Topic,
} from "../utils/types";
import {
  createAnswerService,
  createQuestionService,
  getQuestionsByTopicService,
  getTopicsService,
} from "../services/teacherService";

export default function AdminTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [expandedTopicId, setExpandedTopicId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // forms for the answers
  const [newQuestion, setNewQuestion] = useState<{ [key: number]: string }>({});
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCorrect, setIsCorrect] = useState<{ [key: number]: boolean }>({});

  // states for loading forms
  const [loadingAddQuestion, setLoadingAddQuestion] = useState<{
    [key: number]: boolean;
  }>({});
  const [loadingAddAnswer, setLoadingAddAnswer] = useState<{
    [key: number]: boolean;
  }>({});
  const [loadingQuestionsByTopic, setLoadingQuestionsByTopic] = useState<{
    [key: number]: boolean;
  }>({});

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  const professorId = localStorage.getItem("adminId");

  /**
   * gets all the topics
   * @returns
   */
  const handleGetTopics = async () => {
    setIsLoading(true);
    if (!token) return setMessage("Tokend de autenticación no encontrado");
    if (!professorId) return setMessage("Id del profesor no encontrado");
    try {
      const response = await getTopicsService(token);
      setTopics(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * gets all the questions by topic
   * @param topicId - the id of the topic
   * @returns
   */
  const handleTopicClick = async (topicId: number) => {
    if (!token) return setMessage("Tokend de autenticación no encontrado");
    if (!professorId) return setMessage("Id del profesor no encontrado");
    if (expandedTopicId === topicId) {
      setExpandedTopicId(null);
    } else {
      setLoadingQuestionsByTopic((prev) => ({ ...prev, [topicId]: true }));
      try {
        const response = await getQuestionsByTopicService(
          token,
          topicId.toString(),
        );
        setQuestions(response.data);
        setExpandedTopicId(topicId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingQuestionsByTopic((prev) => ({ ...prev, [topicId]: false }));
      }
    }
  };

  /**
   * add a question
   * @param topicId - the id of the topic to add
   * @return
   */
  const handleAddQuestion = async (topicId: number) => {
    const statement = newQuestion[topicId];
    const idnum = Number(professorId);
    if (!token || !idnum) return;
    if (!statement || statement.trim() === "") {
      alert("La pregunta no puede estar vacía");
      return;
    }
    const credentials: QuestionCredentials = {
      statement,
      isPublic: "S",
      questionType: "Selección única",
      composedQuestionId: null,
      topicId,
      professorId: idnum,
    };
    setLoadingAddQuestion((prev) => ({ ...prev, [topicId]: true }));
    try {
      const response = await createQuestionService(token, credentials);
      alert(response.message);
      setNewQuestion((prev) => ({ ...prev, [topicId]: "" }));
      const updated = await getQuestionsByTopicService(
        token,
        topicId.toString(),
      );
      setQuestions(updated.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAddQuestion((prev) => ({ ...prev, [topicId]: false }));
    }
  };

  /**
   * add a answer
   * @param questionId - the id of the question to add the answer
   * @returns
   */
  const handleAddAnswer = async (questionId: number) => {
    const description = answers[questionId];
    const correct = isCorrect[questionId] || false;
    if (!token) return;
    if (!description || description.trim() === "") {
      alert("La pregunta no puede estar vacía");
      return;
    }
    const credentials: AnswerCredentials = {
      description,
      isCorrect: correct ? "S" : "N",
      idQuestion: questionId,
    };
    setLoadingAddAnswer((prev) => ({ ...prev, [questionId]: true }));
    try {
      const response = await createAnswerService(token, credentials);
      setAnswers((prev) => ({ ...prev, [questionId]: "" }));
      setIsCorrect((prev) => ({ ...prev, [questionId]: false }));
      alert(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAddAnswer((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  useEffect(() => {
    handleGetTopics();
  }, []);

  return (
    <main className="flex items-center justify-center w-full min-h-[calc(100vh-6rem)] p-6">
      <div className="max-w-4xl w-full mx-auto bg-zinc-800 rounded-xl shadow-md p-6 border-4 border-blue-500 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Temas</h1>
        {message && <p className="text-white mb-4">{message}</p>}

        {isLoading ? (
          <div className="text-blue-500">Cargando temas...</div>
        ) : (
          <div className="space-y-4">
            {topics.map((topic) => (
              <div key={topic.ID_TEMA}>
                <div
                  onClick={() => handleTopicClick(topic.ID_TEMA)}
                  className="cursor-pointer bg-transparent text-white px-4 py-2 rounded hover:bg-zinc-600 transition flex justify-between items-center"
                >
                  <span>
                    {topic.ID_TEMA} — {topic.NOMBRE}
                  </span>
                  <div className="flex items-center gap-2 text-blue-500">
                    {loadingQuestionsByTopic[topic.ID_TEMA] ? (
                      <i className="fas fa-spinner animate-spin" />
                    ) : (
                      <span>
                        {expandedTopicId === topic.ID_TEMA ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </div>

                {expandedTopicId === topic.ID_TEMA && (
                  <div className="bg-zinc-900 rounded px-4 py-4 mt-2 space-y-4 text-white">
                    {questions.map((question) => (
                      <div
                        key={question.ID_PREGUNTA}
                        className="border-b border-zinc-600 pb-3"
                      >
                        <p className="text-blue-500 font-semibold mb-1">
                          {question.ID_PREGUNTA} — {question.ENUNCIADO}
                        </p>
                        <div className="flex flex-col gap-2">
                          <textarea
                            placeholder="Escribe una respuesta"
                            value={answers[question.ID_PREGUNTA] || ""}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [question.ID_PREGUNTA]: e.target.value,
                              }))
                            }
                            className="bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white"
                          />
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={isCorrect[question.ID_PREGUNTA] || false}
                              onChange={(e) =>
                                setIsCorrect((prev) => ({
                                  ...prev,
                                  [question.ID_PREGUNTA]: e.target.checked,
                                }))
                              }
                            />
                            Es correcta
                          </label>
                          <button
                            onClick={() =>
                              handleAddAnswer(question.ID_PREGUNTA)
                            }
                            className="self-start bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            disabled={loadingAddAnswer[question.ID_PREGUNTA]}
                          >
                            {loadingAddAnswer[question.ID_PREGUNTA] ? (
                              <i className="fas fa-spinner animate-spin mr-2" />
                            ) : null}
                            Añadir respuesta
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <textarea
                        placeholder="Nueva pregunta"
                        value={newQuestion[topic.ID_TEMA] || ""}
                        onChange={(e) =>
                          setNewQuestion((prev) => ({
                            ...prev,
                            [topic.ID_TEMA]: e.target.value,
                          }))
                        }
                        className="bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white w-full"
                      />
                      <button
                        onClick={() => handleAddQuestion(topic.ID_TEMA)}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                        disabled={loadingAddQuestion[topic.ID_TEMA]}
                      >
                        {loadingAddQuestion[topic.ID_TEMA] ? (
                          <i className="fas fa-spinner animate-spin mr-2" />
                        ) : null}
                        Añadir pregunta
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
