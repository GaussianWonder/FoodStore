import IconCheck from "../icons/IconCheck";
import IconX from "../icons/IconX";

export interface AcceptRejectProps {
  onAccept: () => void;
  onReject: () => void;
}
const AcceptReject = ({ onAccept, onReject }: AcceptRejectProps) => {
  return (
    <div className="my-2 flex rounded-full">
      <button
        className="p-3 rounded-l-full bg-red-100 focus:outline-none focus:bg-red-300 active:bg-red-200 flex items-center justify-center transform hover:scale-110 transition-all hover:ring-1 ring-red-700 hover:z-10"
        type="button"
        onClick={onReject}
      >
        <span className="sr-only"> Reject </span>
        <IconX />
      </button>

      <button
        className="p-3 rounded-r-full bg-green-100 focus:outline-none focus:bg-green-300 active:bg-green-200 flex items-center justify-center transform hover:scale-110 transition-all hover:ring-1 ring-green-700"
        type="button"
        onClick={onAccept}
      >
        <span className="sr-only"> Accept </span>
        <IconCheck />
      </button>
    </div>
  );
}

export default AcceptReject;
