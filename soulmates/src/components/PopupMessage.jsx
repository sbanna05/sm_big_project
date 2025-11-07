import ScratchCard from "react-scratchcard-v2";

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
        <p>{message}</p>
      </div>
    </ScratchCard>
  );
};
export default PopupMessage;
