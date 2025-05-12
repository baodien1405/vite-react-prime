import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { Controller, useForm } from "react-hook-form";

interface AccountFormValues {
  fullName: string;
  gender: string;
  dateOfBirth: Date | null;
  jobs: string[];
  category: string;
  methods: string[];
  enable: boolean;
  description: string;
}

export function RHFForm() {
  const form = useForm<AccountFormValues>({
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: null,
      jobs: [],
      category: "",
      methods: [],
      enable: false,
      description: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit((values) => console.log(values))}>
      <h1 className="text-2xl text-center mb-4">RHF - Form</h1>
      <div className="grid grid-cols-4 gap-4">
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">Fullname</label>
              <InputText
                placeholder="fullName"
                className="w-full"
                invalid={fieldState.invalid}
                {...field}
              />
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="gender"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">Gender</label>
              <Dropdown
                className="w-full"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                optionLabel="label"
                placeholder="gender"
                showClear={true}
                invalid={fieldState.invalid}
                {...field}
              />
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="dateOfBirth"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">DateOfBirth</label>
              <Calendar
                className="w-full"
                placeholder="DateOfBirth"
                showIcon
                panelClassName="!z-[9999]"
                invalid={fieldState.invalid}
                {...field}
              />
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="jobs"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">Jobs</label>
              <MultiSelect
                options={[
                  { label: "Developer", value: "developer" },
                  { label: "Designer", value: "designer" },
                  { label: "Manager", value: "manager" },
                  { label: "Tester", value: "tester" },
                  { label: "DevOps", value: "devops" },
                ]}
                optionLabel="label"
                display="chip"
                placeholder="Jobs"
                showClear={field.value?.length > 0}
                maxSelectedLabels={3}
                filter
                className="w-full"
                invalid={fieldState.invalid}
                {...field}
              />
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">Category</label>
              {[
                { name: "Accounting", value: "A" },
                { name: "Marketing", value: "M" },
                { name: "Production", value: "P" },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <RadioButton
                    inputId={option.value}
                    checked={field.value === option.value}
                    invalid={fieldState.invalid}
                    {...field}
                  />
                  <label htmlFor={option.value} className="block ml-2">
                    {option.name}
                  </label>
                </div>
              ))}
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="methods"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">Methods</label>
              {[
                { name: "GET", value: "get" },
                { name: "POST", value: "post" },
                { name: "PUT", value: "put" },
                { name: "DELETE", value: "delete" },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <Checkbox
                    inputId={option.value}
                    checked={field.value.includes(option.value)}
                    invalid={fieldState.invalid}
                    {...field}
                  />
                  <label htmlFor={option.value} className="block ml-2">
                    {option.name}
                  </label>
                </div>
              ))}
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="enable"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">Accept Terms</label>
              <InputSwitch
                checked={field.value}
                invalid={fieldState.invalid}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="block mb-1">Description</label>
              <InputTextarea
                name="description"
                placeholder="Description"
                rows={5}
                cols={30}
                className="w-full"
                invalid={fieldState.invalid}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              {!!fieldState.error?.message && (
                <small className="p-error">{fieldState.error?.message}</small>
              )}
            </div>
          )}
        />
      </div>
      <button type="submit" className="mt-6 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
