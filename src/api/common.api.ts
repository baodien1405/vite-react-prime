import { Province } from "@/model";
import axiosClient from "./axios-client";

export const commonApi = {
  getCountryList() {
    return axiosClient.get("/api-tinhthanh/1/0.htm", {
      baseURL: "https://esgoo.net",
    });
  },

  getProvinceList() {
    return axiosClient.get<{ data: Array<Province> }>(
      "/api-tinhthanh/1/0.htm",
      {
        baseURL: "https://esgoo.net",
      }
    );
  },

  getDistrictList(idProvince: string) {
    return axiosClient.get(`/api-tinhthanh/2/${idProvince}.htm`, {
      baseURL: "https://esgoo.net",
    });
  },

  getWardList(idDistrict: string) {
    return axiosClient.get(`/api-tinhthanh/3/${idDistrict}.htm`, {
      baseURL: "https://esgoo.net",
    });
  },
};
