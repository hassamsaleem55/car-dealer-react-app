export default function AppointmentForm({
  requestType,
  appointmentForm,
  setAppointmentForm,
}: {
  requestType: "" | "Appointment" | "testdrive" | "vehicledetails";
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
    "border border-gray-300 p-2 text-sm rounded placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary/70";
  return (
    <div className="space-y-2 rounded-xl p-4 md:rounded-none md:p-0 shadow-2xl md:shadow-none">
      {requestType !== "vehicledetails" && (
        <div className="font-medium">
          <h2 className="text-xl">Ready to See This Vehicle in Person?</h2>
          <p className="text-sm text-basicFont">
            Fill out the form below to schedule your{" "}
            {requestType === "testdrive" ? "test drive" : "appointment"}.
          </p>
        </div>
      )}
      <div className="space-y-4">
        {appointmentForm.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-1 text-xs" htmlFor={field.name}>
              {field.label} {field.required && "*"}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                rows={5}
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
