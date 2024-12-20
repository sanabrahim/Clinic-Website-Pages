import type { UserRole } from "@/routes/_auth.login";
import { SquareUserRound, ContactRound } from "lucide-react";

type WelcomeContainerProps = {
  onChoice: (choice: UserRole) => void;
};

export function WelcomeContainer({ onChoice }: WelcomeContainerProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 mt-14 flex justify-center text-3xl font-bold">Choose To</h1>
      <h1 className="mb-4 flex justify-center text-3xl font-bold">Continue</h1>

      <div className="mb-14 flex flex-col items-center gap-4">
        <button
          onClick={() => onChoice("patient")}
          type="button"
          className="flex h-40 w-40 flex-col items-center justify-center bg-th-blue-200 p-6 hover:bg-blue-200 focus:outline-none">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-th-blue-300 bg-th-blue-50 bg-white">
            <SquareUserRound className="mb-2 h-7 w-7 text-th-blue-300" />
          </div>
          <span className="text-lg font-medium text-th-blue-300">Therapist</span>
        </button>

        <button
          onClick={() => onChoice("patient")}
          type="button"
          className="flex h-40 w-40 flex-col items-center justify-center bg-th-green-200 p-6 hover:bg-green-200 focus:outline-none">
          <div className="bg-thh-green-50 mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-th-green-700 bg-white">
            <ContactRound className="mb-2 h-7 w-7 text-th-green-700" />
          </div>
          <span className="text-lg font-medium text-th-green-700">Patient</span>
        </button>
      </div>
    </div>
  );
}
