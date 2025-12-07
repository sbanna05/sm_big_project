import React, {useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../assets/moodboard.css";
import { supabase } from "../services/supabaseClient.js";

function MoodGraph(){
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

  useEffect(() => {
  const loadMoods = async () => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Fetch moods from database for this user
    const { data: moodsData } = await supabase
      .from('daily_moods')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: true });

    // Convert mood names to ratings (1-5) for the graph
    const moods = ["Angry", "Sad", "Bored", "Happy", "Excited"];
    const transformed = moodsData.map((m) => ({
      rating: moods.indexOf(m.type) + 1,
      date: new Date(m.logged_at).toLocaleDateString(),
    }));
    
    setData(transformed);
  };

  loadMoods();
}, []);

    const transformed = data.map((m, i) =>
    ({
        id: i + 1,
        rating: m.rating,
        date: m.date,
    }));

    return(
        <div className='moodgraph-container'>
          <h1>Here's your looged moods</h1>
    
            {transformed.length == 0 ?
            (<p>You have no logged moods yet.</p>)
        :(
            <LineChart width={500} height={300} data={transformed}>
                <CartesianGrid strokeDashArray= "3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1,5]} />
                <Line type="monotone" dataKey="rating" stroke="var(--gold-color)" />
            </LineChart>
        )}
    
            <button onClick={() => navigate("/moodboard")} className='graph-mood'>Log Mood</button>
    
        </div>
      );
}

export default MoodGraph;
