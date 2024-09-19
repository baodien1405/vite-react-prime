import { useQuery } from "@tanstack/react-query";
import { commonApi } from "@/api";

export const useWardListQuery = (idDistrict: string) => {
  return useQuery({
    queryKey: ["ward-list", idDistrict],
    queryFn: () => commonApi.getWardList(idDistrict),
    enabled: !!idDistrict,
  });
};
