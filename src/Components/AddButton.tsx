import { useNavigate } from "react-router-dom";

export const AddButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/add-shop")}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-5xl shadow-2xl z-40"
    >
      +
    </button>
  );
};
