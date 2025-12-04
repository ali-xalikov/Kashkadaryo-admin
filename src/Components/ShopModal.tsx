import type { Shop } from "../pages/MainPage";
import { useRef, useEffect } from "react";

type Props = {
  shop: Shop;
  onClose: () => void;
  onDelete: () => void;
};

export const ShopModal = ({ shop, onClose, onDelete }: Props) => {
  const touchStartY = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openYandex = () =>
    window.open(
      `https://yandex.uz/maps/?text=${shop.lat},${shop.lng}&z=17`,
      "_blank"
    );

  const price = shop.price_per_kg ?? 0;

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (touchY < 100) {
        touchStartY.current = touchY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY.current;

      if (deltaY > 0) {
        modal.style.transform = `translateY(${deltaY}px)`;
        modal.style.transition = "none";
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const currentY = e.changedTouches[0].clientY;
      const deltaY = currentY - touchStartY.current;

      if (deltaY > 100) {
        modal.style.transform = "translateY(100%)";
        modal.style.transition = "transform 0.3s ease-out";
        setTimeout(onClose, 300);
      } else {
        // Orqaga qaytarish animatsiyasi
        modal.style.transform = "translateY(0)";
        modal.style.transition = "transform 0.3s ease-out";
      }

      touchStartY.current = null;
    };

    modal.addEventListener("touchstart", handleTouchStart);
    modal.addEventListener("touchmove", handleTouchMove);
    modal.addEventListener("touchend", handleTouchEnd);

    return () => {
      modal.removeEventListener("touchstart", handleTouchStart);
      modal.removeEventListener("touchmove", handleTouchMove);
      modal.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl p-6 z-50 transform transition-transform duration-300"
      style={{ transform: "translateY(0)" }}
    >
      <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 cursor-grab active:cursor-grabbing" />

      {shop.image_url ? (
        <img
          src={shop.image_url}
          alt={shop.name}
          className="w-full h-64 object-cover rounded-2xl mb-4 shadow-lg"
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
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl text-xl mb-3 transition"
      >
        Yandexda ochish
      </button>

      <button
        onClick={onDelete}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl text-lg transition"
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
