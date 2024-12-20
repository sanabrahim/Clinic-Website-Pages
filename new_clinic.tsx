import React, { useState, useRef, useEffect } from "react";
import { X, Delete, User2Icon } from "lucide-react";
import { Input } from "../shared/Input";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { isValidPhoneNumber } from "libphonenumber-js";
import { COUNTRY_LIST } from "@/constants/countries";
import { Button } from "../shared/Button";
import { env } from "@/env";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "../shared/Select";
import { $api } from "@/api";

type Location = {
  lat: number;
  lng: number;
};

type AddClinicFormProps = {
  onDone: () => void;
};

export function AddClinicForm({ onDone }: AddClinicFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCode, setSelectedCode] = useState("");

  const [formData, setFormData] = useState({
    clinicName: "",
    phoneNumber: 0,
    selectedCountry: "",
    email: "",
    building: "",
    floor: "",
    street: "",
    city: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [showInMap, setShowInMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null); // Reference to the search bar input
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input bar
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const PhoneNumber = `+${selectedCode}${phoneNumber}`;

    if (!isValidPhoneNumber(PhoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }
  };

  const handleDeletePhoneNumber = () => {
    setPhoneNumber("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission,  save to Supabase
  };

  useEffect(() => {
    if (showMap && mapRef.current && !map) {
      // Create the map instance
      const googleMap = new google.maps.Map(mapRef.current as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 10,
      });

      // Check if google.maps.places exists before creating the SearchBox
      if (!google.maps.places) {
        console.error(
          "Google Places library not loaded. Ensure the 'places' library is included in the Google Maps script."
        );
        return;
      }

      // Input for the search box
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);

      // Add the search box to the map UI
      // Ensure the array is initialized
      if (googleMap.controls && googleMap.controls[google.maps.ControlPosition.TOP_LEFT]) {
        googleMap.controls[google.maps.ControlPosition.TOP_LEFT] =
          googleMap.controls[google.maps.ControlPosition.TOP_LEFT] || [];
        googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      }

      // Handle the map click event to place a marker
      googleMap.addListener("click", (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng;
        if (latLng) {
          const location = {
            lat: latLng.lat(),
            lng: latLng.lng(),
          };

          // Remove existing marker if any
          if (marker) {
            marker.setMap(null);
          }

          // Set a new marker at the clicked location
          const newMarker = new google.maps.Marker({
            position: location,
            map: googleMap,
          });

          setMarker(newMarker);
          setSelectedLocation(location);
        }
      });

      // Update the search box bounds when the map bounds change
      googleMap.addListener("bounds_changed", () => {
        searchBox.setBounds(googleMap.getBounds() as google.maps.LatLngBounds);
      });

      let markers: google.maps.Marker[] = [];
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name, and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          // Create a marker for each place.
          const newMarker = new google.maps.Marker({
            map: googleMap,
            position: place.geometry.location,
          });

          markers.push(newMarker);
          setMarker(newMarker);
          setSelectedLocation(location);

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        googleMap.fitBounds(bounds);
      });

      setMap(googleMap);
    }
  }, [showMap, map, marker]);

  // Update the input bar when the user presses "Done"
  const handleDone = () => {
    if (selectedLocation && inputRef.current) {
      return (
        <APIProvider apiKey={env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100vw", height: "100vh" }}
            defaultCenter={{
              lat: selectedLocation.lat,
              lng: selectedLocation.lng,
            }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </APIProvider>
      );
    }
    setShowMap(false); // Close the map modal after the user clicks "Done"
  };

  /* const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationName }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const latLng = results[0].geometry.location;
        setSelectedLocation({
          lat: latLng.lat(),
          lng: latLng.lng(),
        });
      }
    });
  };*/

  const groupedOptions = COUNTRY_LIST.map((group) => ({
    groupLabel: group.group,
    options: group.countries.map((country) => ({
      label: country.countryName,
      value: country.isoCode,
      flag: country.countryFlag,
      code: country.countryCode,
    })),
  }));

  useEffect(() => {
    const isFormValid = validateForm();
    setIsButtonDisabled(!isFormValid);
  }, [formData]);

  const validateForm = () => {
    const { clinicName, phoneNumber, selectedCountry, email, building, floor, street, city } =
      formData;

    // Basic validation: Ensure all fields are filled with valid data
    if (
      clinicName &&
      phoneNumber > 0 &&
      selectedCountry &&
      email.includes("@") &&
      building &&
      floor &&
      street &&
      city
    ) {
      return true;
    }
    return false;
  };

  const handleCountryChange = (value: string) => {
    let selectedCountryData: { countryName: string; countryCode: string } | null = null;
    setSelectedCountry(value);

    // Loop through the COUNTRY_LIST to find the country with the given isoCode
    for (const group of COUNTRY_LIST) {
      selectedCountryData = group.countries.find((country) => country.isoCode === value) || null;
      if (selectedCountryData) {
        break; // Exit the loop if we found the country
      }
    }

    // Ensure selectedCountryData is not null before accessing its properties
    if (selectedCountryData) {
      // Update selected country name
      setSelectedCode(selectedCountryData.countryCode); // Update selected country code
    } else {
      // Handle the case when the country is not found (optional)
      setSelectedCountry(""); // Reset selected country if not found
      setSelectedCode(""); // Reset selected code if not found
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-lg">
      <div className="relative flex flex-col items-center">
        <h1 className="mb-2 text-center text-xl font-bold">Add New Clinic</h1>
        <X
          onClick={onDone}
          className="absolute right-4 text-black hover:text-gray-700 focus:outline-none"
        />
      </div>
      <div className="flex items-center justify-center">
        <User2Icon className="h-24 w-24 rounded-full bg-gray-200 text-sm"></User2Icon>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-center space-y-2">
          <div className="w-full">
            <label className="block text-sm font-medium text-black">Clinic Name</label>
            <Input
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              placeholder="Clinic Name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-black">Contact Number</label>
            <div className="flex items-center gap-2 space-x-2">
              <div className="mb-1 flex h-10 items-center gap-2 overflow-hidden rounded border border-gray-300">
                <Select onValueChange={(value) => handleCountryChange(value)}>
                  <SelectTrigger className="w-1/3">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupedOptions.map((group) => (
                      <SelectGroup key={group.groupLabel}>
                        <SelectLabel>{group.groupLabel}</SelectLabel>
                        {group.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className="flex items-center space-x-2">
                              <span className="emoji-font">{option.flag}</span>
                              <span>{option.label}</span>
                              <span>({option.code})</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(ev) => setPhoneNumber(ev.target.value)}
                  className="w-2/3 rounded-r border border-white bg-white p-2 focus:outline-none"
                />
                <Delete
                  className="ml-2 cursor-pointer text-black"
                  size={30}
                  onClick={handleDeletePhoneNumber}
                />
              </div>
            </div>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}

            <label className="block text-sm font-medium text-black">Email</label>
            <div className="flex items-center space-x-2">
              <div className="mb-1 flex h-10 w-full items-center overflow-hidden rounded border border-gray-300">
                <Input
                  type="text"
                  required
                  placeholder="something@mail.com"
                  className="mt-1 block w-full rounded-md border border-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChangeEmail}
                />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black">Building</label>
                <Input
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  placeholder="Building"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black">Floor</label>
                <Input
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="Floor"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black">Street</label>
                <Input
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black">City</label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="justify-start space-y-2">
          <label className="felx block justify-start text-sm font-medium text-black">Country</label>
          <div className="flex justify-start space-x-2">
            <div className="mb-1 flex h-10 w-full items-center overflow-hidden rounded">
              <Select
                value={selectedCountry} // Use the selectedCountry as the default, but allow modification
                onValueChange={(value) => setSelectedCountry(value)}>
                <SelectTrigger id="modifiedCountry">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {groupedOptions.map((group) => (
                    <SelectGroup key={group.groupLabel}>
                      <SelectLabel>{group.groupLabel}</SelectLabel>
                      {group.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex items-center space-x-2">
                            <span className="emoji-font">{option.flag}</span>
                            <span>{option.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="justify-start space-y-2">
          <label className="felx block justify-start text-sm font-medium text-black">
            Location
          </label>
          <div className="flex flex-col space-y-2">
            <APIProvider
              apiKey={env.VITE_GOOGLE_MAPS_API_KEY}
              libraries={["places"]} // Ensure the 'places' library is loaded
              onLoad={() => console.log("Google Maps API loaded")}>
              <div className="flex flex-col items-center space-y-4">
                {/* Input box to trigger the map modal */}
                <div className="relative w-full">
                  <Input
                    id="pac-input"
                    ref={inputRef} // Reference for the input bar
                    onChange={(ev) => setLocationName(ev.target.value)}
                    type="text"
                    placeholder="Select"
                    className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    /*value={
                      selectedLocation
                        ? `Lat: ${selectedLocation.lat.toFixed(4)}, Lng: ${selectedLocation.lng.toFixed(4)}`
                        : ""
                    }*/
                    value={locationName}
                    onClick={() => setShowMap(true)}
                  />
                </div>

                {/* Map Dialog */}
                {showMap && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="h-5/6 w-11/12 overflow-hidden rounded-lg bg-white shadow-lg">
                      {/* Google Maps container */}
                      <div className="h-5/6 w-full" ref={mapRef}></div>
                      <div className="flex justify-end p-4">
                        {/* Done Button to close map and set location */}
                        <Button
                          className="rounded-lg bg-indigo-500 px-4 py-2 text-white shadow hover:bg-indigo-600"
                          onClick={handleDone} // Update the input bar when "Done" is pressed
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </APIProvider>
          </div>
        </div>
        <div>
          <Button
            type="button"
            disabled={isButtonDisabled}
            onClick={onDone}
            className="mt-2 flex w-full items-center rounded-lg bg-th-blue-300 px-4 py-2 text-white">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
