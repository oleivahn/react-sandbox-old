import React from "react";

import { NavLink } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import styles from "./admin-menu-styles";
import IAdminMenu from "./types/admin-menu";

interface IProps extends WithStyles<typeof styles> {
  adminMenu: IAdminMenu[];
}

const AdminMenu = (props: IProps) => {
  const { classes } = props;

  const menuItems = props.adminMenu.map((item, index) => {
    return (
      <li key={index}>
        <NavLink
          to={`/${item.urlPath}`}
          // className={classes.navMain}
          activeClassName={classes.selected}
        >
          {item.name}
        </NavLink>
      </li>
    );
  });
  return (
    <ul className={classes.navMain}>
      <li className={classes.first}>Navigation</li>
      {menuItems}
    </ul>
  );
};

export default withStyles(styles)(AdminMenu);
