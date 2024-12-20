import React, { useState } from "react";
import { Button } from "../shared/Button";
import { Pen, X, Dot, User2 } from "lucide-react";
import { Input } from "../shared/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../shared/Select";

interface EditClinicProps {
  onDone: () => void;
}

export function EditClinicForm({ onDone }: EditClinicProps) {
  const [clinicInfo, setClinicInfo] = useState({
    name: "Clinic X",
    city: "Beirut, Lebanon",
    phoneNumber: "+961 123456",
    email: "ClinicX@gmail.com",
    street: "Beirut, Lebanon",
    building: "Beirut, Lebanon",
    floor: "Beirut, Lebanon",
  });
  const [status, setStatus] = useState("Active");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClinicInfo({
      ...clinicInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-xl rounded-md bg-white p-6 shadow-md">
      <div className="flex items-center justify-center border-b bg-white px-4 py-2">
        <div className="mr-auto text-lg font-bold text-black">Edit Clinic Details</div>

        <div className="flex items-center">
          <div className="border-r">
            <Button className="mr-2 h-8 w-8 rounded-full bg-th-blue-300 text-black">
              <div className="flex items-center justify-center rounded-full bg-th-blue-300 text-white">
                <Pen className="h-6 w-6" />
              </div>
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={onDone}
            className="ml-2 h-8 w-8 rounded-full border-black bg-white text-black">
            <div className="flex items-center justify-center rounded-full bg-white text-black">
              <X className="h-6 w-6" />
            </div>
          </Button>
        </div>
      </div>
      <div className="mb-4 mt-6 border-b pb-4">
        <div className="mb-4 flex items-center justify-between gap-4 border-b">
          <div className="flex items-center space-x-2">
            <User2 className="h-16 w-16 rounded-full bg-gray-200 text-gray-500" />
            <div className="mb-4 inline-block flex-col flex-wrap space-y-2">
              <label className="block items-start justify-start text-sm text-black">
                Clinic Name
              </label>
              <Input
                className="focus:shadow-outline mr-8 w-36 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="name"
                type="text"
                placeholder="Enter Clinic Name"
                name="name"
                value={clinicInfo.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="right flex justify-end">
            <label className="text-sm text-gray-500">Change status: </label>
            <div className="relative w-auto">
              <div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="ml-3 w-28 items-center justify-center">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Conditionally rendered dot */}
              <div className="pointer-events-none absolute top-1/2 ml-3 flex -translate-y-1/2 transform items-center">
                <Dot
                  className={`h-8 w-8 ${status === "Active" ? "text-blue-500" : "text-black"}`}
                />
              </div>
            </div>
          </div>
        </div>
        <h5 className="mb-4 mr-auto text-lg font-semibold text-black">General Information</h5>
        <div className="grid grid-rows-2 gap-4 border-b">
          <div className="mb-4 grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div>
              <h5 className="text-black">City</h5>
              <Input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="city"
                type="text"
                placeholder="Enter City"
                name="city"
                value={clinicInfo.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <h5 className="text-black">Phone Number</h5>
              <Input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="phoneNumber"
                type="text"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={clinicInfo.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <h5 className="text-black">Email</h5>
              <Input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={clinicInfo.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div>
              <h5 className="text-black">Street</h5>
              <Input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="street"
                type="street"
                placeholder="Enter Street"
                name="street"
                value={clinicInfo.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <h5 className="text-black">Building</h5>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="building"
                type="building"
                placeholder="Enter Building"
                name="building"
                value={clinicInfo.building}
                onChange={handleChange}
              />
            </div>
            <div>
              <h5 className="text-black">Floor</h5>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="floor"
                type="floor"
                placeholder="Enter Floor"
                name="floor"
                value={clinicInfo.floor}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Repeat the input fields for street, building, and floor */}
        <h5 className="mb-4 mr-auto mt-4 font-semibold text-black">Staff Available</h5>
        <div className="grid grid-cols-3 gap-4">
          {/* Staff Card 1 */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Dr. Joe Doe"
              className="mx-auto mb-2 h-16 w-16 rounded-full"
            />
            <h5 className="">Dr. Joe Doe</h5>
            <p className="text-sm text-gray-500">Therapist</p>
          </div>

          {/* Staff Card 2 */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Dr. Joe Smith"
              className="mx-auto mb-2 h-16 w-16 rounded-full"
            />
            <h5 className="">Dr. Joe Smith</h5>
            <p className="text-sm text-gray-500">Therapist</p>
          </div>

          {/* Staff Card 3 */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Dr. Joe Doe"
              className="mx-auto mb-2 h-16 w-16 rounded-full"
            />
            <h5 className="">Dr. Joe Doe</h5>
            <p className="text-sm text-gray-500">Therapist</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button className="w-full rounded-md bg-th-blue-300 px-4 py-2 text-white">
            Add New Staff
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={onDone}
            className="w-full rounded-md bg-th-blue-300 px-4 py-2 text-white">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
