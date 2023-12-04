import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActivePlayer,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function handleEditPlayerName(event) {
    setPlayerName(event.target.value);
  }

  let isEditText = !isEditing ? "Edit" : "Save";

  let editPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editPlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleEditPlayerName}
      />
    );
  }

  return (
    <li className={isActivePlayer ? "active" : undefined}>
      <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditText}</button>
    </li>
  );
}
