// src/pages/AddShopPage.tsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase, uploadShopImage } from "../lib/supabase";
import { districtsData } from "../data/districts";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export const AddShopPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const preId = (state as { districtId?: number })?.districtId || "";

  const [name, setName] = useState("");
  const [districtId, setDistrictId] = useState(preId ? String(preId) : "");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        setLoading(false);
      },
      () => {
        alert("GPS ishlamadi");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !districtId || !lat || !lng || !price)
      return alert("Barcha maydonlar to‘ldirilishi kerak!");

    setLoading(true);
    try {
      // 1. Do‘kon yaratish
      const { data: shop, error } = await supabase
        .from("shops")
        .insert({
          name,
          district_id: Number(districtId),
          lat: Number(lat),
          lng: Number(lng),
          price_per_kg: Number(price),
        })
        .select()
        .single();

      if (error) throw error;

      // 2. Rasm yuklash (agar tanlangan bo‘lsa)
      if (image) {
        const imageUrl = await uploadShopImage(image, shop.id);
        await supabase
          .from("shops")
          .update({ image_url: imageUrl })
          .eq("id", shop.id);
      }

      alert("Do‘kon va rasm muvaffaqiyatli qo‘shildi!");
      navigate("/");
    } catch (err: any) {
      alert("Xato: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          Yangi do‘kon
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* RASMLI QISM */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Do‘kon rasmi (ixtiyoriy)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white"
            />
            {preview && (
              <img
                src={preview}
                alt="Oldindan ko‘rish"
                className="mt-4 rounded-2xl w-full h-80 object-cover shadow-xl"
              />
            )}
          </div>

          <input
            required
            placeholder="Do‘kon nomi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border-2 rounded-2xl text-lg"
          />
          <select
            required
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            className="w-full p-4 border-2 rounded-2xl text-lg"
          >
            <option value="">Tuman tanlang</option>
            {districtsData.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={getLocation}
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-xl"
          >
            {loading ? "Joylashuv aniqlanmoqda..." : "Hozirgi joylashuv"}
          </button>

          {lat && lng && (
            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <YMaps query={{ lang: "uz_UZ", load: "package.full" }}>
                <Map
                  width="100%"
                  height="100%"
                  state={{ center: [+lat, +lng], zoom: 16 }}
                >
                  <Placemark geometry={[+lat, +lng]} />
                </Map>
              </YMaps>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="p-4 border-2 rounded-2xl"
            />
            <input
              required
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="p-4 border-2 rounded-2xl"
            />
          </div>

          <input
            required
            type="number"
            placeholder="Narxi (so'm/kg)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-4 border-2 rounded-2xl"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl text-xl"
            >
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-500 text-white font-bold py-5 rounded-2xl text-xl"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
