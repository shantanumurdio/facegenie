Users.jsx

import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, Typography, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getFirestore, collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import AddNewUser from "./AddNewUser";
import EditIcon from '@mui/icons-material/Edit';
import ReadIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { FirebaseError } from "firebase/app";

const Users = ({ setSelectedLink, link }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // State to hold roles data
  const [employeeUsers, setEmployeeUsers] = useState([]);
  const [nonEmployeeUsers, setNonEmployeeUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    page: 0,
  });
  const [editingUser, setEditingUser] = useState(null);
  const [selectedTable, setSelectedTable] = useState('Employee'); // Default to show all users

  useEffect(() => {
    const fetchUsersFromFirestore = async () => {
      const firestore = getFirestore();
      const usersCollection = collection(firestore, "users");
      const unsubscribeUsers = onSnapshot(usersCollection, (snapshot) => {
        const usersData = snapshot.docs.map((doc, index) => ({
          id: index + 1,
          docId: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      });

      return () => unsubscribeUsers();
    };

    const fetchRolesFromFirestore = async () => {
      const firestore = getFirestore();
      const rolesCollection = collection(firestore, "roles");
      const unsubscribeRoles = onSnapshot(rolesCollection, (snapshot) => {
        const rolesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoles(rolesData);
      });

      return () => unsubscribeRoles();
    };

    fetchUsersFromFirestore();
    fetchRolesFromFirestore();

    setSelectedLink(link);
  }, [link, setSelectedLink]);

  useEffect(() => {
    const employees = users.filter(user => user.role === 'Employee');
    setEmployeeUsers(employees);

    const nonEmployees = users.filter(user => user.role === 'Non-Employee');
    setNonEmployeeUsers(nonEmployees);

    const admins = users.filter(user => user.role === 'Admin');
    setAdminUsers(admins);
  }, [users]);

  const handleOpenAddUserModal = (user) => {
    setEditingUser(user);
    console.log("USERS", user)
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setEditingUser(null);
    setOpenAddUserModal(false);
  };

  const handleEdit = (row) => {
    handleOpenAddUserModal(row);
  };

  const handleRead = (row) => {
    console.log("Read user:", row);
  };

  const handleDelete = async (row) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (confirmation) {
      const firestore = getFirestore();
      await deleteDoc(doc(firestore, "users", row.docId));
      console.log("Deleted user:", row);
    }
  };

  const handleUpdate = async (updatedUser) => {
    const firestore = getFirestore();
    await updateDoc(doc(firestore, "users", updatedUser.docId), updatedUser);
    console.log("Updated user:", updatedUser);
    handleCloseAddUserModal();
  };

  const handleEmployeeClick = () => {
    setSelectedTable('Employee');
  };

  const handleAdminClick = () => {
    setSelectedTable('Admin');
  };

  const handleNonEmployeeClick = () => {
    setSelectedTable('Non-Employee');
  };

  let displayedUsers = users;
  if (selectedTable === 'Employee') {
    displayedUsers = employeeUsers;
  } else if (selectedTable === 'Admin') {
    displayedUsers = adminUsers;
  } else if (selectedTable === 'Non-Employee') {
    displayedUsers = nonEmployeeUsers;
  }

  const renderDeleteButton = (user) => {
    const role = roles.find(role => role.role === user.role); // Find role based on user's role
    const deleteDisabled = !role || !role.deleteAccess; // Disable delete if role or delete access is not found
    return (
      <Button
        onClick={() => handleDelete(user)}
        disabled={deleteDisabled}
      >
        <DeleteIcon />
      </Button>
    );
  };
  
  const renderUpdateButton = (user) => {
    const role = roles.find(role => role.role === user.role); // Find role based on user's role
    const updateDisabled = !role || !role.updateAccess; // Disable update if role or update access is not found
    return (
      <Button
        onClick={() => handleEdit(user)}
        disabled={updateDisabled}
      >
        <EditIcon />
      </Button>
    );
  };

  const columns = [
    {
      field: "profileImage",
      headerName: "Profile",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: 43, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email ID", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      editable: true,
    },
    {
      field: "active",
      headerName: "Active",
      width: 100,
      type: "boolean",
      editable: true,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) => {
            params.api.updateRows([
              { ...params.row, active: event.target.checked },
            ]);
          }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      valueFormatter: (params) => {
        const timestamp = params.value.toDate();
        const formattedDateTime = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(timestamp);
        return formattedDateTime;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <div>
          {renderUpdateButton(params.row)}
          {renderDeleteButton(params.row)}
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom="16px">
        <Typography variant="h5" component="h5" flexGrow={1}>
          Manage Users
        </Typography>
        <Button
          onClick={() => handleOpenAddUserModal(null)}
          sx={{
            bgcolor: "rgb(25,118,210)",
            color: "white",
            border: "0",
            height: "10px",
            padding:'14px',
            display: "flex",
            justifyContent:'flex-end',
            alignItems: "center",
            "&:hover": {
              bgcolor: "skyblue",
              color: "black",
            },
          }}
        >
          + Add User
        </Button>
      </Stack>
      <Stack direction="row">
        <Button variant="outlined" onClick={handleEmployeeClick}>
          Employee
        </Button>
        <Button variant="outlined" onClick={handleAdminClick}>
          Admin
        </Button>
        <Button variant="outlined" onClick={handleNonEmployeeClick}>
          Non-Employee
        </Button>
      </Stack>
      <DataGrid
        columns={columns}
        rows={displayedUsers}
        pagination={pagination}
        onPageChange={(newPage) => setPagination({ ...pagination, page: newPage })}
        pageSize={pagination.pageSize}
        rowCount={displayedUsers.length}
        rowHeight={40}
        rowsPerPageOptions={[5, 10, 20]}
        getRowSpacing={params => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5
        })}
        sx={{ flexGrow: 1 }}
      />
      <AddNewUser
        open={openAddUserModal}
        handleClose={handleCloseAddUserModal}
        handleUpdate={handleUpdate}
        user={editingUser}
      />
    </Box>
  );
};

