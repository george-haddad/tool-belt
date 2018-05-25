// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

type Props = {
  classes: any,
};

type State = {
  justify: string,
  alignItems: string,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class SidePanel extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      justify: 'center',
      alignItems: 'flex-start',
    };
  }

  render() {
    const { classes } = this.props;
    const { alignItems, justify } = this.state;

    return (
      <Grid
        item
        container
        className={classes.root}
        xs={11}
        spacing={8}
        alignItems={alignItems}
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
    );
  }
}

export default withStyles(styles)(SidePanel);
