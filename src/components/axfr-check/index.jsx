// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import API from '../../api';
import styles from './styles';
import CircleLoadingButton from '../circle-loading-button';

type Props = {
  classes: $Call<typeof styles>,
};

type State = {
  loading: boolean,
  axfrStatus: 'start' | 'clean' | 'vulnrable',
  affectedDns: ?Array<string>,
  domain: string,
  error: boolean,
};

class AxfrOnlineCheck extends Component<Props, State> {
  state = {
    loading: false,
    axfrStatus: 'start',
    domain: '',
    affectedDns: undefined,
    error: false,
  };

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
      affectedDns: this.state.affectedDns,
      error: this.state.error,
    });
  };

  handleButtonClick = () => {
    const { domain } = this.state;

    if (domain.length > 0) {
      this.setState({ loading: true, axfrStatus: 'start' }, () => {
        API.get(`axfr/check/${domain}`)
          .then(res => {
            if (res.data.affected_dns) {
              const affectedDns = res.data.affected_dns;

              let axfrStatus;
              if (affectedDns.length === 0) {
                axfrStatus = 'clean';
              } else {
                axfrStatus = 'vulnrable';
              }

              this.setState({
                loading: false,
                domain: this.state.domain,
                axfrStatus,
                affectedDns,
                error: this.state.error,
              });
            }
          })
          .catch(() => {
            this.setState({
              loading: false,
              domain: this.state.domain,
              affectedDns: this.state.affectedDns,
              error: true,
            });
          });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { domain, affectedDns, error, loading, axfrStatus } = this.state;

    return (
      <Paper className={classes.paper}>
        <Typography variant="title" align="left">
          AXFR Online Check
        </Typography>
        <div className={classes.buttonRoot}>
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

          <CircleLoadingButton
            loading={loading}
            icon={axfrStatus}
            handleButtonClick={this.handleButtonClick}
          />
        </div>

        <div className={classes.root}>
          <List>
            {affectedDns &&
              affectedDns.map(domainName => (
                <ListItem button key={domainName}>
                  <ListItemText primary={domainName} />
                </ListItem>
              ))}
          </List>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(AxfrOnlineCheck);
