import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import theme from "../utils/theme";
import { createLog, deleteLog, fetchLogs } from "../services/api";
import { AddCircle, Chair, DeleteOutlined } from "@mui/icons-material";

interface Log {
  id: number;
  datetime: string;
  project: string;
  log: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<Log[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newLog, setNewLog] = useState({
    datetime: "",
    project: "",
    log: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [logToDelete, setLogToDelete] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewLog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createLog(newLog);
      setShowModal(false);
      setNewLog({ datetime: "", project: "", log: "" });
      try {
        const data = await fetchLogs(page + 1, rowsPerPage);
        setLogs(data.logs);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setNewLog({ datetime: "", project: "", log: "" });
  };

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs(page + 1, rowsPerPage, searchTerm);
        setLogs(data.logs);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    loadLogs();
  }, [page, rowsPerPage, searchTerm]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  const openDeleteDialog = (logId: number) => {
    setLogToDelete(logId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setLogToDelete(null);
  };

  const handleDelete = async () => {
    if (logToDelete) {
      try {
        await deleteLog(logToDelete);
        setLogs(logs.filter((log) => log.id !== logToDelete));
        closeDeleteDialog();
      } catch (error) {
        console.error("Error deleting log:", error);
      }
    }
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dev <span style={{ color: theme.palette.primary.main }}>Logs</span>
          </Typography>
          <Button color="primary" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography
          variant="h2"
          fontWeight="bold"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Dashboard
        </Typography>
        <TextField
          label="Search Logs"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2, width: "100%" }}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AddCircle />}
          onClick={() => setShowModal(true)}
        >
          Add New
        </Button>
        <List sx={{ bgcolor: "background.paper" }}>
          {logs.length >= 1 ? (
            logs.map((log) => (
              <ListItem
                key={log.id}
                component={Paper}
                elevation={2}
                sx={{
                  my: 1,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={
                    <div>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {log.project}
                      </Typography>
                      <Typography>{log.log}</Typography>
                    </div>
                  }
                  secondary={`${new Date(log.datetime)}`}
                />
                <IconButton
                  onClick={() => openDeleteDialog(log.id)}
                  color="error"
                >
                  <DeleteOutlined />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50vh",
              }}
            >
              <Chair sx={{ fontSize: 92, color: "action.disabled" }} />
              <Typography variant="subtitle1" color="textSecondary">
                This is empty
              </Typography>
            </Container>
          )}
        </List>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog
          open={showModal}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Log</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new development log, please enter the project name, date,
              and description here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="project"
              name="project"
              label="Project Name"
              type="text"
              fullWidth
              required
              value={newLog.project}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="datetime"
              name="datetime"
              label="Date and Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newLog.datetime}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="log"
              name="log"
              label="Log Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={newLog.log}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this log entry? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Dashboard;