export default Users;










// Addnewuser.jsx
// import React, { useState, useEffect } from 'react';
// import { Modal, Box, TextField, Button, Grid, Checkbox, MenuItem } from '@mui/material';
// import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';

// const AddNewUser = ({ open, handleClose, handleUpdate, user }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const [profileImage, setProfileImage] = useState('');
//   const [active, setActive] = useState(false); // State for active checkbox

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username || '');
//       setEmail(user.email || '');
//       setRole(user.role || '');
//       setProfileImage(user.profileImage || '');
//       setActive(user.active || false);
//     }
//   }, [user]);

//   const db = getFirestore();

//   const saveDataToFirestore = async () => {
//     try {
//       if (user) {
//         // Update existing user
//         await updateDoc(doc(db, 'users', user.docId), {
//           username,
//           email,
//           role,
//           profileImage,
//           active,
//         });
//         console.log('Document updated in Database with ID: ', user.docId);
//         alert('User updated successfully');
//       } else {
//         // Add new user
//         const docRef = await addDoc(collection(db, 'users'), {
//           username,
//           email,
//           role,
//           profileImage,
//           active,
//           createdAt: new Date(), // Set createdAt to current timestamp
//         });
//         console.log('Document written to Database with ID: ', docRef.id);
//         alert('User added successfully');
//       }
//       setUsername('');
//       setEmail('');
//       setRole('');
//       setProfileImage('');
//       setActive(false);
//       handleClose(); // Close the modal after adding/updating user
//     } catch (error) {
//       console.error('Error saving user data: ', error);
//       alert('Failed to save user data');
//       handleClose();
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <h2>{user ? 'Edit User' : 'Add User'}</h2>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               select
//               label="Role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               fullWidth
//               margin="normal"
//             >
//               <MenuItem value="Employee">Employee</MenuItem>
//               <MenuItem value="Non-Employee">Non-Employee</MenuItem>
//               <MenuItem value="Admin">Admin</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Profile Image URL"
//               value={profileImage}
//               onChange={(e) => setProfileImage(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Checkbox
//               checked={active}
//               onChange={(e) => setActive(e.target.checked)}
//             />
//             Active
//           </Grid>
//           <Grid item xs={12} sx={{ textAlign: 'center' }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={saveDataToFirestore}
//               sx={{ bgcolor: 'rgb(3,21,37)', color: 'white', borderRadius: 0 }}
//             >
//               {user ? 'Update' : 'Add'}
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// };

// export default AddNewUser;





