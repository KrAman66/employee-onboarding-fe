import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
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
  getEmployees,
} from "../services/api";
import EmployeeForm from "../components/EmployeeForm";

const steps = ["Personal & Job Information", "Address & Bank Information"];

const emptyForm = {
  /* same as Create page */
};

export default function EditEmployeePage() {
  const { id } = useParams();
  const [form, setForm] = useState(emptyForm);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    error: false,
  });

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
      getEmployeeById(id).then((res) => setForm(res.data)),
    ]).finally(() => setLoading(false));
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
    try {
      await updateEmployee(id, form);
      setSnackbar({
        open: true,
        message: "Employee updated successfully",
        error: false,
      });
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
        Edit Employee
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
          {activeStep > 0 && (
            <Button onClick={() => setActiveStep((prev) => prev - 1)}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type="submit" variant="contained">
              Update Employee
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
