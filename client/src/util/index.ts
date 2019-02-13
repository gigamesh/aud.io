import { IObj } from "../typeDefs";

// SAVE STATE TO LOCAL STORAGE (in the event of a page refresh)
export const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    return;
  }
};

// LOAD STATE FROM LOCAL STORAGE (in the event of a page refresh)
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined; // reducer will return Redux state, as localstorage is null.
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return;
  }
};

export const linkBuilder = (photoObj: IObj, width: number) => {
  if (!photoObj) return "";
  const root = "https://res.cloudinary.com/masurka/image/upload/";
  let { format, public_id, version } = photoObj;
  version = `v${version}/`;
  const transforms = `w_${width},h_500,c_fill,g_auto,dpr_auto/`;
  const link = root + transforms + version + public_id + "." + format;
  return link;
};
