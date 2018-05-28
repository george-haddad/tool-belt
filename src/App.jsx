// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SidePanel from './containers/side-panel';
import AxfrPanel from './components/axfr';
import './App.css';

type Props = {
  classes: any,
};

const styles = () => ({
  root: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
});

class App extends Component<Props, {}> {
  mainPanel = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={3} md={1} lg={1} xl={1}>
            <SidePanel buttonNames={['AXFR', 'Space-X', 'About']} />
          </Grid>
          <Grid item xs={12} sm={9} md={10} lg={10} xl={11}>
            <AxfrPanel />
          </Grid>
        </Grid>
      </div>
    );
  };

  render() {
    return this.mainPanel();
  }
}

export default withStyles(styles)(App);
