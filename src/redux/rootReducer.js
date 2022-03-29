import { combineReducers } from "redux";
import companySlice from "./reducers/companySlice";
import errorSlice from "./reducers/errorSlice";
import toasterSlice from "./reducers/toasterSlice";


const rootReducer = combineReducers({
	companies:companySlice,
	errors:errorSlice,
	toaster:toasterSlice
});

export default rootReducer;