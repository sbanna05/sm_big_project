import ScratchCard from "react-scratchcard";

const PopupMessage = ({ message }) => {
  const settings = {
    width: 300,
    height: 200,
    image: "/card.png",
    finishPercent: 70
  };

  return (
    <ScratchCard {...settings}>
      <div className="text-center p-3">
        <h4>✨ The Stars have a message for you ✨</h4>
        <p>{message}</p>
      </div>
    </ScratchCard>
  );
};
export default PopupMessage;
