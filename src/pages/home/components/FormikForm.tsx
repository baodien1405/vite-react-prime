import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { useFormik } from "formik";
import { AccountFormValues } from "@/model";
import { useAccountSchema } from "@/pages/home/hooks";

export function FormikForm() {
  const schema = useAccountSchema();
  const formik = useFormik<AccountFormValues>({
    initialValues: {
      fullName: "",
      gender: "",
      dateOfBirth: null,
      jobs: [],
      category: "",
      methods: [],
      enable: false,
      description: "",
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4">
      <h1 className="text-2xl text-center mb-4">Formik - Form</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="block mb-1">Fullname</label>
          <InputText
            name="fullName"
            placeholder="fullName"
            className="w-full"
            invalid={!!formik.errors.fullName}
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          {!!formik.errors.fullName && (
            <small className="p-error">{formik.errors.fullName}</small>
          )}
        </div>

        <div className="space-y-1">
          <label className="block mb-1">Gender</label>
          <Dropdown
            name="gender"
            className="w-full"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            optionLabel="label"
            placeholder="gender"
            showClear={true}
            invalid={!!formik.errors.gender}
            value={formik.values.gender}
            onChange={formik.handleChange}
          />
          {!!formik.errors.gender && (
            <small className="p-error">{formik.errors.gender}</small>
          )}
        </div>

        <div className="space-y-1">
          <label className="block mb-1">DateOfBirth</label>
          <Calendar
            name="dateOfBirth"
            className="w-full"
            placeholder="DateOfBirth"
            showIcon
            panelClassName="!z-[9999]"
            invalid={!!formik.errors.dateOfBirth}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
          />
          {!!formik.errors.dateOfBirth && (
            <small className="p-error">{formik.errors.dateOfBirth}</small>
          )}
        </div>

        <div className="space-y-1">
          <label className="block mb-1">Jobs</label>
          <MultiSelect
            name="jobs"
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
            showClear={formik.values.jobs?.length > 0}
            maxSelectedLabels={3}
            filter
            className="w-full"
            invalid={!!formik.errors.jobs}
            value={formik.values.jobs}
            onChange={formik.handleChange}
          />
          {!!formik.errors.jobs && (
            <small className="p-error">{formik.errors.jobs}</small>
          )}
        </div>

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
                name="category"
                value={option.value}
                checked={formik.values.category === option.value}
                invalid={!!formik.errors.category}
                onChange={formik.handleChange}
              />
              <label htmlFor={option.value} className="block ml-2">
                {option.name}
              </label>
            </div>
          ))}
          {!!formik.errors.category && (
            <small className="p-error">{formik.errors.category}</small>
          )}
        </div>

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
                name="methods"
                value={option.value}
                checked={formik.values.methods.includes(option.value)}
                invalid={!!formik.errors.methods}
                onChange={formik.handleChange}
              />
              <label htmlFor={option.value} className="block ml-2">
                {option.name}
              </label>
            </div>
          ))}
          {!!formik.errors.methods && (
            <small className="p-error">{formik.errors.methods}</small>
          )}
        </div>

        <div className="space-y-1">
          <label className="block mb-1">Accept Terms</label>
          <InputSwitch
            name="enable"
            checked={formik.values.enable}
            onChange={formik.handleChange}
            invalid={!!formik.errors.enable}
          />
          {!!formik.errors.enable && (
            <small className="p-error">{formik.errors.enable}</small>
          )}
        </div>

        <div className="space-y-1">
          <label className="block mb-1">Description</label>
          <InputTextarea
            name="description"
            placeholder="Description"
            rows={5}
            cols={30}
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full"
            invalid={!!formik.errors.description}
          />
          {!!formik.errors.description && (
            <small className="p-error">{formik.errors.description}</small>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
}
