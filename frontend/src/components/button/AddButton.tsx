import { ButtonProps } from '../../types/components/button';

const AddButton = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="z-10 block p-4 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring focus:ring-green-300"
      type="button"
      onClick={onClick}
    >
      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
  );
};

export default AddButton;
