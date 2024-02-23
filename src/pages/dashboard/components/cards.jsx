import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

export default function ImgMediaCard({title, count}) {
  return (
    <Card >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: "" , textAlign:"start"}}>
          {title}
        </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ w: "50px", textAlign: "end", m:"10px" , fontSize: "60px", fontWeight: "bold" }}
          >
            {count}
          </Typography>
      </CardContent>
    </Card>
  );
}
