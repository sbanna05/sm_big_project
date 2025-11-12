import React, {useState} from 'react'
import { FaStar } from "react-icons/fa";

function LogMoods() {
  const[selectedMood, setSelectedMood] = useState(null);
  const[loggedMoods, setLoggedMoods] = useState([]);

  const moods = ["Angry","Sad", "Bored", "Happy", "Excited"];

  const handleStarClick = (index) => {
    setSelectedMood(index);
    const newMood = { rating: index + 1, mood: moods[index], date: new Date().toLocaleDateString};
    setLoggedMoods([...loggedMoods, newMood]);
    alert(`${moods[index]} mood has been logged`);
  };

  const handleShowMoods = () => {
    if(loggedMoods.length == 0){
      alert("You have no logged moods");
      return;
    }
    const list = loggedMoods
      .map((m, i) => `${i+1}. ${m.mood} (${m.date})`)
      .join("\n");
    alert(`Logged mood: ${list}`); 
  };

  return(
    <div className='moodboard-container'>
        <div className='stars'>
            {[...Array(5)].map((_, index) =>(
                <FaStar
                    key={index}
                    size={50}
                    className={index <= selectedMood ? "star active": "star"}
                    onClick={() => handleStarClick(index)}
                />
            ))}
        </div>

        <div className='mood-labels'>
            {moods.map((mood, index) => (
                <span key={index} className='mood-text'>
                    {mood}
                </span>
            ))}
        </div>

        <button onClick={handleShowMoods}>Mood Graph</button>

    </div>
  );
};

export default LogMoods;
