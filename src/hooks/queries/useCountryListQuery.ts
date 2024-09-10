import { useQuery } from "@tanstack/react-query";
import { commonApi } from "@/api";

export const useCountryListQuery = () => {
  return useQuery({
    queryKey: ["country-list"],
    queryFn: commonApi.getCountryList,
  });
};
