// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AxfrOnlineCheck from '../../components/axfr-check';
import AxfrOnlineSslCheck from '../../components/axfr-ssl-check';
import AxfrOnlineDomainCheck from '../../components/axfr-domain-check';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

type Props = {
  classes: any,
};

type State = {
  justify: string,
  alignItems: string,
};

class AxfrPanel extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      justify: 'flex-start',
      alignItems: 'flex-start',
    };
  }

  render() {
    const { classes } = this.props;
    const { alignItems, justify } = this.state;

    return (
      <div className={classes.root}>
        <Grid
          item
          container
          spacing={32}
          xs={12}
          alignItems={alignItems}
          justify={justify}
        >
          <Grid item>
            <AxfrOnlineCheck />
          </Grid>
          <Grid item>
            <AxfrOnlineSslCheck />
          </Grid>
          <Grid item>
            <AxfrOnlineDomainCheck />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AxfrPanel);
