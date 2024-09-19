import { useQuery } from "@tanstack/react-query";
import { commonApi } from "@/api";

interface UseProvinceListQueryProps {
  isVN: boolean;
}

export const useProvinceListQuery = ({ isVN }: UseProvinceListQueryProps) => {
  return useQuery({
    queryKey: ["province-list"],
    queryFn: commonApi.getProvinceList,
    enabled: isVN,
  });
};
