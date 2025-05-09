interface UserEvaluationProps {
  presentationId: string;
}

export default function UserPresentEvaluation({
  presentationId,
}: UserEvaluationProps) {
  return (
    <main className="flex items-center justify-center bg-zinc-900 w-full min-h-[calc(100vh-6rem)] p-6 text-white">
      <div className="max-w-4xl w-full mx-auto bg-zinc-800 rounded-xl shadow-md p-6 border-4 border-blue-500 max-h-[80vh] overflow-y-auto">
        <h1>PRUEBAAAA: ${presentationId}</h1>
      </div>
    </main>
  );
}
