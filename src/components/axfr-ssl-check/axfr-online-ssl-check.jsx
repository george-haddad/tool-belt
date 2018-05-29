// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormGroup } from '@material-ui/core';
import superagent from 'superagent';

import styles from './axfr-online-ssl-check-styles';

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

class AxfrOnlineSslCheck extends Component<Props, State> {
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

  onKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleButtonClick();
    }
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    this.handleButtonClick();
  };

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
                error: false,
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
        <Typography variant="title" align="left">
          SSL Online Check
        </Typography>
        <FormControl className={classes.margin}>
          <TextField
            id="domain"
            label="Domain"
            error={error}
            className={classes.textField}
            value={domain}
            onChange={event => this.handleDomainChange(event)}
            margin="normal"
            onSubmit={this.onSubmit}
            onKeyDown={this.onKeyDown}
          />
        </FormControl>

        <div>
          <FormControl>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={heartbleed}
                    value="Heartbleed"
                    color="secondary"
                  />
                }
                label="Heartbleed"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={ccs} value="CCS" color="secondary" />
                }
                label="CCS"
              />
            </FormGroup>
          </FormControl>
        </div>
        <br />
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={this.handleButtonClick}
        >
          Submit
        </Button>

        {loading && (
          <div className={classes.root}>
            <LinearProgress color="primary" />
          </div>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(AxfrOnlineSslCheck);
