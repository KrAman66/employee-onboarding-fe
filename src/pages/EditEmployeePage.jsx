import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
  getDepartments,
  getDesignations,
  getEmploymentTypes,
  getShifts,
  getLocations,
  getRoles,
  getCountries,
  getStates,
  getBanks,
} from "../services/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";

export default function EditEmployeePage() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getEmployeeById(id).then((d) => setForm(d.data));

    getDepartments().then((d) => setDepartments(d.data));
    getEmploymentTypes().then((d) => setEmploymentTypes(d.data));
    getShifts().then((d) => setShifts(d.data));
    getLocations().then((d) => setLocations(d.data));
    getRoles().then((d) => setRoles(d.data));
    getCountries().then((d) => setCountries(d.data));
    getBanks().then((d) => setBanks(d.data));
  }, [id]);

  useEffect(() => {
    if (form.department_id) {
      getDesignations(form.department_id).then((d) => setDesignations(d.data));
    }
  }, [form.department_id]);

  useEffect(() => {
    if (form.country_id) {
      getStates(form.country_id).then((d) => setStates(d.data));
    }
  }, [form.country_id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(id, form);
    alert("Employee updated successfully");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Reuse same fields from CreateEmployeePage */}
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={form.first_name || ""}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="last_name"
                value={form.last_name || ""}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            {/* ... all other fields from CreateEmployeePage but with value={form[field] || ""} */}
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Update Employee
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
