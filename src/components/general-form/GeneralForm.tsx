import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import z from "zod";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";

import {
  AutoCompleteField,
  CheckboxGroupField,
  DatePickerField,
  DropdownField,
  InputNumberField,
  InputSwitchField,
  InputTextField,
  InputTextareaField,
  PasswordField,
  RadioGroupField,
} from "@/components";
import { useState } from "react";

interface Option {
  name: string;
  code: string;
}

interface GeneralPayload {
  fullName: string;
  email: string;
  password: string;
  amount: number;
  city: Option;
  description: string;
  country: string;
  categories: string[];
  gender: "male" | "gender";
  fromDate: Date;
  tradingOnline: boolean;
}

export function GeneralForm() {
  const schema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string(),
    amount: z.number(),
    description: z.string(),
    country: z.string(),
    categories: z.array(z.string()),
    gender: z.enum(["male", "female"]),
    city: z
      .object({
        name: z.string(),
        code: z.string(),
      })
      .nullable(),
    fromDate: z.date(),
    tradingOnline: z.boolean(),
  });

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const categoryOptions = [
    { label: "Accounting", value: "A" },
    { label: "Marketing", value: "M" },
    { label: "Production", value: "P" },
    { label: "Research", value: "R" },
  ];

  const [countries, setCountries] = useState<string[]>([]);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<GeneralPayload>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      description: "",
      country: "",
      categories: [],
      amount: 0,
      city: undefined,
      fromDate: new Date(),
      tradingOnline: false,
    },
    resolver: zodResolver(schema),
  });

  const handleGeneralSubmit = (formValues: GeneralPayload) => {
    console.log("🚀 ~ handleGeneralSubmit ~ formValues:", formValues);
  };

  const handleSearchCountry = (event: AutoCompleteCompleteEvent) => {
    setCountries([...Array(10).keys()].map((item) => event.query + "-" + item));
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleGeneralSubmit)}
      className="p-5"
    >
      <InputTextField
        name="fullName"
        control={control}
        label="Full Name"
        placeholder="Full Name"
        rootClassName="mb-2"
      />

      <InputTextField
        name="email"
        control={control}
        label="Email"
        placeholder="Email"
        rootClassName="mb-2"
      />

      <PasswordField
        name="password"
        control={control}
        label="Password"
        placeholder="Enter password"
        rootClassName="mb-2"
      />

      <InputNumberField
        name="amount"
        control={control}
        label="Amount"
        placeholder="$100"
        rootClassName="mb-2"
      />

      <InputTextareaField
        name="description"
        control={control}
        label="Description"
        placeholder="Description"
        rootClassName="mb-2"
        rows={5}
        cols={30}
      />

      <DropdownField
        name="city"
        label="City"
        placeholder="Select a city"
        control={control}
        options={cities}
        optionLabel="name"
        rootClassName="mb-2"
        highlightOnSelect={false}
        showClear
      />

      <RadioGroupField
        name="gender"
        label="Gender"
        control={control}
        options={genderOptions}
        rootClassName="mb-2"
      />

      <CheckboxGroupField
        name="categories"
        label="Category"
        control={control}
        options={categoryOptions}
        rootClassName="mb-2"
        direction="vertical"
      />

      <AutoCompleteField
        name="country"
        label="Country"
        placeholder="Search country"
        control={control}
        suggestions={countries}
        completeMethod={handleSearchCountry}
        rootClassName="mb-2"
      />

      <DatePickerField
        name="fromDate"
        control={control}
        label="From Date"
        placeholder="MM-DD-YYYY"
        rootClassName="mb-2"
      />

      <InputSwitchField
        name="tradingOnline"
        control={control}
        label="Trading Online"
        rootClassName="mb-5"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        label="Submit"
        className="w-full"
      />
    </form>
  );
}
