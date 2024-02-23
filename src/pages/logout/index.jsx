import React, { useState } from "react";
import Layout from "../../layout";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { userLogout } from "../../services/ApiServices";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }
    setIsLoggingOut(true);

    try {
      await userLogout(navigate);

    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false); 
    }
  };

  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Are you sure you want to logout?</h2>
        <Button
          variant="contained"
          onClick={handleLogout}
          color="primary"
          disabled={isLoggingOut} 
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </Layout>
  );
};

export default Index;
