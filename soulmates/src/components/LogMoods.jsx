import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../assets/moodboard.css";


function LogMoods() {
  const[selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  const moods = ["Angry","Sad", "Bored", "Happy", "Excited"];

  const handleStarClick = async (index) => {
    setSelectedMood(index);
    const newMood = { rating: index + 1, mood: moods[index], date: new Date().toLocaleDateString()};

    try {
      let existingMoods = [];
      try {
        const result = await window.storage.get('moods');
        if (result?.value) {
          existingMoods = JSON.parse(result.value);
        }
      } catch (error) {
        // No moods yet, start fresh
      }
      
      const updatedMoods = [...existingMoods, newMood];
      await window.storage.set('moods', JSON.stringify(updatedMoods));
    } catch (error) {
      console.error('Failed to save mood:', error);
    }
  };

  const goToGraph = async () => {
    try {
      const result = await window.storage.get('moods');
      const moods = result?.value ? JSON.parse(result.value) : [];
      navigate("/graph", { state: { data: moods } });
    } catch (error) {
      navigate("/graph", { state: { data: [] } });
    }    
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

        <button onClick={goToGraph} className='graph-mood'>Mood Graph</button>

    </div>
  );
};

export default LogMoods;
