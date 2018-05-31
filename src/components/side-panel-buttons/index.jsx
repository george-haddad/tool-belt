// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import styles from './styles';

type Props = {
  classes: any,
  buttonData: Array<{
    name: string,
    route: string,
  }>,
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
    const { classes, buttonData } = this.props;
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
        {buttonData &&
          buttonData.map(buttonDatum => (
            <Link to={buttonDatum.route} key={buttonDatum.name}>
              <Button
                variant="outlined"
                className={classes.button}
                key={buttonDatum.name}
              >
                {buttonDatum.name}
              </Button>
            </Link>
          ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(SidePanelButtons);
