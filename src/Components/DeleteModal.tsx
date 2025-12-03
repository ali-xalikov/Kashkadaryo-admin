import type { Shop } from "../pages/MainPage";

type Props = {
  shop: Shop;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteModal = ({ shop, onConfirm, onCancel }: Props) => (
  <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl z-100">
      <h3 className="text-2xl font-bold text-center mb-4 text-red-600">
        Diqqat!
      </h3>
      <p className="text-center text-lg mb-8">
        <strong>{shop.name}</strong>
        <br />
        do‘konini o‘chirishni xohlaysizmi?
      </p>
      <div className="flex gap-4">
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 text-white font-bold py-4 rounded-2xl text-lg"
        >
          Ha, o‘chirish
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-500 text-white font-bold py-4 rounded-2xl text-lg"
        >
          Bekor qilish
        </button>
      </div>
    </div>
  </div>
);
