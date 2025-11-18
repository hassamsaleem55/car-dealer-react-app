import { formatTime } from "./DateTimeProcessor";

export function getCompanyOpeningHours(
  schedules: {
    ScheduleId: number;
    DayId: number;
    OpeningTime: string;
    ClosingTime: string;
    IsOpen: boolean;
    IsAppointment: boolean;
    BreaksTiming: any[];
  }[]
) {
  const openingHours: { [key: string]: string } = {};

  schedules.forEach((schedule) => {
    const dayName = getDayName(schedule.DayId);
    if (dayName) {
      if (schedule.IsOpen) {
        openingHours[dayName] = `${formatTime(
          schedule.OpeningTime
        )} – ${formatTime(schedule.ClosingTime)}`;
      } else if (schedule.IsAppointment) {
        openingHours[dayName] = "Appointment Only";
      } else {
        openingHours[dayName] = "Closed";
      }
    }
  });

  return openingHours;
}

function getDayName(dayId: number): string | null {
  const dayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return dayNames[dayId - 1] || null;
}
