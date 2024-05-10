/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { getToken, setToken } from "../utils/auth";
import { fetchLogs, login } from "../services/api";
import { History } from "@mui/icons-material";
import theme from "../utils/theme";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      const data = await login(username, password);
      setToken(data.token);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error?.message);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          await fetchLogs();
          navigate("/dashboard");
        } catch (error) {
          console.error("Expired token", error);
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Typography variant="h3" component="div" sx={{ flexGrow: 1}} fontWeight="bold">
            Dev <span style={{ color: theme.palette.primary.main }}>L
        <History  color="primary"  fontSize="large" />
            gs</span>
          </Typography>
        <Typography variant="subtitle1" textAlign="center" sx={{ mb:2}}>
          Just your development logs
        </Typography>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
