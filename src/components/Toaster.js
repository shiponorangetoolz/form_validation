import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideToaster } from "../redux/reducers/companySlice";

export default function Toaster({ message, type }) {
  const showToaster = useSelector((state) => state.companies.showToaster);
  const [show, setShow] = React.useState(showToaster);
  const dispatch = useDispatch();

  console.log(showToaster,"...toaster show")

  React.useEffect(() => {
    setTimeout(() => {
        dispatch(hideToaster());
    }, 2000);
  })

  return (
    <Stack sx={{ width: "25%", ml: 5, mt: 5 }} spacing={2}>
      {show && (
        <Alert
          onClose={() => {
            setShow(!show);
          }}
          severity={type}
        >
          {message}
        </Alert>
      )}
    </Stack>
  );
}
