// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import superagent from 'superagent';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  progressRoot: {
    flexGrow: 1,
  },
});

type Props = {
  classes: any,
};

type State = {
  loading: boolean,
  domain: string,
  heartbleed: boolean,
  ccs: boolean,
  error: boolean,
};

class SslCheck extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      domain: '',
      heartbleed: false,
      ccs: false,
      error: false,
    };
  }

  handleDomainChange = (event: any) => {
    this.setState({
      domain: event.target.value,
      heartbleed: this.state.heartbleed,
      ccs: this.state.ccs,
      error: this.state.error,
    });
  };

  handleButtonClick = () => {
    const { domain } = this.state;

    if (domain.length > 0) {
      this.setState({ loading: true }, () => {
        superagent
          .get(
            `https://thawing-meadow-89074.herokuapp.com/axfr/check/ssl/${domain}`,
          )
          .set('Accept', 'application/vnd.tool-belt+json; version=1.0')
          .then(res => {
            if (res.body) {
              const { heartbleed, ccs } = res.body;

              this.setState({
                loading: false,
                domain: this.state.domain,
                heartbleed,
                ccs,
                error: this.state.error,
              });
            }
          })
          .catch(() => {
            this.setState({
              loading: false,
              domain: this.state.domain,
              heartbleed: this.state.heartbleed,
              ccs: this.state.ccs,
              error: true,
            });
          });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { loading, domain, heartbleed, ccs, error } = this.state;

    return (
      <Paper className={classes.paper}>
        <FormControl className={classes.margin}>
          <TextField
            id="domain"
            label="Domain"
            error={error}
            className={classes.textField}
            value={domain}
            onChange={event => this.handleDomainChange(event)}
            margin="normal"
          />
        </FormControl>
        <br />

        {loading && (
          <div className={classes.root}>
            <LinearProgress color="primary" />
          </div>
        )}

        <Typography variant="body1" gutterBottom align="left">
          {heartbleed ? 'Heartbleed = true' : 'Heartbleed = false'}
        </Typography>
        <Typography variant="body1" gutterBottom align="left">
          {ccs ? 'CCS = true' : 'CCS = false'}
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={this.handleButtonClick}
        >
          Submit
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(SslCheck);
