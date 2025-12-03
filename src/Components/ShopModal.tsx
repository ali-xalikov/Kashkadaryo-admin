import type { Shop } from "../types/shop";

type Props = {
  shop: Shop;
  onClose: () => void;
  onDelete: () => void;
};

export const ShopModal = ({ shop, onClose, onDelete }: Props) => {
  const openYandex = () =>
    window.open(
      `https://yandex.uz/maps/?text=${shop.lat},${shop.lng}&z=17`,
      "_blank"
    );

  const price = shop.price_per_kg ?? 0;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl p-6 z-50">
      <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

      {shop.image_url ? (
        <img
          src={shop.image_url}
          alt={shop.name}
          className=" h-64 object-cover rounded-2xl mb-4 shadow-lg mx-auto w-164"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center">
          <span className="text-gray-500 text-xl">Rasm yo‘q</span>
        </div>
      )}

      <h3 className="text-2xl font-bold text-center mb-2">{shop.name}</h3>
      <p className="text-xl text-center text-green-600 font-bold mb-8">
        {price.toLocaleString()} so'm/kg
      </p>

      <button
        onClick={openYandex}
        className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl text-xl mb-3"
      >
        Yandexda ochish
      </button>
      <button
        onClick={onDelete}
        className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl text-lg"
      >
        Do‘konni o‘chirish
      </button>
      <button
        onClick={onClose}
        className="w-full mt-4 text-gray-600 font-bold text-lg"
      >
        Yopish
      </button>
    </div>
  );
};
