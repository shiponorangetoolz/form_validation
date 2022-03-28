import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";
import companySlice from "./reducers/companySlice";

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
    companies: companySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(saga),
});

saga.run(rootSaga);
