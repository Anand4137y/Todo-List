import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import toast from 'react-hot-toast'

function AddTodo() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add", { title, description });
      setTitle("");
      setDescription("");
      toast.success("Todo Created");
      navigate("/");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add New Todo
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{
              py: 1.5,
              mb: 2, // Add margin-bottom to separate from Back button
            }}
          >
            Add Todo
          </Button>
        </form>

        {/* Back Button */}
        <Button
          component={Link} 
          to="/"
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            py: 1.5,
          }}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}

export default AddTodo;
