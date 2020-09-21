import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    top: 80,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" align="left">
        Content
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <a href="#film" className={classes.link}>
          <ListItem button>
            <ListItemText primary="List Film" />
          </ListItem>
        </a>
        <a href="#game" className={classes.link}>
          <ListItem button>
            <ListItemText primary="List Game" />
          </ListItem>
        </a>
      </List>
    </div>
  );
};

export default SideBar;
