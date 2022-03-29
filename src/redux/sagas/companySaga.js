import { all, call, put, takeEvery, fork, delay } from "redux-saga/effects";
import {
  getCompaniesSuccess,
  getCompaniesError,
  createCompaniesSuccess,
  hideToaster,
} from "../reducers/companySlice";
import { getCompaniesAPI, createCompanyAPI } from "../../Api";
import { validateEmail } from "../../helper/isEmailValidate";
import { isValidUrl } from "../../helper/isValidUrl";
import { isPhoneValid } from "../../helper/isPhoneValid";
import {
  companyFormValidationError,
  companyFormValidationSuccess,
  companyServerSideError,
} from "../reducers/errorSlice";
import {
  showToaster
} from "../reducers/toasterSlice";

// Watchers

function* companySaga() {
  yield takeEvery("companies/getCompaniesStart", getCompaniesDatas);
  yield takeEvery("companies/createCompaniesStart", createCompaniesSaga);
}

// Sagas

function* getCompaniesDatas(action) {
  // console.log(action.payload,"...page payload")
  try {
    const { data } = yield call(getCompaniesAPI, action.payload);
    yield put(getCompaniesSuccess(data));
  } catch (error) {
    yield put(getCompaniesError());
  }
}

function* createCompaniesSaga({ payload }) {
  let errors = {
    nameError: null,
    emailError: null,
    webAddressError: null,
    phoneError: null,
  };

  // trim values
  const name = payload.data.name.trim();
  const email = payload.data.email;
  const webAddress = payload.data.webAddress.trim();
  const phone = payload.data.phone.trim();

  // validate name
  if (!name) {
    errors.nameError = "Name is required";
  } else if (name.length <= 2) {
    errors.nameError = "Name must be greater than 2 characters";
  }

  // validate web address
  if (!webAddress) {
    errors.webAddressError = "Web Address is required";
  } else if (!isValidUrl(webAddress)) {
    errors.webAddressError = "Web Address is not valid";
  }

  // validate email
  if (!email) {
    errors.emailError = "Email is required";
  } else if (!validateEmail(email)) {
    errors.emailError = "Email is not valid";
  }

  // validate phone
  if (!phone) {
    errors.phoneError = "Phone is required";
  } else if (!isPhoneValid(phone)) {
    errors.phoneError = "Phone is not valid";
  }

  if (
    errors.nameError !== null ||
    errors.emailError !== null ||
    errors.webAddressError !== null ||
    errors.phoneError !== null
  ) {
    yield put(companyFormValidationError({ errors }));
  } else {
    yield put(companyFormValidationSuccess());
    try {
      const data = yield call(createCompanyAPI, payload.data);

      if (data.status === 201) {
        yield put(showToaster());
        yield delay(500);
        payload.navigate("/");
      } else if (data.data.validator_error) {
        yield put(
          companyServerSideError({ serverErr: data.data.validator_error })
        );
      }
      yield put(createCompaniesSuccess());
    } catch (error) {
      console.log(error, "....server error ");
    }
  }
}

export default function* contactSaga() {
  yield all([fork(companySaga)]);
}
