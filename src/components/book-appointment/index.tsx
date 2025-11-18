import CalendarOne from "@components-dir/calendar";

export function Step1({
  selectedTime,
  setSelectedTime,
}: {
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}) {
  return (
    <CalendarOne
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
    />
  );
}

export function Step2({
  appointmentForm,
  setAppointmentForm,
}: {
  appointmentForm: {
    name: string;
    type: string;
    label: string;
    required: boolean;
    value: string;
  }[];
  setAppointmentForm: (
    form: {
      name: string;
      type: string;
      label: string;
      required: boolean;
      value: string;
    }[]
  ) => void;
}) {
  const inputFieldsClasses =
    "bg-gray-50 border border-gray-200 p-2 rounded placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary/70";
  return (
    <div className="space-y-2">
      <div className="font-medium">
        <h2 className="text-xl">Ready to See This Vehicle in Person?</h2>
        <p className="text-sm text-basicFont">
          Fill out the form below to schedule your appointment.
        </p>
      </div>
      <div className="space-y-4">
        {appointmentForm.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-1" htmlFor={field.name}>
              {field.label} {field.required && "*"}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                required={field.required}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                value={field.value}
                onChange={(e) => {
                  const updatedForm = [...appointmentForm];
                  updatedForm[index].value = e.target.value;
                  setAppointmentForm(updatedForm);
                }}
                className={inputFieldsClasses}
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                required={field.required}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                value={field.value}
                onChange={(e) => {
                  const updatedForm = [...appointmentForm];
                  updatedForm[index].value = e.target.value;
                  setAppointmentForm(updatedForm);
                }}
                className={inputFieldsClasses}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Step3() {
  return <div className="p-6">Step 3 content goes here</div>;
}
