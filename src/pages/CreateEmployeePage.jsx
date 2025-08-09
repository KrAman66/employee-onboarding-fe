import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Stack,
  Card,
  CardContent,
  Snackbar,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
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
  getEmployees, // For Reporting Manager list
} from "../services/api";

const steps = ["Personal & Job Information", "Address & Bank Information"];

export default function CreateEmployeePage() {
  const [form, setForm] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    error: false,
  });

  // Master data
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [banks, setBanks] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    Promise.all([
      getDepartments().then((d) => setDepartments(d.data)),
      getEmploymentTypes().then((d) => setEmploymentTypes(d.data)),
      getShifts().then((d) => setShifts(d.data)),
      getLocations().then((d) => setLocations(d.data)),
      getRoles().then((d) => setRoles(d.data)),
      getCountries().then((d) => setCountries(d.data)),
      getBanks().then((d) => setBanks(d.data)),
      getEmployees().then((res) => setManagers(res.data || [])),
    ]).finally(() => setLoading(false));
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

  const validateStep = () => {
    if (activeStep === 0) {
      // Basic DB constraint validations for step 1
      const { dob, mobile_number, joining_date } = form;
      if (!dob || new Date().getFullYear() - new Date(dob).getFullYear() < 18) {
        return "Employee must be at least 18 years old";
      }
      if (!/^\d{10}$/.test(mobile_number || "")) {
        return "Mobile number must be 10 digits";
      }
      if (joining_date && new Date(joining_date) < new Date()) {
        return "Joining date cannot be in the past";
      }
    }
    if (activeStep === 1) {
      const { pincode, pan_number, aadhaar_number, account_number, ifsc_code } =
        form;
      if (!/^\d{6}$/.test(pincode || "")) return "Pincode must be 6 digits";
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan_number || ""))
        return "Invalid PAN format";
      if (!/^\d{12}$/.test(aadhaar_number || ""))
        return "Aadhaar must be 12 digits";
      if (!/^\d{9,18}$/.test(account_number || ""))
        return "Invalid account number";
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc_code || ""))
        return "Invalid IFSC code";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) {
      setSnackbar({ open: true, message: err, error: true });
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep();
    if (err) {
      setSnackbar({ open: true, message: err, error: true });
      return;
    }

    // Remove optional empty fields
    const payload = Object.fromEntries(
      Object.entries(form).filter(
        ([_, v]) => v !== "" && v !== null && v !== undefined
      )
    );

    try {
      await createEmployee(payload);
      setSnackbar({
        open: true,
        message: "Employee created successfully",
        error: false,
      });
      setForm({});
      setActiveStep(0);
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Error: ${err.message}`,
        error: true,
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Employee
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="first_name"
                      required
                      fullWidth
                      value={form.first_name || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="last_name"
                      required
                      fullWidth
                      value={form.last_name || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="date"
                      label="DOB"
                      name="dob"
                      required
                      fullWidth
                      value={form.dob || ""}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Gender"
                      name="gender"
                      required
                      fullWidth
                      value={form.gender || ""}
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="email"
                      label="Email"
                      name="email"
                      required
                      fullWidth
                      value={form.email || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Mobile Number"
                      name="mobile_number"
                      required
                      fullWidth
                      value={form.mobile_number || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Job Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Department"
                      name="department_id"
                      required
                      fullWidth
                      value={form.department_id || ""}
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
                      required
                      fullWidth
                      value={form.designation_id || ""}
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
                      required
                      fullWidth
                      value={form.employment_type_id || ""}
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
                      required
                      fullWidth
                      value={form.joining_date || ""}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Location"
                      name="location_id"
                      required
                      fullWidth
                      value={form.location_id || ""}
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
                      label="Preferred Shift"
                      name="preferred_shift_id"
                      fullWidth
                      value={form.preferred_shift_id || ""}
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
                      required
                      fullWidth
                      value={form.role_id || ""}
                      onChange={handleChange}
                    >
                      {roles.map((r) => (
                        <MenuItem key={r.id} value={r.id}>
                          {r.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Reporting Manager"
                      name="reporting_manager_id"
                      fullWidth
                      value={form.reporting_manager_id || ""}
                      onChange={handleChange}
                    >
                      <MenuItem value="">None</MenuItem>
                      {managers.map((m) => (
                        <MenuItem key={m.employee_id} value={m.employee_id}>
                          {m.first_name} {m.last_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        )}

        {activeStep === 1 && (
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Address Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Address Line 1"
                      name="address_line1"
                      required
                      fullWidth
                      value={form.address_line1 || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address Line 2"
                      name="address_line2"
                      fullWidth
                      value={form.address_line2 || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Country"
                      name="country_id"
                      required
                      fullWidth
                      value={form.country_id || ""}
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
                      required
                      fullWidth
                      value={form.state_id || ""}
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
                      required
                      fullWidth
                      value={form.city || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Pincode"
                      name="pincode"
                      required
                      fullWidth
                      value={form.pincode || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bank Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="PAN"
                      name="pan_number"
                      required
                      fullWidth
                      value={form.pan_number || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Aadhaar"
                      name="aadhaar_number"
                      required
                      fullWidth
                      value={form.aadhaar_number || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Bank"
                      name="bank_id"
                      required
                      fullWidth
                      value={form.bank_id || ""}
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
                      required
                      fullWidth
                      value={form.account_number || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="IFSC"
                      name="ifsc_code"
                      required
                      fullWidth
                      value={form.ifsc_code || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        )}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          {activeStep > 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type="submit" variant="contained">
              Create Employee
            </Button>
          )}
        </Stack>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            background: snackbar.error ? "#d32f2f" : "#2e7d32",
            color: "#fff",
          },
        }}
      />
    </Container>
  );
}
