import { useState } from "react";
import UserHeader from "./UserHeader";
import UserGroups from "./UserGroups";

export default function UserDashboard() {
  const [card, setCard] = useState("groups");

  /**
   * change the content based on the name
   * @param cardname - the name of the card
   */
  const toggleCard = (cardname: string) => {
    setCard(cardname);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <div className="p-3">
        <UserHeader toggleCard={toggleCard} card={card} />
      </div>
      <div className="flex-1 flex items-center justify-center p-3">
        {card === "groups" && <UserGroups />}
      </div>
    </div>
  );
}
