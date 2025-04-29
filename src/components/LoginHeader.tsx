type LoginHeaderProps = {
  toggleCard: (cardname: string) => void;
  card: string;
};

export default function LoginHeader({ toggleCard, card }: LoginHeaderProps) {
  const linkClasses = (link: string) =>
    `hover:text-white hover:scale-105 text-sm sm:text-md md:text-lg transition duration-300 ease-in-out font-bold ${
      card === link
        ? "border-b-2 border-white text-white"
        : "text-white hover:text-white"
    }`;

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[94%] bg-blue-500 shadow-lg rounded-2xl p-2 z-50 ">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-2">
        <h2 className="text-lg sm:text-1xl md:text-2xl font-bold text-white">
          Quizzki
        </h2>

        {/* navigation links */}
        <nav className="flex gap-6">
          <a
            onClick={() => toggleCard("about-us")}
            className={linkClasses("about-us")}
          >
            Nosotros
          </a>
          <a
            onClick={() => toggleCard("login")}
            className={linkClasses("login")}
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
