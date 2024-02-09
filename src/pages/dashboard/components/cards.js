import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../../../assets/resoluteai_logo.png";

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        alt="Green Iguana"
        image={Image}
        style={{ height: 140, objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          AI Testimonial
        </Typography>
        <Typography variant="body2" color="text.secondary">
          AI cameras revolutionize surveillance with advanced algorithms,
          enabling real-time object recognition and predictive analytics for
          enhanced security and efficient image processing.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
