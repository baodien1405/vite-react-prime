import {
  useCountryListQuery,
  useProvinceListQuery,
  useDistrictListQuery,
  useWardListQuery,
} from "@/hooks/queries";

interface UseAddressInformationProps {
  isVNCountry: boolean;
  province: string;
  district: string;
}

export const useAddressInformation = ({
  isVNCountry,
  province,
  district,
}: UseAddressInformationProps) => {
  const { data: countryListData, isLoading: loadingCountryList } =
    useCountryListQuery();

  const { data: provinceListData, isLoading: loadingProvinceList } =
    useProvinceListQuery({
      isVN: isVNCountry,
    });

  const { data: districtListData, isLoading: loadingDistrictList } =
    useDistrictListQuery(province);

  const { data: wardListData, isLoading: loadingWardList } =
    useWardListQuery(district);

  const COUNTRY_OPTIONS = (countryListData?.data || []).map((country) => ({
    label: country.name.common,
    value: country.cca2,
  }));

  const PROVINCE_OPTIONS = (provinceListData?.data.data || []).map(
    (province) => ({
      label: province.name,
      value: province.id,
    })
  );

  const DISTRICT_OPTIONS = (districtListData?.data.data || []).map(
    (district) => ({
      label: district.name,
      value: district.id,
    })
  );

  const WARD_OPTIONS = (wardListData?.data.data || []).map((ward) => ({
    label: ward.name,
    value: ward.id,
  }));

  return {
    COUNTRY_OPTIONS,
    PROVINCE_OPTIONS,
    DISTRICT_OPTIONS,
    WARD_OPTIONS,
    loadingCountryList,
    loadingProvinceList,
    loadingDistrictList,
    loadingWardList,
  };
};
