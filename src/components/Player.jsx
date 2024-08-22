import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        // setIsEditing(!isEditing) schedule a state update to true not immediately update state
        setIsEditing(editing=>!editing) //Best Practice
        if (isEditing){
        onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    if (isEditing){
        editablePlayerName = <input type="text" required value = {playerName} onChange={handleChange}/>
    }
    return (
        <li className={isActive ? "active": undefined}> 
            <span className="player">
            {editablePlayerName}
            <span className="palyer-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save':'Edit' }</button>
          </li>
    )
}