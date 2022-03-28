import companySaga from "./companySaga";
import createCompaniesSaga from "./companySaga"
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([companySaga()]);
  yield all([createCompaniesSaga()]);
}
