"use client";
import {
  useJsApiLoader,
  StandaloneSearchBox,
  Autocomplete,
} from "@react-google-maps/api";
import { useRef } from "react";

import toast from "react-hot-toast";

export type AddressResult = {
  houseNumber: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  county: string;
};

type Props = {
  onSelect: (data: AddressResult) => void;
};

export default function UKAddressAutocomplete({ onSelect }: Props) {
  const inputRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
    region: "gb",
  });

  const handleChnage = () => {
    const places = inputRef.current?.getPlace();

    if (!places) {
      toast.error("No address selected");
      return;
    }

    const place = places as google.maps.places.PlaceResult;

    if (!place.geometry || !place.address_components) {
      toast.error("Invalid address selected");
      return;
    }

    const getComponent = (type: string) =>
      place.address_components?.find((comp) => comp.types.includes(type))
        ?.long_name || "";

    const addressResult: AddressResult = {
      houseNumber: getComponent("street_number"),
      address: place.formatted_address || "",
      city: getComponent("postal_town") || getComponent("locality"),
      postcode: getComponent("postal_code"),
      country: getComponent("country"),
      county:
        getComponent("administrative_area_level_2") || // county
        getComponent("administrative_area_level_1"), // fallback
    };

    onSelect(addressResult);
    console.log(addressResult, "result");
  };
  if (!isLoaded)
    return (
      <input
        disabled
        placeholder="Loading address search..."
        className="w-full rounded border p-3"
      />
    );

  return (
    <div className="w-full">
      <Autocomplete
        onLoad={(autocomplete) => (inputRef.current = autocomplete)}
        onPlaceChanged={handleChnage}
        options={{
          componentRestrictions: { country: "gb" },
          //types: ["postal_code"],
        }}
      >
        <input
          type="text"
          placeholder="Start typing your UK address..."
          className="h-[39px] w-full rounded-lg border border-[#F4F4F4] px-3 shadow focus:border-green-600 focus:outline-none"
        />
      </Autocomplete>
    </div>
  );
}
