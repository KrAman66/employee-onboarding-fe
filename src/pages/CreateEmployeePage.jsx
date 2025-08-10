import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
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
  getEmployees, // managers
} from "../services/api";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { cleanPayload } from "../utils/formUtils";

const steps = ["Personal & Job Information", "Address & Bank Information"];

const emptyForm = {
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  email: "",
  mobile_number: "",
  department_id: "",
  designation_id: "",
  employment_type_id: "",
  joining_date: "",
  location_id: "",
  preferred_shift_id: "",
  role_id: "",
  reporting_manager_id: "",
  address_line1: "",
  address_line2: "",
  country_id: "",
  state_id: "",
  city: "",
  pincode: "",
  pan_number: "",
  aadhaar_number: "",
  bank_id: "",
  account_number: "",
  ifsc_code: "",
};

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
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

    const payload = cleanPayload(form);

    // If reporting_manager_id is empty, remove it
    if (!payload.reporting_manager_id) {
      delete payload.reporting_manager_id;
    }

    try {
      await createEmployee(payload);
      setSnackbar({
        open: true,
        message: "Employee created successfully",
        error: false,
      });
      setTimeout(() => navigate("/"), 1000); // ✅ Redirect to root
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
        <EmployeeForm
          form={form}
          onChange={handleChange}
          options={{
            departments,
            designations,
            employmentTypes,
            shifts,
            locations,
            roles,
            countries,
            states,
            banks,
            managers,
          }}
          step={activeStep}
        />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
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
