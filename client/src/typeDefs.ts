export interface IUser {
  createdAt?: string;
  email: string;
  expertise?: any;
  gearList?: Array<any>;
  genres?: Array<string>;
  password?: string;
  photos?: any;
  profilename: string;
  profilenameColor?: "#ffffff";
  role?: string;
  updatedAt?: string;
  origin?: string;
  __v?: number;
  _id?: string;
  isAuth?: boolean;
}

export interface ISearchAction {
  type: string;
  query?: string;
  role?: string;
}
