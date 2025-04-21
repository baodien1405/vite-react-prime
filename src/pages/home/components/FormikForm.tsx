import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";

export function FormikForm() {
  const fieldKeys = Array.from({ length: 50 }, (_, i) => `full_name_${i + 1}`);

  const initialValues = fieldKeys.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);

  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl text-center mb-4">Formik - Form</h1>
      <div className="grid grid-cols-4 gap-4">
        {fieldKeys.map((key) => (
          <InputText
            key={key}
            name={key}
            placeholder={key}
            className="w-full"
            value={formik.values[key]}
            onChange={formik.handleChange}
          />
        ))}
      </div>
      <button type="submit" className="mt-6 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
