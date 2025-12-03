import { districtsData } from "../data/districts";
import type { District } from "../data/districts";

import type { Shop } from "../pages/MainPage";

type Props = {
  selectedDistrict: District | null;
  onSelect: (d: District) => void;
  onBack: () => void;
  shops: Shop[];
  onShopClick: (shop: Shop) => void;
  onAddClick: (id: number) => void;
  onDeleteClick: (shop: Shop) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({
  selectedDistrict,
  onSelect,
  onBack,
  shops,
  onShopClick,
  onAddClick,
  onDeleteClick,
  isOpen,
  onClose,
}: Props) => {

  const districtShops = (id: number) =>
    shops.filter((s) => s.district_id === id);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold">Tumanlar</h2>
        <button onClick={onClose} className="text-3xl">
          X
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-full pb-32">
        {selectedDistrict ? (
          <>
            <button
              onClick={onBack}
              className="mb-4 text-indigo-600 font-bold text-lg"
            >
              Back
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedDistrict.name}</h3>
            <button
              onClick={() => {
                onAddClick(selectedDistrict.id);
                onClose();
              }}
              className="w-full mb-6 bg-green-600 text-white py-4 rounded-xl font-bold text-lg"
            >
              + Do'kon qo'shish
            </button>
            {districtShops(selectedDistrict.id).map((shop) => (
              <div
                key={shop.id}
                onClick={() => {
                  onShopClick(shop);
                  onClose();
                }}
                className="bg-blue-50 p-5 rounded-2xl mb-3 shadow cursor-pointer hover:bg-blue-100 relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(shop);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full text-sm font-bold z-10"
                >
                  X
                </button>
                <div className="font-bold text-lg pr-10">{shop.name}</div>
                <div className="text-green-600 font-bold">
                  {shop.price_per_kg.toLocaleString()} so'm
                </div>
              </div>
            ))}
          </>
        ) : (
          districtsData.map((d) => (
            <div
              key={d.id}
              onClick={() => onSelect(d)}
              className={`p-5 rounded-2xl mb-3 cursor-pointer shadow-lg hover:scale-105 ${
                districtShops(d.id).length > 0
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="font-bold text-lg">{d.name}</div>
              <div className="text-sm opacity-80">
                {districtShops(d.id).length} ta
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
