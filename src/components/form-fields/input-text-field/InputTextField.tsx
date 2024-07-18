import { InputText, InputTextProps } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export type InputTextFieldProps<T extends FieldValues> = InputTextProps & {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
  inputClassName?: string;
  rootClassName?: string;
};

export function InputTextField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  label,
  disabled,
  rootClassName,
  inputClassName,
  ...rest
}: InputTextFieldProps<T>) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={rootClassName}>
      {label && (
        <label className="mb-[10px] block w-fit text-[14px] leading-4 font-medium text-[#1F1F1F]">
          {label}
        </label>
      )}

      <InputText
        className={classNames(
          "w-full h-12 rounded-lg focus:shadow-none",
          inputClassName
        )}
        name={name}
        disabled={disabled}
        invalid={invalid}
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />

      {error?.message && (
        <p className="my-2 text-start text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
}
