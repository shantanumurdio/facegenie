import React, { useState } from "react";
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
  DialogContentText,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { firebasedb } from "../../../firebase/firebase";

const DataGridDemo = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [editedItemId, setEditedItemId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleteAccess, setDeleteAccess] = useState(false);
  const [editAccess, setEditAccess] = useState(false);

  const usersCollectionRef = collection(firebasedb, "roles");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(usersCollectionRef);
        const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleAddNew = () => {
    setModalTitle("Add New Role");
    setModalContent("");
    setDeleteAccess(false);
    setEditAccess(false);
    setModalOpen(true);
  };

  const handleEdit = (id, currentName, deleteAccess, editAccess) => {
    setModalTitle("Edit Role");
    setModalContent(currentName);
    setDeleteAccess(deleteAccess);
    setEditAccess(editAccess);
    setModalOpen(true);
    setEditedItemId(id);
  };

  const handleView = (id, roles) => {
    setModalTitle("View Details");
    setModalContent(
      `Role: ${roles}\nUpdated At: ${
        data.find((item) => item.id === id)?.updatedAt
      }`
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditedItemId(null);
  };

  const handleSave = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const newData = {
      roles: modalContent,
      updatedAt: currentDate,
      deleteAccess,
      editAccess,
    };

    try {
      if (editedItemId !== null) {
        await updateDoc(doc(usersCollectionRef, editedItemId), newData);
        const updatedData = data.map(item =>
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

  const handleDelete = async (id) => {
    setDeleteDialogOpen(true);
    setEditedItemId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(usersCollectionRef, editedItemId));
      setData(data.filter(item => item.id !== editedItemId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    setDeleteDialogOpen(false);
  };

  const columns = [
    { field: "roles", headerName: "Role", width: 300 },
    { field: "updatedAt", headerName: "Updated At", width: 300 },
    {
      field: "optionsForCURD",
      headerName: "View/Edit/Delete",
      width: 400,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton
            style={{ marginRight: 16 }}
            aria-label="view"
            onClick={() => handleView(params.row.id, params.row.roles)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            style={{ marginRight: 16 }}
            aria-label="edit"
            onClick={() => handleEdit(params.row.id, params.row.roles, params.row.deleteAccess, params.row.editAccess, params.row.uploadVideosAccess)}
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
      ),
    },
  ];

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
        + ADD NEW ROLE
      </Button>
      <Box sx={{height:"100vh"}}>
      <Typography sx={{fontWeight:"bold",fontSize:"30px",textAlign:"start",mr:"100px"}}>
          Roles Data
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
            id="name"
            label="Role"
            type="text"
            fullWidth
            value={modalContent}
            multiline
            onChange={(e) => setModalContent(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={editAccess} onChange={(e) => setEditAccess(e.target.checked)} />}
            label="Access to Edit"
          />
          <FormControlLabel
            control={<Checkbox checked={deleteAccess} onChange={(e) => setDeleteAccess(e.target.checked)} />}
            label="Access to Delete"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          {modalTitle !== "View Details" && (
            <Button onClick={handleSave}>Save</Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataGridDemo;
