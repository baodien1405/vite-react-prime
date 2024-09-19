import { zodResolver } from "@hookform/resolvers/zod";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState } from "react";
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
import { CITY_OPTION_LIST, GENDER_OPTION_LIST } from "@/constants";
import { useAddressInformation, useGeneralSchema } from "@/hooks";

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

  const isVNCountry = watch("country") === "VN";
  const province = watch("province");
  const district = watch("district");

  const {
    COUNTRY_OPTIONS,
    PROVINCE_OPTIONS,
    DISTRICT_OPTIONS,
    WARD_OPTIONS,
    loadingCountryList,
    loadingProvinceList,
    loadingDistrictList,
    loadingWardList,
  } = useAddressInformation({
    isVNCountry,
    district,
    province,
  });

  const handleFormSubmit = async (payload: GeneralPayload) => {
    await onSubmit?.(payload);
  };

  const handleSearchCountry = (event: AutoCompleteCompleteEvent) => {
    setCountries([...Array(10).keys()].map((item) => event.query + "-" + item));
  };

  const handleCountryChange = (e: DropdownChangeEvent) => {
    if (e.value !== "VI") {
      setValue("province", "");
      setValue("district", "");
      setValue("ward", "");
    }
  };

  const handleProvinceChange = () => {
    setValue("district", "");
    setValue("ward", "");
  };

  const handleDistrictChange = () => {
    setValue("ward", "");
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="!grid grid-cols-4 gap-4 mb-2">
          <DropdownField
            rootClassName="w-full"
            name="country"
            label="Country"
            placeholder={loadingCountryList ? "Loading..." : "Select a country"}
            control={control}
            options={COUNTRY_OPTIONS}
            optionLabel="label"
            highlightOnSelect={false}
            showClear
            filter
            loading={loadingCountryList}
            disabled={loadingProvinceList}
            onChange={handleCountryChange}
          />

          <DropdownField
            rootClassName="w-full"
            name="province"
            label="Province"
            placeholder={
              loadingProvinceList ? "Loading..." : "Select a province"
            }
            control={control}
            options={PROVINCE_OPTIONS}
            optionLabel="label"
            highlightOnSelect={false}
            showClear
            filter
            loading={loadingProvinceList}
            disabled={!isVNCountry || loadingProvinceList}
            onChange={handleProvinceChange}
          />

          <DropdownField
            rootClassName="w-full"
            name="district"
            label="District"
            placeholder={
              loadingDistrictList ? "Loading..." : "Select a district"
            }
            control={control}
            options={DISTRICT_OPTIONS}
            optionLabel="label"
            highlightOnSelect={false}
            showClear
            loading={loadingDistrictList}
            disabled={!isVNCountry || !province || loadingDistrictList}
            filter
            onChange={handleDistrictChange}
          />

          <DropdownField
            rootClassName="w-full"
            name="ward"
            label="Ward"
            placeholder={loadingWardList ? "Loading..." : "Select a ward"}
            control={control}
            options={WARD_OPTIONS}
            optionLabel="label"
            highlightOnSelect={false}
            showClear
            loading={loadingWardList}
            disabled={!isVNCountry || !district || loadingWardList}
            filter
          />
        </div>
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
    </>
  );
}
