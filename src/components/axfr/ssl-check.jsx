// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

type Props = {
  classes: any,
};

class SslCheck extends Component<Props, {}> {
  placeHolder = () => {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div>hello</div>
      </Paper>
    );
  };

  render() {
    return this.placeHolder();
  }
}

export default withStyles(styles)(SslCheck);
