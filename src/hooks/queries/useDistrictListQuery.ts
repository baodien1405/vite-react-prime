import { useQuery } from "@tanstack/react-query";
import { commonApi } from "@/api";

export const useDistrictListQuery = (idProvince: string) => {
  return useQuery({
    queryKey: ["district-list", idProvince],
    queryFn: () => commonApi.getDistrictList(idProvince),
    enabled: !!idProvince,
  });
};
