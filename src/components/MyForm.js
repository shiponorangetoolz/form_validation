import React from "react";
import "../../src/App.css";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Input, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCompaniesStart } from "../redux/reducers/companySlice";
import { useNavigate } from "react-router-dom";

function MyForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.companies.error);
  const serverSideError = useSelector(
    (state) => state.companies.serverSideError
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createCompaniesStart({data:data, navigate:navigate}));
  };

  return (
    <div className="App w-25 p-3 mx-auto">
      <p> {serverSideError && serverSideError} </p>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="name"
              id="name"
              label="Name"
              autoFocus
              {...register("name", { type: "name" })}
            />
            {error.name !== null && error.name !== "" && (
              <span style={{color: "red"}} >{error.name}</span>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              {...register("address")}
            />
            {error.address !== null && error.address !== "" && (
              <span style={{color: "red"}} >{error.address}</span>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register("email")}
            />
            {error.email !== null && error.email !== "" && (
              <span style={{color: "red"}} >{error.email}</span>
            )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}

export default MyForm;
