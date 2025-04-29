import { useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginCard from "./LoginCard";
import AboutUsCard from "./AboutusCard";

export default function LoginDashboard() {
  const [card, setCard] = useState<string>("login");

  /**
   * change the content of the card
   * @param cardname - the name of the card to display
   */
  const toggleCard = (cardname: string) => {
    setCard(cardname);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <div className="p-3">
        <LoginHeader toggleCard={toggleCard} card={card} />
      </div>
      <div className="flex-1 flex items-center justify-center p-3">
        {card === "about-us" && <AboutUsCard />}
        {card === "login" && <LoginCard />}
      </div>
    </div>
  );
}
