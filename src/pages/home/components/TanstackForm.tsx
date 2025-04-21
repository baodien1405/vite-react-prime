import { useForm } from "@tanstack/react-form";
import { InputText } from "primereact/inputtext";

export function TanstackForm() {
  console.log("TanstackForm render");
  const fieldKeys = Array.from({ length: 50 }, (_, i) => `full_name_${i + 1}`);

  const initialValues = fieldKeys.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h1 className="text-2xl text-center mb-4">TanstackForm - Form</h1>
      <div className="grid grid-cols-4 gap-4">
        {fieldKeys.map((key) => (
          <div key={key}>
            <form.Field
              name={key}
              children={(field) => (
                <>
                  <InputText
                    name={field.name}
                    placeholder={key}
                    className="w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>
        ))}
      </div>
      <button type="submit" className="mt-6 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
