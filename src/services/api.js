const API_BASE =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://employee-onboarding-api.onrender.com/api";

async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} - ${errorText}`);
  }
  return res.json();
}

// Masters
export const getDepartments = () => apiFetch(`/masters/departments`);
export const getDesignations = (departmentId) =>
  apiFetch(`/masters/designations?department=${departmentId}`);
export const getEmploymentTypes = () => apiFetch(`/masters/employment-types`);
export const getShifts = () => apiFetch(`/masters/shifts`);
export const getLocations = () => apiFetch(`/masters/locations`);
export const getRoles = () => apiFetch(`/masters/roles`);
export const getCountries = () => apiFetch(`/masters/countries`);
export const getStates = (countryId) =>
  apiFetch(`/masters/states?country=${countryId}`);
export const getBanks = () => apiFetch(`/masters/banks`);

// Employees
export const getEmployees = () => apiFetch(`/employees`);
export const getEmployeeById = (id) => apiFetch(`/employees/${id}`);
export const createEmployee = (data) =>
  apiFetch(`/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const updateEmployee = (id, data) =>
  apiFetch(`/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const deleteEmployee = (id) =>
  apiFetch(`/employees/${id}`, { method: "DELETE" });
