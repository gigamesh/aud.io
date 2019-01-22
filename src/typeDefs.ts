export type Nullable<T> = { [P in keyof T]: T[P] | null };

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
  address: IObj;
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

export type Classes = {
  root: string;
  lessPad: string;
};

export interface IObj {
  [index: string]: any;
}
