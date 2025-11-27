export default function PersonalInfoForm({
  personalInfoForm,
  setPersonalInfoForm,
}: {
  personalInfoForm: {
    name: string;
    type: string;
    label: string;
    required: boolean;
    value: string;
  }[];
  setPersonalInfoForm: (
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
    "border border-gray-300 p-3 text-sm rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
        <p className="text-sm text-gray-600">
          Please provide your contact details to reserve this vehicle for £99.
        </p>
      </div>

      <div className="space-y-4">
        {personalInfoForm.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700" htmlFor={field.name}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={field.name}
              type={field.type}
              required={field.required}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              value={field.value}
              onChange={(e) => {
                const updatedForm = [...personalInfoForm];
                updatedForm[index].value = e.target.value;
                setPersonalInfoForm(updatedForm);
              }}
              className={inputFieldsClasses}
            />
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Reservation Details:</strong> Your £99 reservation fee will secure this vehicle for 48 hours. 
              This amount will be deducted from the final purchase price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}