import React, {useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions, IconButton, MenuItem, Select, FormControl, InputLabel, } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from 'react-hot-toast'


function Home() {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all");
        setTodos(response.data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    fetchTodos();
  }, []);

  // Filtered Todos
  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? true : todo.status === filter
  );

  // Update Todo Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/update/${id}`, {
        status: newStatus,
      });
      // Update local state with the updated todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, status: response.data.status } : todo
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Deleted Successfully")
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          My Todos
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/add")}>
          Add Todo
        </Button>
      </Box>

      {/* Filter */}
      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel id="filter-label">Filter by Status</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Todo List */}
      <Grid container spacing={3}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <Grid item xs={12} sm={6} key={todo._id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {todo.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    {todo.description || "No description provided."}
                  </Typography>
                  <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                    <InputLabel id={`status-label-${todo._id}`}>Status</InputLabel>
                    <Select
                      labelId={`status-label-${todo._id}`}
                      value={todo.status}
                      onChange={(e) => handleStatusChange(todo._id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
                <CardActions>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit/${todo._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(todo._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 3 }}>
            No todos available. Add a new one!
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Home;
