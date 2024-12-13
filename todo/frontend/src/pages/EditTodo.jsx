import React, { useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import toast from 'react-hot-toast'

function EditTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();



  // Handle Form Submission
  const handleSubmit = async (e) => {
    console.log("here");
    
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/update/${id}`, {
        title,
        description,
        status
      });
      toast.success("Edited Successfully")
      navigate("/");
    } catch (err) {
      alert("Failed to update the todo");
    }
  };

  return (
    <Container maxWidth="sm">
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
          Edit Todo
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Description Field */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Status Field */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          {/* Update Button */}
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ py: 1.5, mb: 2 }}
          >
            Update Todo
          </Button>
        </form>

        {/* Back Button */}
        <Button
         component={Link} 
         to='/'
          variant="contained"
          color="secondary"
          fullWidth
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}

export default EditTodo;
