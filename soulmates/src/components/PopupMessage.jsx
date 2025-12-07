import { useState } from "react";
import ScratchCard from "react-scratchcard-v2";
import "../assets/popup.css";

const PopupMessage = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const settings = {
    width: 350,
    height: 280,
    image: "/card.png",
    finishPercent: 60,
  };

  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div
          className="popup-close"
          onClick={() => {
            setVisible(false);
            onClose && onClose();
          }}
        >
          ✕
        </div>

        <ScratchCard {...settings}>
          <div className="text-center justify-content-center p-3">
            <p>{message}</p>
          </div>
        </ScratchCard>
      </div>
    </div>
  );
};

export default PopupMessage;
