export interface User {
  createdAt: String;
  email: String;
  expertise: any;
  gearList: Array<any>;
  genres: Array<String>;
  password: String;
  photos: any;
  profilename: String;
  profilenameColor: "#ffffff";
  role: String;
  updatedAt: String;
  __v: Number;
  _id: String;
}

export interface actionObj {
  type: string;
  payload?: any;
}
