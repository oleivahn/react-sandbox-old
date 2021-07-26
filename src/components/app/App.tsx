import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { adminRoutes } from "./admin-routes";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import styles from "./App-styles";
//My Components
import AdminMenu from "../../pages/home-page/admin-menu/admin-menu";
import Info from "../info/info";
import DefaultComponent from "../default-component/default-component";
import Card from "../card/card";
import Input from "../input-test/input";
import Dialog from "../dialog/dialog-modal";

interface IProps extends WithStyles<typeof styles> {}

const App = (props: IProps) => {
  const { classes } = props;

  return (
    <Router>
      <Switch>
        <div className={classes.main}>
          <div>
            <AdminMenu adminMenu={adminRoutes} />
          </div>
          <div className={classes.rightContainer}>
            <Route path="/default" component={DefaultComponent} />
            <Route path="/info" component={Info} />
            <Route path="/card" component={Card} />
            <Route path="/input" component={Input} />
            <Route path="/dialog" component={Dialog} />
          </div>
        </div>
      </Switch>
    </Router>
  );
};

export default withStyles(styles)(App);
