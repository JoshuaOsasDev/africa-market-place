"use client";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

import toast from "react-hot-toast";

type AddressResult = {
  address: string;
  city: string;
  postcode: string;
  country: string;
  lat: number;
  lng: number;
};

export default function UKAddressAutocomplete() {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
    region: "gb"
  });

  const handleChnage = () => {
    const place = inputRef.current?.getPlaces() as any[]
    const location = {
      
    }

    const { geometry: { 
      location: { 
        lat, lng
      }
    } } = place[0]
  

    console.log("longitude:", lng(), "latitude:", lat())
   
  }
  if (!isLoaded) return <input disabled placeholder="Loading address search..." className="w-full p-3 border rounded" />;

  return (
    <div className="space-y-2">
      <StandaloneSearchBox
       /*  options={
        
        } */
        onLoad={(ref) => inputRef.current = ref}
        onPlacesChanged={handleChnage}
        
      >
          <input
            placeholder={
              isLoaded
                ? "Start typing your UK address..."
                : "Loading address search..."
            }
          className="w-full rounded border p-3 bg-transparent!"
         
          />
        </StandaloneSearchBox>
    </div>
  );
}
