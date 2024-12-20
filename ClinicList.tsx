import { DashboardCard } from "../dashboard/DashboardCard";
import { Button } from "../shared/Button";
import {
  CalendarDays,
  ChevronRight,
  Bell,
  Settings,
  UserRound,
  CircleHelp,
  ChevronDown,
  Pen,
} from "lucide-react";
import { $api } from "@/api";
import { useProfile } from "@/hooks/useProfile";
import { LatLngSchema } from "./typeList";

interface ClinicListProps {
  onAddClinic: () => void;
  onViewDetails: () => void;
  onNotification: () => void;
  onEdit: () => void;
}
import { z } from "zod";

export type LatLngType = z.infer<typeof LatLngSchema>;

export const EmptyLatLngSchema = z.object({
  latitude: z.null(),
  longitude: z.null(),
});

export const AddressSchema = z
  .object({
    floor: z.string(),
    building: z.string(),
    street: z.string(),
    city: z.string(),
  })
  .partial();

export type AddressType = z.infer<typeof AddressSchema>;

type Clinic = {
  clinic_id: number;
  name: string;
  contact_number: string | null;
  email: string | null;
  photo_path: string | null;
};

export function ClinicList({
  onAddClinic,
  onViewDetails,
  onNotification,
  onEdit,
}: ClinicListProps) {
  const { getCurrentProfile } = useProfile();
  const profile = getCurrentProfile();
  const therapistID = profile?.role === "therapist" ? profile.profileData.therapist_id : undefined;
  const { data: clinics, error } = $api.therapist.useGetOwnClinicProfiles(therapistID);

  if (error) {
    console.error("API error:", error);
  }

  return (
    <div>
      <div className="bg-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex h-12 w-12 items-center space-x-2">
            <img src="/icon.png" alt="MedMate logo" />
            <div className="font-serif text-lg text-th-blue-300">MedMate</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Bell onClick={onNotification} className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Settings className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <CircleHelp className="h-8 w-8 rounded-full border border-gray-300" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <UserRound className="border-grau-300 h-6 w-6 rounded-full border" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ChevronDown className="h-6 w-6 rounded-full border border-gray-300" />
            </Button>
          </div>
        </div>
        <div className="mb-4 flex justify-center gap-4">
          <DashboardCard variant="my-calendar" />
          <DashboardCard variant="my-clinics" />
          <DashboardCard variant="my-patients" />
          <DashboardCard variant="financial-report" />
        </div>
        <br />
      </div>
      <div className="mt-5 flex">
        <div className="w-7/12 space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={onAddClinic}
              className="rounded-lg border border-th-blue-300 bg-white px-4 py-2 text-th-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Add New Clinic
            </Button>
          </div>
          <table className="w-full table-auto border-collapse bg-white text-center">
            <thead className="w-full border-collapse bg-white text-center">
              <tr className="mb-4 w-full">
                <th className="mb-4 px-4 py-2">Clinic no.</th>
                <th className="mb-4 px-4 py-2">Clinic Name</th>
                <th className="mb-4 px-4 py-2">Phone Number</th>
                <th className="mb-4 px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {clinics?.map((clinic: Clinic) => (
                <tr key={clinic.clinic_id}>
                  <td className="border px-4 py-2">{clinic.clinic_id}</td>
                  <td className="border px-4 py-2">{clinic.name}</td>
                  <td className="border px-4 py-2">{clinic.contact_number || "N/A"}</td>
                  <td className="border px-4 py-2">
                    <div className="ml-5 flex items-center justify-between space-x-1">
                      {clinic.email || "N/A"}
                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          className="ml-4 rounded-full bg-gray-400 p-2 text-white hover:bg-gray-300 focus:outline-none">
                          <CalendarDays size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          className="rounded-full bg-gray-400 p-2 text-white hover:bg-gray-200 focus:outline-none">
                          <Pen onClick={onEdit} size={16} />
                        </Button>
                        <Button className="rounded-full bg-gray-400 p-2 text-white hover:bg-gray-200 focus:outline-none">
                          <ChevronRight onClick={onViewDetails} size={16} />
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
