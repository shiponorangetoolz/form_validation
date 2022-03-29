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

  const error = useSelector((state) => state.errors.errors);
  const serverSideError = useSelector((state) => state.errors.serverSideError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createCompaniesStart({ data: data, navigate: navigate }));
  };

  return (
    <div className=" w-75 p-3 mx-auto">
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              autoComplete="given-name"
              name="name"
              id="name"
              label="Name"
              autoFocus
              {...register("name", { type: "name" })}
            />
            {error.name !== null && error.name !== "" && (
              <span style={{ color: "red" }}>{error.name}</span>
            )}
            {serverSideError.name !== null && serverSideError.name !== "" && (
              <span style={{ color: "red" }}>
                {serverSideError && serverSideError.name}
              </span>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="webAddress"
              label="Web Address"
              name="webAddress"
              autoComplete="address"
              {...register("webAddress")}
            />
            {error.webAddress !== null && error.webAddress !== "" && (
              <span style={{ color: "red" }}>{error.webAddress}</span>
            )}
          </Grid>

          <Grid item xs={6}>
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
              <span style={{ color: "red" }}>{error.email}</span>
            )}
            {serverSideError.email !== null && serverSideError.email !== "" && (
              <span style={{ color: "red" }}>
                {serverSideError && serverSideError.email}
              </span>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              {...register("phone")}
            />
            {error.phone !== null && error.phone !== "" && (
              <span style={{color: "red"}} >{error.phone}</span>
            )}
            {serverSideError.phone !== null && serverSideError.phone !== "" && (
              <span style={{color: "red"}} >{serverSideError && serverSideError.phone}</span>
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
