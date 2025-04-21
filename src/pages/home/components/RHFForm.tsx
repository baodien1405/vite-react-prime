import { Form, FormControl, FormField, FormItem } from "@/components/form";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";

export function RHFForm() {
  console.log("RHFForm render");
  const fieldKeys = Array.from({ length: 50 }, (_, i) => `full_name_${i + 1}`);

  const initialValues = fieldKeys.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);

  const form = useForm({
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <h1 className="text-2xl text-center mb-4">RHF - Form</h1>
      <form onSubmit={form.handleSubmit((values) => console.log(values))}>
        <div className="grid grid-cols-4 gap-4">
          {fieldKeys.map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputText
                      key={key}
                      placeholder={key}
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
