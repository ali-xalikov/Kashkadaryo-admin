import {
  YMaps,
  Map,
  Polygon,
  Placemark,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { districtsData } from "../data/districts";
import type { Shop } from "../pages/MainPage";

type Props = {
  selectedDistrict: any;
  shops: Shop[];
  onDistrictClick: (d: any) => void;
  onShopClick: (shop: Shop) => void;
  mapRef: (instance: any) => void;
};

export const MapComponent = ({
  selectedDistrict,
  shops,
  onDistrictClick,
  onShopClick,
  mapRef,
}: Props) => {
  const districtShops = (id: number) =>
    shops.filter((s) => s.district_id === id);

  return (
    <YMaps query={{ lang: "uz_UZ" }}>
      <Map
        width="100%"
        height="100%"
        defaultState={{ center: [38.86, 65.79], zoom: 8 }}
        instanceRef={mapRef}
      >
        <ZoomControl />
        {districtsData.map((d) => (
          <Polygon
            key={d.id}
            geometry={[d.boundary]}
            options={{
              fillColor:
                selectedDistrict?.id === d.id ? "#6366F180" : "#3B82F620",
              strokeWidth: 4,
            }}
          />
        ))}
        {districtsData.map((d) => (
          <Placemark
            key={`c-${d.id}`}
            geometry={d.center}
            properties={{ hintContent: d.name }}
            options={{
              preset:
                districtShops(d.id).length > 0
                  ? "islands#violetDotIcon"
                  : "islands#blueDotIcon",
            }}
            onClick={() => onDistrictClick(d)}
          />
        ))}
        {shops.map((shop) => (
          <Placemark
            key={shop.id}
            geometry={[shop.lat, shop.lng]}
            properties={{ hintContent: shop.name }}
            options={{ preset: "islands#greenShopIcon" }}
            onClick={() => onShopClick(shop)}
          />
        ))}
      </Map>
    </YMaps>
  );
};
