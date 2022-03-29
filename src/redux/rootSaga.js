import companySaga from "./sagas/companySaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([companySaga()]);
}
