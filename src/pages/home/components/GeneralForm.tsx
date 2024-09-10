import { useState } from "react";
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
import { useGeneralSchema, useProvinceListQuery } from "@/hooks";
import { CITY_OPTION_LIST, GENDER_OPTION_LIST } from "@/constants";

interface GeneralPayload {
  fullName: string;
  email: string;
  password: string;
  amount: number;
  city: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  description: string;
  categories: string[];
  gender: "male" | "gender";
  fromDate: Date;
  tradingOnline: boolean;
}

interface GeneralFormProps {
  onSubmit?: (payload: GeneralPayload) => void;
}

export function GeneralForm({ onSubmit }: GeneralFormProps) {
  const schema = useGeneralSchema();
  const [countries, setCountries] = useState<string[]>([]);
  const { data: provinceListData } = useProvinceListQuery();
  const provinceOptions = (provinceListData?.data.data || []).map(
    (province) => ({
      label: province.name,
      value: province.id,
    })
  );

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
      province: "",
      district: "",
      ward: "",
      city: "",
      address: "",
      categories: [],
      amount: 0,
      fromDate: new Date(),
      tradingOnline: false,
    },
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (payload: GeneralPayload) => {
    await onSubmit?.(payload);
  };

  const handleSearchCountry = (event: AutoCompleteCompleteEvent) => {
    setCountries([...Array(10).keys()].map((item) => event.query + "-" + item));
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
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

      <div className="grid grid-cols-4 gap-4 mb-2">
        <DropdownField
          name="country"
          label="Country"
          placeholder="Select a country"
          control={control}
          options={[]}
          optionLabel="label"
          highlightOnSelect={false}
          showClear
        />

        <DropdownField
          name="province"
          label="Province"
          placeholder="Select a province"
          control={control}
          options={provinceOptions}
          optionLabel="label"
          highlightOnSelect={false}
          showClear
          filter
        />

        <DropdownField
          name="district"
          label="District"
          placeholder="Select a district"
          control={control}
          options={[]}
          optionLabel="label"
          highlightOnSelect={false}
          showClear
        />

        <DropdownField
          name="ward"
          label="Ward"
          placeholder="Select a ward"
          control={control}
          options={[]}
          optionLabel="label"
          highlightOnSelect={false}
          showClear
        />
      </div>

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
