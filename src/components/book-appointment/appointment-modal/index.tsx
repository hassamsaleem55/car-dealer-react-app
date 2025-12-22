import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment-timezone";
import { toast } from "sonner";
import { useDealerContext } from "@core-dir/dealer-provider";
import { postApi } from "@core-dir/services/Api.service";
import ModalWithSteps from "../../modals/modal-with-steps";
import AppointmentLayout from "../appointment-layout";
import CalendarOne from "@components-dir/calendar";
import AppointmentForm from "../appointment-form";
import AppointmentConfirmation from "../appointment-confirmation";
import type { Car } from "@components-dir/car-card/car-card.types";

export default function AppointmentModal({
  isOpen,
  setIsOpen,
  carData,
  requestType,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  carData: Car;
  requestType: "" | "Appointment" | "testdrive" | "vehicledetails";
}) {
  const location = useLocation();
  const TODAY = useMemo(() => moment.tz("Europe/London"), []);
  const { dealerAuthToken } = useDealerContext();
  const [scheduleDayId, setScheduleDayId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(TODAY.toDate());
  const searchParams = location.search.startsWith("?")
    ? location.search.substring(1)
    : location.search;
  const stockId = searchParams.split("=")[1];
  const [appointmentForm, setAppointmentForm] = useState([
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      value: "",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      value: "",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone",
      required: true,
      value: "",
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      required: true,
      value: "",
    },
  ]);

  const calendarValidator = (): boolean => {
    if (!selectedDate) {
      toast.error("Please select a date for your appointment.");
      return false;
    }
    if (!scheduleDayId) {
      toast.error("Please select a time before proceeding.");
      return false;
    }
    return true;
  };

  const formValidator = (): boolean => {
    const emptyField = appointmentForm.find(
      (field) => field.required && !field.value.trim()
    );
    if (emptyField) {
      toast.error(`Please fill out the ${emptyField.label} field.`);
      return false;
    }

    // Validate email
    const emailField = appointmentForm.find((f) => f.name === "email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && !emailRegex.test(emailField.value)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Validate UK phone number
    const phoneField = appointmentForm.find((f) => f.name === "phone");
    // UK phone regex: +44 or 0 followed by 9–10 digits
    const ukPhoneRegex =
      /^(?:\+?44\s?\d{10}|0044\s?\d{10}|07\d{9}|01\d{9}|02\d{9})$/;
    if (
      phoneField &&
      !ukPhoneRegex.test(phoneField.value.replace(/\s+/g, ""))
    ) {
      toast.error("Please enter a valid UK phone number.");
      return false;
    }

    return true;
  };

  const formSubmit = async (): Promise<boolean> => {
    // Prepare payload according to Postman structure
    const body = {
      FullName: appointmentForm.find((f) => f.name === "name")?.value || "",
      EmailAddress:
        appointmentForm.find((f) => f.name === "email")?.value || "",
      PhoneNumber: appointmentForm.find((f) => f.name === "phone")?.value || "",
      Subject:
        requestType === "testdrive"
          ? "Test Drive Request"
          : requestType === "vehicledetails"
          ? "Vehicle Details Request"
          : "Appointment Request",
      Comments: appointmentForm.find((f) => f.name === "message")?.value || "",
      StockId: Number(stockId), // Replace with dynamic stock ID if needed
      RequestType: requestType,
      ScheduleDayId: scheduleDayId, // Replace with selected schedule day ID
      ScheduleDate: selectedDate || "", // Use selected date/time
    };

    const response = await postApi("/companies/support", body, dealerAuthToken);

    if (!response) {
      toast.error("Something went wrong. Please try again later.");
      return false;
    } else if (!response?.isSuccess) {
      toast.error(response.message || "Failed to submit appointment request.");
      return false;
    }

    if (requestType === "vehicledetails") {
      toast.success("Your vehicle details request has been submitted.");
      setIsOpen(false);
    }
    return true;
  };

  const allSteps = [
    {
      content: (
        <AppointmentLayout requestType={requestType} carData={carData}>
          <div className="pt-4 pl-4">
            <CalendarOne
              TODAY={TODAY}
              setScheduleDayId={setScheduleDayId}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>
        </AppointmentLayout>
      ),
      validate: calendarValidator,
    },
    {
      content: (
        <AppointmentLayout requestType={requestType} carData={carData}>
          <AppointmentForm
            requestType={requestType}
            appointmentForm={appointmentForm}
            setAppointmentForm={setAppointmentForm}
          />
        </AppointmentLayout>
      ),
      validate: formValidator,
      submitMethod: formSubmit,
    },
    {
      content: (
        <AppointmentLayout requestType={requestType} carData={carData}>
          <AppointmentConfirmation
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </AppointmentLayout>
      ),
    },
  ];

  const steps =
    requestType === "vehicledetails"
      ? allSteps.slice(1, 2) // only keep AppointmentForm step
      : allSteps;

  return (
    <ModalWithSteps
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalHeading={
        requestType === "testdrive"
          ? "Schedule Test Drive"
          : requestType === "vehicledetails"
          ? "Request More Info"
          : "Set Appointment"
      }
      steps={steps}
    />
  );
}
