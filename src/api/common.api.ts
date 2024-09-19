import { District, Province, Ward } from "@/model";
import axiosClient from "./axios-client";

export const commonApi = {
  getCountryList() {
    return axiosClient.get("/v3.1/all", {
      baseURL: "https://restcountries.com",
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
    return axiosClient.get<{ data: Array<District> }>(
      `/api-tinhthanh/2/${idProvince}.htm`,
      {
        baseURL: "https://esgoo.net",
      }
    );
  },

  getWardList(idDistrict: string) {
    return axiosClient.get<{ data: Array<Ward> }>(
      `/api-tinhthanh/3/${idDistrict}.htm`,
      {
        baseURL: "https://esgoo.net",
      }
    );
  },
};
