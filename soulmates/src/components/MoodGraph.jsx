import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../assets/moodboard.css";

function MoodGraph(){
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state?.data || [];

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