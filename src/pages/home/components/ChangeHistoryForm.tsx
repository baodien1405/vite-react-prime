import { UploadField } from "@/components";
import { useFormik } from "formik";

export function ChangeHistoryForm() {
  const formik = useFormik<any>({
    initialValues: {
      reconcile: null,
    },
    onSubmit: (value) => {},
  });

  return (
    <div>
      <UploadField
        name="reconcile"
        value={formik.values.reconcile}
        onChange={(value) => formik.setFieldValue("reconcile", value)}
      />
    </div>
  );
}
