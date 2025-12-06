import React, {useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../assets/moodboard.css";

function MoodGraph(){
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

  useEffect(() => {
    const loadMoods = async () => {
      if (location.state?.data) {
        setData(location.state.data);
      } else {
        try {
          const result = await window.storage.get('moods');
          if (result?.value) {
            setData(JSON.parse(result.value));
          }
        } catch (error) {
          console.log('No moods found');
        }
      }
    };
    loadMoods();
  }, [location.state]);

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
