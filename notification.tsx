import { CalendarX2, CalendarClock, CalendarCheck2 } from "lucide-react";
import { DashboardCard } from "../dashboard/DashboardCard";
import { Bell, Settings, CircleHelp, UserRound, ChevronDown } from "lucide-react";
import { Button } from "../shared/Button";

const notifications = [
  {
    type: "Pending Appointment",
    description: "You have new patient waiting for appointment confirmation.",
    time: "1h",
    action: "Confirm/Decline",
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
        <CalendarCheck2 className="text-yellow-500" />
      </div>
    ),
    actionStyle:
      "flex bg-th-blue-300 hover:bg-blue-500 justify-start text-white px-4 hover py-1 rounded-lg",
  },
  {
    type: "Appointment Success",
    description: "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "1h",
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-th-green-100">
        <CalendarCheck2 className="text-th-green-500" />
      </div>
    ),
  },
  {
    type: "Appointment Cancelled",
    description: "You have a cancelled appointment with Jane Doe.",
    time: "2h",
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <CalendarX2 className="text-red-500" />
      </div>
    ),
  },
  {
    type: "Scheduled Changed",
    description: "You have new appointment changes with Joe Doe.",
    time: "8h",
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-th-blue-100">
        <CalendarClock className="text-th-blue-300" />
      </div>
    ),
  },
];
const earlierNotifications = [
  {
    type: "Appointment Success",
    description: "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "1 day ago",
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-th-green-100">
        <CalendarCheck2 className="text-th-green-500" />
      </div>
    ),
  },
  {
    type: "Appointment Cancelled",
    description: "You have a cancelled appointment with Jane Doe.",
    time: "1 day ago",
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <CalendarX2 className="text-red-500" />
      </div>
    ),
  },
  {
    type: "Scheduled Changed",
    description: "You have new appointment changes with Joe Doe.",
    time: "1 day ago",
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-th-blue-100">
        <CalendarClock className="text-th-blue-300" />
      </div>
    ),
  },
];

type NotificationDashboardProps = {
  onBack: () => void;
};

export function NotificationDashboard({ onBack }: NotificationDashboardProps) {
  return (
    <div>
      <div className="mb-4 bg-gray-200">
        <div className="mb-4 ml-28 flex items-center justify-between px-4 py-2">
          <div className="flex h-12 w-12 items-center space-x-2">
            <img src="/icon.png" />
            <div className="font-serif text-lg text-th-blue-300">MedMate</div>
          </div>
          <div className="mr-28 flex items-center space-x-10">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Settings className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <CircleHelp className="h-8 w-8 rounded-full border" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <UserRound className="h-6 w-6 rounded-full border" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ChevronDown onClick={onBack} className="h-6 w-6 rounded-full border" />
            </Button>
          </div>
        </div>
        <div className="mb-6 ml-28 mr-28 flex justify-center gap-11">
          <DashboardCard variant="my-calendar" />
          <DashboardCard variant="my-clinics" />
          <DashboardCard variant="my-patients" />
          <DashboardCard variant="financial-report" />
        </div>
        <h2 className="mb-2 ml-28 text-2xl font-bold">Notifications</h2>
        <br />
      </div>

      <div className="ml-20 mr-20 rounded-lg bg-white p-5">
        <div>
          <h4 className="mb-8 ml-4 text-lg font-semibold text-black">New</h4>
          {notifications.map((notification, index) => (
            <Button
              key={index}
              className="flex h-auto w-full items-center justify-between border-b p-4 text-left last:border-none"
              variant="ghost"
              onClick={() => alert(`You clicked on ${notification.type}`)} // Replace with actual logic
            >
              <div className="flex items-center">
                <div className="mr-4">{notification.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{notification.type}</h3>
                  <p className="mb-2 text-gray-600">{notification.description}</p>

                  {notification.action && (
                    <Button className={notification.actionStyle} size="sm">
                      {notification.action}
                    </Button>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500">{notification.time}</p>
              </div>
            </Button>
          ))}
        </div>
        <div className="mt-6">
          <h4 className="mb-8 ml-4 text-lg font-semibold text-black">Earlier</h4>
          {earlierNotifications.map((notification, index) => (
            <Button
              key={index}
              className="flex h-auto w-full items-center justify-between border-b p-4 text-left last:border-none"
              variant="ghost"
              onClick={() => alert(`You clicked on ${notification.type}`)} // Replace with actual logic
            >
              <div className="flex items-center">
                <div className="mr-4">{notification.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{notification.type}</h3>
                  <p className="text-gray-600">{notification.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500">{notification.time}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationDashboard;
