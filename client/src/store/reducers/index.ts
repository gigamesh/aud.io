import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import user from "./userReducer";
import search from "./searchReducer";

const rootReducer = combineReducers({
  user,
  search
});

export default rootReducer;
export type RootState = StateType<typeof rootReducer>;
