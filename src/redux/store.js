import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import companySlice from "./reducers/companySlice";
import rootReducer from "./rootReducer";

const saga = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      saga
    ),
});

saga.run(rootSaga);
