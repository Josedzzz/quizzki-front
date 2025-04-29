export default function AboutUsCard() {
  return (
    <main className="flex items-center justify-center w-full">
      <div className="w-full max-w-xl bg-zinc-800 p-8 border-4 border-blue-500 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Sobre Nosotros
        </h1>
        <p className="text-white mb-4">
          ¡Bienvenido a{" "}
          <span className="text-blue-400 font-semibold">Quizzki</span>! Nuestra
          plataforma está diseñada para facilitar el acceso y la realización de
          exámenes a los estudiantes, mientras brinda a los profesores potentes
          herramientas para crear y subir sus propias pruebas.
        </p>
        <p className="text-white mb-4">
          Quizzki fue desarrollado como parte del proyecto de la asignatura{" "}
          <span className="text-blue-400 font-semibold">Bases de Datos II</span>
          . Nos apasiona crear una experiencia fluida y confiable tanto para
          estudiantes como para docentes.
        </p>
        <p className="text-zinc-300 text-sm text-center">
          ¡Gracias por ser parte de nuestro camino!
        </p>
      </div>
    </main>
  );
}
