import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

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
import { useGeneralSchema } from "@/hooks";
import { CITY_OPTION_LIST, GENDER_OPTION_LIST } from "@/constants";

interface GeneralPayload {
  fullName: string;
  email: string;
  password: string;
  amount: number;
  city: string;
  description: string;
  country: string;
  categories: string[];
  gender: "male" | "gender";
  fromDate: Date;
  tradingOnline: boolean;
}

export function GeneralForm() {
  const schema = useGeneralSchema();
  const [countries, setCountries] = useState<string[]>([]);
  const {
    control,
    formState: { isSubmitting },
    watch,
    setValue,
    handleSubmit,
  } = useForm<GeneralPayload>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      description: "",
      country: "",
      city: "",
      categories: [],
      amount: 0,
      fromDate: new Date(),
      tradingOnline: false,
    },
    resolver: zodResolver(schema),
  });

  const watchCity = watch("city");

  useEffect(() => {
    if (watchCity === "RM") {
      setValue("amount", 100000);
    }
  }, [watchCity]);

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
        options={CITY_OPTION_LIST}
        optionLabel="label"
        rootClassName="mb-2"
        highlightOnSelect={false}
        showClear
      />

      <RadioGroupField
        name="gender"
        label="Gender"
        control={control}
        options={GENDER_OPTION_LIST}
        rootClassName="mb-2"
      />

      <CheckboxGroupField
        name="categories"
        label="Category"
        control={control}
        options={CITY_OPTION_LIST}
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
