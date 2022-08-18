export default function Die({ value, isHeld, holdDice }) {
  return (
    <div
      onClick={holdDice}
      className={`Die--container ${isHeld ? "Die--container_held" : ""}`}
    >
      {value}
    </div>
  );
}
