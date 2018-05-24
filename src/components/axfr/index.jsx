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

type State = {
  direction: string,
  justify: string,
  alignItems: string,
};

class AxfrPanel extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'column',
      justify: 'center',
      alignItems: 'flex-start',
    };
  }

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={32}
          xs={12}
          alignItems={alignItems}
          direction={direction}
          justify={justify}
        >
          <Grid item>
            <AxfrCheck />
          </Grid>
          <Grid item>
            <SslCheck />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AxfrPanel);
