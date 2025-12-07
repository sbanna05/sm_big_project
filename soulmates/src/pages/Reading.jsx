import { useState } from 'react';
import '../assets/reading.css';

const readings = [
  {
    sign: "ARIES",
    symbol: "♈",
    dates: "~ March 21 – April 19",
    text: "Today is the day for creativity, while you leave the logic for tomorrow, even when it comes to work. You are bent upon success at work, but Ganesha warns that it requires commitment and devotion. In the evening, you may want to be left alone with your spouse or a book."
  },
  {
    sign: "TAURUS",
    symbol: "♉",
    dates: "~ April 20 – May 20",
    text: "Focus on stability today. Financial decisions may pop up, but patience and careful planning will be your allies. Evening brings comfort in simple pleasures, like music, food, or a relaxing walk."
  },
  {
    sign: "GEMINI",
    symbol: "♊",
    dates: "~ May 21 – June 20",
    text: "Communication is key today. Your curiosity may lead to unexpected encounters or new ideas. Remember to listen as much as you speak to make meaningful connections."
  },
  {
    sign: "CANCER",
    symbol: "♋",
    dates: "~ June 21 – July 22",
    text: "Emotions run high today. Focus on self-care and nurturing your close relationships. A quiet evening at home can bring clarity and peace."
  },
  {
    sign: "LEO",
    symbol: "♌",
    dates: "~ July 23 – August 22",
    text: "Shine bright today! Your confidence attracts attention, but remember to be generous with praise and support for others. Evening may bring a creative or romantic spark."
  },
  {
    sign: "VIRGO",
    symbol: "♍",
    dates: "~ August 23 – September 22",
    text: "Details matter today. Organizing tasks and planning ahead will make your day smoother. Take a moment to appreciate the small victories in your work and personal life."
  },
  {
    sign: "LIBRA",
    symbol: "♎",
    dates: "~ September 23 – October 22",
    text: "Balance is your theme today. Seek harmony in relationships and avoid overcommitting. A thoughtful conversation could deepen a bond."
  },
  {
    sign: "SCORPIO",
    symbol: "♏",
    dates: "~ October 23 – November 21",
    text: "Intensity surrounds you today. Dive deep into passions, but be cautious with secrets or sensitive matters. Nighttime may favor introspection or spiritual reflection."
  },
  {
    sign: "SAGITTARIUS",
    symbol: "♐",
    dates: "~ November 22 – December 21",
    text: "Adventure beckons! Try something new, whether it’s learning, travel, or meeting someone different. Keep a flexible mindset, as unexpected twists may bring joy."
  },
  {
    sign: "CAPRICORN",
    symbol: "♑",
    dates: "~ December 22 – January 19",
    text: "Discipline pays off today. Focus on long-term goals and practical solutions. A quiet evening can reward you with reflection and planning for the future."
  },
  {
    sign: "AQUARIUS",
    symbol: "♒",
    dates: "~ January 20 – February 18",
    text: "Innovation is favored today. Your ideas can inspire others, so share them boldly. Social interactions may lead to surprising opportunities."
  },
  {
    sign: "PISCES",
    symbol: "♓",
    dates: "~ February 19 – March 20",
    text: "Intuition guides you today. Pay attention to dreams and feelings—they carry valuable insights. Creative or spiritual pursuits bring fulfillment this evening."
  }
];

function Reading() {
  const [index, setIndex] = useState(0);

  const prevReading = () => {
    setIndex((prev) => (prev === 0 ? readings.length - 1 : prev - 1));
  };

  const nextReading = () => {
    setIndex((prev) => (prev === readings.length - 1 ? 0 : prev + 1));
  };

  const today = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  const current = readings[index];

  return (
    <div className="reading-page">
      <h1 className="reading-title">
        Cosmic Weather Update:<br />Here’s Your Sign’s Forecast
      </h1>

      <div className="reading-card">
        <h2 className="reading-sign">
          {current.symbol} {current.sign} <span className="reading-dates">{current.dates}</span>
        </h2>
        <p className="reading-date">{today}</p>
        <p className="reading-text">{current.text}</p>
      </div>

      <div className="reading-controls">
        <button onClick={prevReading}>◀ Previous</button>
        <button onClick={nextReading}>Next ▶</button>
      </div>
    </div>
  );
}

export default Reading;
