import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSubjects from "./AdminSubjects";
import AdminTopics from "./AdminTopics";
import AdminEvaluation from "./AdminEvaluation";

export default function AdminDashboard() {
  const [card, setCard] = useState<string>("subjects");

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
        <AdminHeader toggleCard={toggleCard} card={card} />
      </div>
      <div className="flex-1 flex items-center justify-center p-3">
        {card === "subjects" && <AdminSubjects />}
        {card === "topics" && <AdminTopics />}
        {card === "evaluation" && <AdminEvaluation />}
      </div>
    </div>
  );
}
