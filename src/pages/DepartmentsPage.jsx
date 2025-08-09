import { useEffect, useState } from "react";
import { getDepartments } from "../services/api";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then((data) => setDepartments(data.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <Paper>
        <List>
          {departments.map((dep) => (
            <ListItem key={dep.id}>
              <ListItemText primary={dep.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
