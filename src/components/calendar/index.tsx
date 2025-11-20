import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDealerContext } from "@core-dir/dealer-provider";
import { fetchApi } from "@core-dir/services/Api.service";

export default function CalendarOne({
  TODAY,
  setScheduleDayId,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  TODAY: moment.Moment;
  setScheduleDayId: (id: number | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}) {
  const { dealerAuthToken } = useDealerContext();
  const [viewYear, setViewYear] = useState(TODAY.year());
  const [viewMonth, setViewMonth] = useState(TODAY.month());
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const minMonth = TODAY.month();
  const minYear = TODAY.year();
  const maxDate = TODAY.clone().add(13, "days"); // next 2 weeks
  const maxMonth = maxDate.month();
  const maxYear = maxDate.year();

  const monthNames = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
  const dayNamesShort = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const totalDays = daysInMonth(viewYear, viewMonth);

    const cells: Array<{
      type: "empty" | "current" | "next-preview";
      day?: number;
      date?: Date;
    }> = [];

    for (let i = 0; i < firstDayIndex; i++) cells.push({ type: "empty" });
    for (let d = 1; d <= totalDays; d++)
      cells.push({
        type: "current",
        day: d,
        date: new Date(viewYear, viewMonth, d),
      });
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++)
      cells.push({ type: "next-preview", day: i });

    return cells;
  }, [viewMonth, viewYear]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  function handleSelectDay(date: Date) {
    const dateStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const todayStart = new Date(TODAY.year(), TODAY.month(), TODAY.date());
    if (dateStart < todayStart) return;
    setSelectedDate(date);
    setSelectedTime(null);
  }

  const canGoPrev =
    viewYear > minYear || (viewYear === minYear && viewMonth > minMonth);
  const canGoNext =
    viewYear < maxYear || (viewYear === maxYear && viewMonth < maxMonth);

  function goPrevMonth() {
    if (!canGoPrev) return;
    setViewMonth((m) => {
      let newMonth = m - 1;
      let newYear = viewYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear = viewYear - 1;
      }
      setViewYear(newYear);
      return newMonth;
    });
  }

  function goNextMonth() {
    if (!canGoNext) return;
    setViewMonth((m) => {
      let newMonth = m + 1;
      let newYear = viewYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear = viewYear + 1;
      }
      setViewYear(newYear);
      return newMonth;
    });
  }

  const isSelectable = (date: Date) => {
    const todayStart = new Date(TODAY.year(), TODAY.month(), TODAY.date());
    const maxSelectable = new Date(todayStart);
    maxSelectable.setDate(maxSelectable.getDate() + 13);

    const dayIndex = date.getDay();
    const scheduleForDay: any = timeSlots?.find(
      (item: any) => item.dayOfWeek === dayIndex
    );

    return (
      date >= todayStart &&
      date <= maxSelectable &&
      scheduleForDay?.slots?.length > 0
    );
  };

  function goToToday() {
    setViewYear(TODAY.year());
    setViewMonth(TODAY.month());
    setSelectedDate(TODAY.toDate());
    setSelectedTime(null);
  }

  function formatTo12Hour(time: string) {
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoadingSlots(true);
      const response = await fetchApi(
        "/api/companies/schedule",
        dealerAuthToken
      );

      // Filter slots based on UK current time
      const filteredTimeSlots = response.schedule
        .map((item: any) => {
          const dayIndex = item.dayOfWeek;
          const dayDiff = dayIndex - TODAY.day();
          const slotDate = TODAY.clone().add(dayDiff, "days").startOf("day");

          const slots = item.slots.filter((slot: any) => {
            const [h, m] = slot.startTime.split(":");
            const slotDateTime = slotDate.clone().hour(+h).minute(+m);

            // Only filter past slots for today
            if (slotDateTime.isSame(TODAY, "day")) {
              return slotDateTime.isAfter(TODAY);
            }
            return true;
          });

          return { ...item, slots };
        })
        .filter((item: any) => item.slots.length > 0);

      setTimeSlots(filteredTimeSlots);
      setLoadingSlots(false);
    };

    fetchData();
  }, [dealerAuthToken, TODAY]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 pt-4 pl-4">
      {/* Calendar Section */}
      <div className="flex-1">
        <div className="flex mb-6 justify-between items-center">
          <div className="flex justify-between items-center w-full max-w-xs space-x-2">
            <button
              type="button"
              onClick={goPrevMonth}
              disabled={!canGoPrev}
              className={`text-gray-500 p-1 ${
                !canGoPrev
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:text-gray-800"
              }`}
            >
              <ChevronLeft />
            </button>
            <h3 className="text-gray-800 text-lg sm:text-xl font-medium">
              {monthNames[viewMonth]} {viewYear}
            </h3>
            <button
              type="button"
              onClick={goNextMonth}
              disabled={!canGoNext}
              className={`text-gray-500 p-1 ${
                !canGoNext
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:text-gray-800"
              }`}
            >
              <ChevronRight />
            </button>
          </div>
          <button
            type="button"
            onClick={goToToday}
            className="cursor-pointer text-xs sm:text-sm px-3 py-1 text-primary border border-gray-200 rounded-lg hover:bg-primary/50 hover:text-black transition-all duration-300 ease-in-out"
          >
            Today
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4 text-center">
          {dayNamesShort.map((d) => (
            <div key={d} className="text-[10px] sm:text-xs py-1 font-medium">
              {d.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((cell, idx) => {
            if (cell.type !== "current")
              return <div key={idx} className="h-10 sm:h-[59px]" />;

            const date = cell.date!;
            const isToday = isSameDay(date, TODAY.toDate());
            const selectable = isSelectable(date);
            const isSelected = selectedDate && isSameDay(date, selectedDate);

            let classes =
              "h-10 sm:h-[48px] flex items-center justify-center rounded-md relative text-xs font-medium ";
            if (!selectable) classes += "bg-gray-50 cursor-not-allowed";
            else if (isSelected) classes += "bg-primary/50";
            else
              classes +=
                "border border-gray-200 hover:border-primary/80 cursor-pointer";

            return (
              <div
                key={idx}
                className={classes}
                onClick={() => selectable && handleSelectDay(date)}
              >
                {cell.day}
                {isToday && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-primary" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="w-full lg:w-56 rounded-t-xl p-4 border border-b-0 border-gray-200">
        <div className="mb-2">
          <h4 className="text-lg font-medium">Time Slots For</h4>
          {selectedDate ? (
            <p className="text-primary font-medium">
              {selectedDate.toDateString()}
            </p>
          ) : (
            <p className="text-gray-500">Select a date</p>
          )}
        </div>

        {loadingSlots ? (
          <p className="text-gray-500 text-sm">Loading time slots...</p>
        ) : (
          (() => {
            const dayIndex = selectedDate?.getDay();
            const scheduleForDay: any = timeSlots?.find(
              (item: any) => item.dayOfWeek === dayIndex
            );

            if (!scheduleForDay?.slots?.length) {
              return (
                <p className="text-gray-500 text-sm">
                  No time slots available for this day.
                </p>
              );
            }

            return (
              <div className="grid grid-cols-1 gap-2">
                {scheduleForDay.slots.map((slot: any) => {
                  const formatted = `${formatTo12Hour(
                    slot.startTime.substring(0, 5)
                  )} - ${formatTo12Hour(slot.endTime.substring(0, 5))}`;
                  const isSelected = selectedTime === formatted;

                  return (
                    <div
                      key={slot.scheduleDayId}
                      onClick={() => {
                        setSelectedTime(formatted);
                        setScheduleDayId(slot.scheduleDayId);
                      }}
                      className={`group flex items-center justify-center rounded-lg px-3 py-2 cursor-pointer ${
                        isSelected
                          ? "bg-primary/50"
                          : "border border-gray-200 hover:border-primary/80"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-3 ${
                            isSelected
                              ? "bg-primary"
                              : "bg-gray-300 group-hover:bg-primary/60"
                          }`}
                        />
                        <span className="text-xs sm:text-sm">{formatted}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
