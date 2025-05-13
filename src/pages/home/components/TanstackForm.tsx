import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { AccountFormValues } from "@/model";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <small className="p-error">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </small>
      ) : null}
    </>
  );
}

export function TanstackForm() {
  const schema = z.object({
    fullName: z.string().nonempty("Full name is required"),
    gender: z.string().nonempty("Gender is required"),
    dateOfBirth: z
      .date({ required_error: "Date of birth is required" })
      .nullable(),
    jobs: z.array(z.string().nonempty()).min(1, "At least one job is required"),
    category: z.string().nonempty("Category is required"),
    methods: z
      .array(z.string().nonempty())
      .min(1, "At least one method is required"),
    enable: z.boolean(),
    description: z.string().nonempty("Description is required"),
  });

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: null,
      jobs: [],
      category: "",
      methods: [],
      enable: false,
      description: "",
    } as AccountFormValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <h1 className="text-2xl text-center mb-4">Tanstack Form</h1>
      <div className="grid grid-cols-4 gap-4">
        <Field
          name="fullName"
          children={(field) => (
            <div className="space-y-1">
              <label className="block mb-1">Fullname</label>
              <InputText
                placeholder="fullName"
                className="w-full"
                invalid={!!field.state.meta.errors.length}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <Field
          name="gender"
          children={(field) => (
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
                invalid={!!field.state.meta.errors.length}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <Field
          name="dateOfBirth"
          children={(field) => (
            <div className="space-y-1">
              <label className="block mb-1">DateOfBirth</label>
              <Calendar
                className="w-full"
                placeholder="DateOfBirth"
                showIcon
                panelClassName="!z-[9999]"
                invalid={!!field.state.meta.errors.length}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value as Date)}
                onBlur={field.handleBlur}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <Field
          name="jobs"
          children={(field) => (
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
                showClear={field.state.value.length > 0}
                maxSelectedLabels={3}
                filter
                className="w-full"
                invalid={!!field.state.meta.errors.length}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value)}
                onBlur={field.handleBlur}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <Field
          name="category"
          children={(field) => (
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
                    checked={field.state.value === option.value}
                    invalid={!!field.state.meta.errors.length}
                    value={option.value}
                    onChange={(e) => field.handleChange(e.value)}
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor={option.value} className="block ml-2">
                    {option.name}
                  </label>
                </div>
              ))}
              <FieldInfo field={field} />
            </div>
          )}
        />

        <Field
          name="methods"
          children={(field) => (
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
                    checked={(field.state.value ?? []).includes(option.value)}
                    invalid={!!field.state.meta.errors.length}
                    value={option.value}
                    onChange={(e) => {
                      const currentValues = field.state.value ?? [];
                      const value = e.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v) => v !== option.value);
                      field.handleChange(value);
                    }}
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor={option.value} className="block ml-2">
                    {option.name}
                  </label>
                </div>
              ))}
              <FieldInfo field={field} />
            </div>
          )}
        />

        <Field
          name="enable"
          children={(field) => (
            <div className="space-y-1">
              <label className="block mb-1">Accept Terms</label>
              <InputSwitch
                checked={!!field.state.value}
                invalid={!!field.state.meta.errors.length}
                onChange={(e) => field.handleChange(e.value)}
                onBlur={field.handleBlur}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <Field
          name="description"
          children={(field) => (
            <div className="space-y-1">
              <label className="block mb-1">Description</label>
              <InputTextarea
                placeholder="Description"
                rows={5}
                cols={30}
                className="w-full"
                invalid={!!field.state.meta.errors.length}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
      </div>

      <Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="mt-4"
            disabled={!canSubmit}
            loading={isSubmitting}
          >
            Submit
          </Button>
        )}
      />
    </form>
  );
}
