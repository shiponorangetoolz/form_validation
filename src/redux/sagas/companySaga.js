import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  fork,
  delay,
} from "redux-saga/effects";
import {
  getCompaniesSuccess,
  getCompaniesError,
  createCompaniesSuccess,
  formValidationError,
  formValidationSuccess,
  serverSideError,
  redirectSlice,
} from "../reducers/companySlice";
import { getCompaniesAPI, createCompanyAPI } from "../../Api";


// Sagas

function* getCompaniesDatas() {
  try {
    const { data } = yield call(getCompaniesAPI);
    yield put(getCompaniesSuccess(data.data));
  } catch (error) {
    yield put(getCompaniesError());
  }
}

function* createCompaniesSaga({ payload }) {
  let errors = {
    nameError: null,
    emailError: null,
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  if (!payload.data.name) {
    errors.nameError = "Name is required";
  } else if (payload.data.name.length <= 2) {
    errors.nameError = "Name must be greater than 2 characters";
  }

  if (!payload.data.email) {
    errors.emailError = "Email is required";
  } else if (!validateEmail(payload.data.email)) {
    errors.emailError = "Email is not valid";
  }

  if (errors.nameError !== null || errors.emailError !== null) {
    yield put(formValidationError({ errors }));
  } else {
    yield put(formValidationSuccess());
    try {
      const data = yield call(createCompanyAPI, payload.data);

      if (data.status == 201) {
        yield delay(500);
        payload.navigate("/");
      } else if (data.data.validator_error) {
        console.log("vals", data.data.validator_error);
        yield put(serverSideError(data.data.validator_error));
      }

      yield put(createCompaniesSuccess());
    } catch (error) {
      console.log(error, "....server error ");
    }
  }
}

// Watchers

function* companySaga() {
  yield takeEvery("companies/getCompaniesStart", getCompaniesDatas);
}

function* createCompanySaga() {
  yield takeEvery("companies/createCompaniesStart", createCompaniesSaga);
}

export default function* contactSaga() {
  yield all([fork(companySaga)]);
  yield all([fork(createCompanySaga)]);
}
