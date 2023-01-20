export type IUserInfoDto = {
  firstName: string;
  surName: string;
  email: string;
  userPic?: string;
  role: string;
};

export type IUserDto = IUserInfoDto & {
  password: string;
  token: string;
};
