// components/EmployeeForm.jsx
import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function EmployeeForm({ form, onChange, options, step }) {
  const {
    departments = [],
    designations = [],
    employmentTypes = [],
    shifts = [],
    locations = [],
    roles = [],
    countries = [],
    states = [],
    banks = [],
    managers = [],
  } = options || {};

  const commonSelectProps = {
    fullWidth: true,
    SelectProps: { displayEmpty: true },
    InputLabelProps: { shrink: true },
    onChange,
  };

  return (
    <>
      {step === 0 && (
        <>
          <Card sx={{ mb: 3 }}>
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
                    value={form.first_name}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="last_name"
                    required
                    fullWidth
                    value={form.last_name}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    label="DOB"
                    name="dob"
                    required
                    fullWidth
                    value={form.dob}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
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
                    value={form.email}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mobile Number"
                    name="mobile_number"
                    required
                    fullWidth
                    value={form.mobile_number}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
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
                    value={form.department_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Department</MenuItem>
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
                    value={form.designation_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Designation</MenuItem>
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
                    value={form.employment_type_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Employment Type</MenuItem>
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
                    value={form.joining_date}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Location"
                    name="location_id"
                    value={form.location_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Location</MenuItem>
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
                    value={form.preferred_shift_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Shift</MenuItem>
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
                    value={form.role_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Role</MenuItem>
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
                    value={form.reporting_manager_id}
                    {...commonSelectProps}
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
        </>
      )}

      {step === 1 && (
        <>
          <Card sx={{ mb: 3 }}>
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
                    value={form.address_line1}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address Line 2"
                    name="address_line2"
                    fullWidth
                    value={form.address_line2}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Country"
                    name="country_id"
                    value={form.country_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Country</MenuItem>
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
                    value={form.state_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select State</MenuItem>
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
                    value={form.city}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Pincode"
                    name="pincode"
                    required
                    fullWidth
                    value={form.pincode}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
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
                    value={form.pan_number}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Aadhaar"
                    name="aadhaar_number"
                    required
                    fullWidth
                    value={form.aadhaar_number}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Bank"
                    name="bank_id"
                    value={form.bank_id}
                    {...commonSelectProps}
                  >
                    <MenuItem value="">Select Bank</MenuItem>
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
                    value={form.account_number}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="IFSC"
                    name="ifsc_code"
                    required
                    fullWidth
                    value={form.ifsc_code}
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
