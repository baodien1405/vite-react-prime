import { useQuery } from "@tanstack/react-query";
import { commonApi } from "@/api";

export const useProvinceListQuery = () => {
  return useQuery({
    queryKey: ["province-list"],
    queryFn: commonApi.getProvinceList,
  });
};
