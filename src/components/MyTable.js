import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getCompaniesStart } from "../redux/reducers/companySlice";
import { Button, TableHead } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Toaster from "./Toaster";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100, align: "left" },
  { id: "address", label: "Address", minWidth: 100, align: "left" },
];

function createData(id, name, email, address) {
  return { id, name, email, address };
}

export default function CustomPaginationActionsTable() {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.companies);

  const count = useSelector((state) => state.companies.count);
  const showToaster = useSelector((state) => state.companies.showToaster);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  companies.map((company) => {
    createData(company.id, company.name, company.email, company.address);
  });

  React.useEffect(() => {
    dispatch(getCompaniesStart({ page: page + 1, perPage: rowsPerPage }));
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      {showToaster && (
        <Toaster message="Company Created Successfully" type="success" />
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500, width: 2 / 4, mx: "auto", mt: "24px" }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: 160 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
