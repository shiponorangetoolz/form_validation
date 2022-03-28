import { combineReducers } from "redux";
import companySlice from "./companySlice";

const reducers = combineReducers({
	companies:companySlice,
});

export default reducers;