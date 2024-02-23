import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  DialogContentText,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { firebasedb } from "../../../firebase/firebase";

const DataGridDemo = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState({});
  const [editedItemId, setEditedItemId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [rolePermissions, setRolePermissions] = useState({});
  const [jobProfiles, setJobProfiles] = useState([]);

  const usersCollectionRef = collection(firebasedb, "users");
  const rolesCollectionRef = collection(firebasedb, "roles");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(usersCollectionRef);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(updatedData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        const querySnapshot = await getDocs(rolesCollectionRef);
        const fetchedRolePermissions = {};
        const fetchedJobProfiles = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedRolePermissions[data.roles] = data;
          fetchedJobProfiles.push(data.roles); // Add roles dynamically
        });

        setRolePermissions(fetchedRolePermissions);
        setJobProfiles(fetchedJobProfiles);
      } catch (error) {
        console.error("Error fetching role permissions: ", error);
      }
    };

    fetchRolePermissions();
  }, []);

  const handleAddNew = () => {
    setModalTitle("Add New Name");
    setModalContent({
      fullName: "",
      email: "",
      jobProfile: "",
      joiningDate: "",
    });
    setModalOpen(true);
  };

  const handleEdit = (id, fullName, email, jobProfile, joiningDate) => {
    setModalTitle("Edit Name");
    setModalContent({ fullName, email, jobProfile, joiningDate });
    setModalOpen(true);
    setEditedItemId(id);
  };

  const handleView = (id, fullName, email, jobProfile, joiningDate) => {
    setModalTitle("View Details");
    setModalContent({ fullName, email, jobProfile, joiningDate });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditedItemId(null);
  };

  const handleSave = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const newData = {
      fullName: modalContent.fullName,
      email: modalContent.email,
      jobProfile: modalContent.jobProfile,
      joiningDate: currentDate,
    };
    try {
      if (editedItemId !== null) {
        await updateDoc(doc(usersCollectionRef, editedItemId), newData);
        const updatedData = data.map((item) =>
          item.id === editedItemId ? { ...item, ...newData } : item
        );
        setData(updatedData);
      } else {
        const docRef = await addDoc(usersCollectionRef, newData);
        setData([...data, { id: docRef.id, ...newData }]);
      }
    } catch (error) {
      console.error("Error saving data: ", error);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(usersCollectionRef, deleteItemId));
      setData(data.filter((item) => item.id !== deleteItemId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    setDeleteConfirmationOpen(false);
  };

  const columns = [
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "jobProfile", headerName: "Job Profile", width: 200 },
    { field: "joiningDate", headerName: "Joining Date", width: 200 },
    {
      field: "optionsForCURD",
      headerName: "View/Edit/Delete",
      width: 300,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton
            style={{ marginRight: 16 }}
            aria-label="view"
            onClick={() =>
              handleView(
                params.row.id,
                params.row.fullName,
                params.row.email,
                params.row.jobProfile,
                params.row.joiningDate
              )
            }
          >
            <VisibilityIcon />
          </IconButton>
          {checkAccess(params.row.jobProfile) && (
            <React.Fragment>
              <IconButton
                style={{ marginRight: 16 }}
                aria-label="edit"
                onClick={() =>
                  handleEdit(
                    params.row.id,
                    params.row.fullName,
                    params.row.email,
                    params.row.jobProfile,
                    params.row.joiningDate
                  )
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          )}
        </React.Fragment>
      ),
    },
  ];

  const checkAccess = (jobProfile) => {
    // Match the job profile with the roles fetched from the roles page
    const rolePermission = rolePermissions[jobProfile];

    if (rolePermission) {
      // Check if the role has permissions for edit and delete
      return rolePermission.deleteAccess && rolePermission.editAccess;
    }

    return false;
  };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Button
        sx={{
          alignSelf: "flex-end",
          backgroundColor: "#fa2520",
          color: "#fff",
          fontWeight: "bold",
          mb: "15px",
          "&:hover": {
            backgroundColor: "#ff7200",
          },
        }}
        onClick={handleAddNew}
      >
        {" "}
        + ADD NEW USER
      </Button>
      <Box sx={{height:"100vh"}}>
        <Typography sx={{fontWeight:"bold",fontSize:"30px",textAlign:"start",mr:"100px"}}>
          Users Data
        </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
      </Box>
      

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            width: "calc(100% - 32px)",
            maxHeight: "calc(100% - 32px)",
          },
        }}
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="fullName"
            label="Full Name"
            type="text"
            fullWidth
            value={modalContent.fullName}
            onChange={(e) =>
              setModalContent({ ...modalContent, fullName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={modalContent.email}
            onChange={(e) =>
              setModalContent({ ...modalContent, email: e.target.value })
            }
          />
          <InputLabel htmlFor="jobProfile">Job Profile</InputLabel>
          <Select
            margin="dense"
            id="jobProfile"
            fullWidth
            value={modalContent.jobProfile}
            onChange={(e) =>
              setModalContent({ ...modalContent, jobProfile: e.target.value })
            }
          >
            {jobProfiles.map((profile, index) => (
              <MenuItem key={index} value={profile}>
                {profile}
              </MenuItem>
            ))}
          </Select>
          <InputLabel htmlFor="joiningDate">Joining Date</InputLabel>
          <TextField
            margin="dense"
            id="joiningDate"
            type="date"
            fullWidth
            value={modalContent.joiningDate}
            onChange={(e) =>
              setModalContent({ ...modalContent, joiningDate: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          {modalTitle !== "View Details" && (
            <Button onClick={handleSave}>Save</Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataGridDemo;
