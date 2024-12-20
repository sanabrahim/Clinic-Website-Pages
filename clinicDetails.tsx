import { Pen, X, User2, Dot } from "lucide-react";
import { Button } from "../shared/Button";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../shared/Select";
type ClinicDetailProps = {
  onBack: () => void;
};
export function ClinicDetails({ onBack }: ClinicDetailProps) {
  const [status, setStatus] = useState("Active");
  return (
    <div className="mx-auto max-w-lg rounded-md bg-white p-6 shadow-md">
      <div className="flex items-center justify-center border-b bg-white px-4 py-2">
        <div className="mr-auto text-lg font-bold text-black">Clinic Details</div>
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
            onClick={onBack}
            className="ml-2 h-8 w-8 rounded-full border-black bg-white text-black">
            <div className="flex items-center justify-center rounded-full bg-white text-black">
              <X className="h-6 w-6" />
            </div>
          </Button>
        </div>
      </div>
      {/* Clinic Information */}
      <div className="mb-4 mt-6 border-b pb-4">
        <div className="mb-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2">
            <User2 className="h-16 w-16 rounded-full bg-gray-200 text-gray-500" />
            <div className="mb-4 flex flex-col items-center space-y-2">
              <label className="block text-sm font-medium text-gray-500">Clinic Name</label>
              <h3 className="text-lg font-medium">Clinic X</h3>
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
        <div className="grid grid-rows-2 gap-4">
          <div className="mb-4 grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div>
              <h5 className="font-medium">Address</h5>
              <h3 className="text-black">Beirut, Lebanon</h3>
            </div>
            <div>
              <h5 className="font-medium">Phone Number</h5>
              <h3 className="text-black">+961 123456</h3>
            </div>
            <div>
              <h5 className="font-medium">Email</h5>
              <h3 className="text-black">ClinicX@gmail.com</h3>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div>
              <h5 className="font-medium">Street</h5>
              <h3 className="text-black">Beirut, Lebanon</h3>
            </div>
            <div>
              <h5 className="font-medium">Building</h5>
              <h3 className="text-black">Beirut, Lebanon</h3>
            </div>
            <div>
              <h5 className="font-medium">Floor</h5>
              <h3 className="text-black">Beirut, Lebanon</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Staff Section */}
      <h5 className="mb-4 mr-auto mt-4 font-semibold text-black">Staff Available</h5>
      <div className="grid grid-cols-3 gap-4">
        {/* Staff Card 1 */}
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Dr. Joe Doe"
            className="mx-auto mb-2 h-16 w-16 rounded-full"
          />
          <h5 className="font-medium">Dr. Joe Doe</h5>
          <p className="text-sm text-gray-500">Therapist</p>
        </div>
        {/* Staff Card 2 */}
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Dr. Joe Smith"
            className="mx-auto mb-2 h-16 w-16 rounded-full"
          />
          <h5 className="font-medium">Dr. Joe Smith</h5>
          <p className="text-sm text-gray-500">Therapist</p>
        </div>
        {/* Staff Card 3 */}
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Dr. Joe Doe"
            className="mx-auto mb-2 h-16 w-16 rounded-full"
          />
          <h5 className="font-medium">Dr. Joe Doe</h5>
          <p className="text-sm text-gray-500">Therapist</p>
        </div>
      </div>
      {/* Add Staff Button */}
      <div className="mt-6 text-center">
        <Button className="rounded-md bg-th-blue-300 px-4 py-2 text-white">Add New Staff</Button>
      </div>
    </div>
  );
}
