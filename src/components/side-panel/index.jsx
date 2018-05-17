// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

type Props = {
  classes: any,
};

type State = {
  direction: string,
  justify: string,
  alignItems: string,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class SidePanel extends Component<Props, State> {
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
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            className={classes.demo}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
          >
            <Grid key="1" item>
              <p>One</p>
            </Grid>
            <Grid key="2" item>
              <p>Two</p>
            </Grid>
            <Grid key="3" item>
              <p>Three</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SidePanel);
