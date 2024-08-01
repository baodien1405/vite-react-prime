const LOGIN_RESPONSE = {
  data: {
    accessToken: "23123bchsbdcbsadh1423423hbhszbchsdbs",
  },
  message: "Login successfully",
};

export const authAPI = {
  login(body?: any): Promise<typeof LOGIN_RESPONSE> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(LOGIN_RESPONSE);
      }, 1500);
    });
  },
};
