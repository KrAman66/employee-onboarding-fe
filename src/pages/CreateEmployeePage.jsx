import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import {
  getDepartments,
  getDesignations,
  getEmploymentTypes,
  getShifts,
  getLocations,
  getRoles,
  getCountries,
  getStates,
  getBanks,
  createEmployee,
} from "../services/api";

export default function CreateEmployeePage() {
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
    getDepartments().then((d) => setDepartments(d.data));
    getEmploymentTypes().then((d) => setEmploymentTypes(d.data));
    getShifts().then((d) => setShifts(d.data));
    getLocations().then((d) => setLocations(d.data));
    getRoles().then((d) => setRoles(d.data));
    getCountries().then((d) => setCountries(d.data));
    getBanks().then((d) => setBanks(d.data));
  }, []);

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
    try {
      await createEmployee(form);
      alert("Employee created successfully");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Employee
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="first_name"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="last_name"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="DOB"
                name="dob"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Gender"
                name="gender"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile"
                name="mobile_number"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Job Details */}
          <Typography variant="h6" gutterBottom>
            Job Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Department"
                name="department_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {departments.map((dep) => (
                  <MenuItem key={dep.id} value={dep.id}>
                    {dep.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Designation"
                name="designation_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {designations.map((des) => (
                  <MenuItem key={des.id} value={des.id}>
                    {des.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Employment Type"
                name="employment_type_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {employmentTypes.map((et) => (
                  <MenuItem key={et.id} value={et.id}>
                    {et.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Joining Date"
                name="joining_date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Location"
                name="location_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Shift"
                name="preferred_shift_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {shifts.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Role"
                name="role_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {roles.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Address */}
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Country"
                name="country_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {countries.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="State"
                name="state_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {states.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                name="city"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Pincode"
                name="pincode"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Bank Details */}
          <Typography variant="h6" gutterBottom>
            Bank Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="PAN"
                name="pan_number"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Aadhaar"
                name="aadhaar_number"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Bank"
                name="bank_id"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              >
                {banks.map((b) => (
                  <MenuItem key={b.id} value={b.id}>
                    {b.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Number"
                name="account_number"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="IFSC"
                name="ifsc_code"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Create Employee
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
