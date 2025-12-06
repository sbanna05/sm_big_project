import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../assets/moodboard.css";


function LogMoods() {
  const[selectedMood, setSelectedMood] = useState(null);
  const[loggedMoods, setLoggedMoods] = useState([]);
  const navigate = useNavigate();

  const moods = ["Angry","Sad", "Bored", "Happy", "Excited"];

  const handleStarClick = (index) => {
    setSelectedMood(index);
    const newMood = { rating: index + 1, mood: moods[index], date: new Date().toLocaleDateString()};
    setLoggedMoods([...loggedMoods, newMood]);
    //alert(`${moods[index]} mood has been logged`);
  };

  return(
    <div className='moodboard-container'>
      <div className='stars'>
            {[...Array(5)].map((_, index) =>(
                <FaStar
                    key={index}
                    size={50}
                    className={selectedMood !==null && index <= selectedMood ? "star active": "star"}
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

        <button onClick={() => navigate("/graph", {state: {data: loggedMoods}})} className='graph-mood'>Mood Graph</button>

    </div>
  );
};

export default LogMoods;
