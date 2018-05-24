// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AxfrCheck from './axrf-check';
import SslCheck from './ssl-check';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

type Props = {
  classes: any,
};

type State = {};

class AxfrPanel extends Component<Props, State> {
  gridPanel = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <AxfrCheck />
          </Grid>
          <Grid item>
            <SslCheck />
          </Grid>
        </Grid>
      </div>
    );
  };

  render() {
    return this.gridPanel();
  }
}

export default withStyles(styles)(AxfrPanel);
