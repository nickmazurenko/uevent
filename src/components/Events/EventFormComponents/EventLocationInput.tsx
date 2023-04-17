import React, { useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { Place, Location } from "./EventLocationTypeInput";

const MAP_OPTIONS = {
  center: { lat: 37.4221, lng: -122.0841 },
  fullscreenControl: true,
  mapTypeControl: false,
  streetViewControl: true,
  zoom: 11,
  zoomControl: true,
  maxZoom: 22,
  mapId: "",
};

const ComponentForm = [
  "location",
  "locality",
  "administrative_area_level_1",
  "country",
  "postal_code",
];

const getInput = (component: string) =>
  document.getElementById(component + "-input");

export default function EventLocationInput({
  setLocation,
  location,
}: {
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  location: Location;
}) {
  const handlePlaceChange = (place: Place) => {
    const { lat, lng } = place.geometry.location;
    setLocation((location) => ({
      ...location,
      place: {
        ...location.place,
        coordinates: { lat: lat(), lng: lng() },
      },
    }));

    ComponentForm.forEach((component) => {
      // @ts-ignore
      onInputChange({ target: getInput(component) });
    });
  };

  const onInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLocation((location) => ({
      ...location,
      place: { ...location.place, [name]: value },
    }));
  };

  useEffect(() => {
    myCustomLoadFunction(handlePlaceChange);
  }, []);

  return (
    <div className=" flex flex-col md:flex-row w-full items-center gap-4 relative ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 mb-2 text-lg">
          <BiLocationPlus size={30} />
          <span className="sb-title">Address Selection</span>
        </div>
        <input
          className="border-b-2 border-b-ueventContrast border-0 bg-transparent"
          type="text"
          placeholder="Address"
          name="address"
          value={location.place["address"]}
          id="location-input"
          onChange={onInputChange}
        />
        <input
          className="border-b-2 border-b-ueventContrast border-0 bg-transparent"
          type="text"
          name="additional"
          value={location.place["additional"]}
          placeholder="Apt, Suite, etc (optional)"
          onChange={onInputChange}
        />
        <input
          className="border-b-2 border-b-ueventContrast border-0 bg-transparent"
          type="text"
          placeholder="City"
          name="city"
          value={location.place["city"]}
          id="locality-input"
          onChange={onInputChange}
        />
        <div className="flex flex-row gap-2">
          <input
            type="text"
            className="w-1/2 border-b-2 border-b-ueventContrast border-0 bg-transparent"
            placeholder="State/Province"
            name="state"
            value={location.place["state"]}
            id="administrative_area_level_1-input"
            onChange={onInputChange}
          />
          <input
            type="text"
            className="w-1/2 border-b-2 border-b-ueventContrast border-0 bg-transparent"
            placeholder="Zip/Postal code"
            name="postalCode"
            value={location.place["postalCode"]}
            id="postal_code-input"
            onChange={onInputChange}
          />
        </div>
        <input
          className="w-full border-b-2 border-b-ueventContrast border-0 bg-transparent"
          type="text"
          placeholder="Country"
          name="country"
          value={location.place["country"]}
          id="country-input"
          onChange={onInputChange}
        />
      </div>
      <div
        className="map rounded-lg"
        style={{ height: "300px", width: "100%" }}
        id="gmp-map"
      ></div>
    </div>
  );
}

const myCustomLoadFunction = async (handlePlaceChange: Function) => {
  try {
    const { Loader } = await import("@googlemaps/js-api-loader");
    const loader = new Loader({
      apiKey: "AIzaSyC8AQMHs7vNcQgwd-VAHsbG-kotPHI5ws8",
      version: "weekly",
      libraries: ["places"],
    });
    await loader.load();
    // @ts-ignore
    const map = new window.google.maps.Map(
      document.getElementById("gmp-map"),
      MAP_OPTIONS
    );
    // @ts-ignore
    const marker = new window.google.maps.Marker({
      map: map,
      draggable: false,
    });
    const autocompleteInput = getInput("location");
    // @ts-ignore
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput,
      {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      }
    );

    const geocoder = new window.google.maps.Geocoder();
    map.addListener("click", (event) => {
      geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status === "OK") {
          const place = results[0];
          renderAddress(place);
          fillInAddress(place);
          handlePlaceChange(place);
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });
    });

    autocomplete.addListener("place_changed", function () {
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert(`No details available for input: '${place.name}'`);
        return;
      }
      renderAddress(place);
      fillInAddress(place);
      handlePlaceChange(place);
    });

    const fillInAddress = (place: Place) => {
      const addressNameFormat = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
      };

      const getAddressComp = (type: string): string => {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            // @ts-ignore
            return component[addressNameFormat[type]];
          }
        }
        return "";
      };

      // @ts-ignore
      getInput("location").value =
        getAddressComp("street_number") + " " + getAddressComp("route");

      for (const component of ComponentForm) {
        if (component !== "location") {
          // @ts-ignore
          getInput(component).value = getAddressComp(component);
        }
      }
    };

    const renderAddress = (place: Place) => {
      map.setCenter(place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    };
  } catch (e) {
    console.error(e);
  }
};
