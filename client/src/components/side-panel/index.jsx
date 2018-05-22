// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
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
            spacing={8}
            className={classes.demo}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
          >
            <Button variant="outlined" className={classes.button}>
              AXFR
            </Button>

            <Button disabled variant="outlined" className={classes.button}>
              Space-X
            </Button>

            <Button disabled variant="outlined" className={classes.button}>
              About
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SidePanel);
