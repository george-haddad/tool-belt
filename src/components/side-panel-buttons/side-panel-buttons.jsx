// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from './side-panel-buttons-styles';

type Props = {
  classes: any,
  buttonNames: Array<string>,
};

type State = {
  justify: string,
  alignItems: string,
};

class SidePanelButtons extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      justify: 'center',
      alignItems: 'flex-start',
    };
  }

  render() {
    const { classes, buttonNames } = this.props;
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
        {buttonNames &&
          buttonNames.map(buttonName => (
            <Button
              variant="outlined"
              className={classes.button}
              key={buttonName}
            >
              {buttonName}
            </Button>
          ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(SidePanelButtons);
