import React from "react";
import "./card.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const disableCopyPaste = (event: any) => {
  event.preventDefault();
};

const CardComponent = ({ post, handleDelete, handleEdit }: any) => {
  const db_date = post.createdAt.split("-");
  const day = db_date[2];
  const date = `${day[0]}${day[1]}/${db_date[1]}/${db_date[0]}`;

  return (
    <div onCopy={disableCopyPaste} onPaste={disableCopyPaste}>
      <div className="card_container">
        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardContent>
            <div className="card_date">{date}</div>
            <CardContent className="card_content">
              <Typography gutterBottom variant="h6" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.description}
              </Typography>
            </CardContent>
            <div className="card_actions">
              <EditIcon onClick={handleEdit} />
              <DeleteIcon onClick={handleDelete} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardComponent;
