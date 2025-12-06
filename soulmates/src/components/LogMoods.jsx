import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { supabase } from "../services/supabaseClient.js";
import "../assets/moodboard.css";


function LogMoods() {
  const[selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  const moods = ["Angry","Sad", "Bored", "Happy", "Excited"];

  const handleStarClick = async (index) => {
    setSelectedMood(index);

    try {
      const {data: { user }} = await supabase.auth.getUser();

      const newMood = {
        user_id: user.id,
        type: moods[index],
        logged_at: new Date().toISOString()
      };
      
      await supabase.from('daily_moods').insert([newMood]);
    }
      catch(error){
        console.error('Error saving mood:', error)
      }
  };

  const goToGraph = async () => {
    navigate("/graph")    
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
