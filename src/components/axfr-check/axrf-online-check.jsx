// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import StartIcon from '@material-ui/icons/KeyboardArrowRight';
import ErrorIcon from '@material-ui/icons/PriorityHigh';
import CheckIcon from '@material-ui/icons/Check';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import classNames from 'classnames';
import superagent from 'superagent';

import styles from './axfr-online-check-styles';

type Props = {
  classes: any,
};

type State = {
  loading: boolean,
  axfrStatus: 'start' | 'clean' | 'vulnrable',
  affectedDns: ?Array<string>,
  domain: string,
  error: boolean,
};

class AxfrOnlineCheck extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      axfrStatus: 'start',
      domain: '',
      affectedDns: undefined,
      error: false,
    };
  }

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
        superagent
          .get(
            `https://thawing-meadow-89074.herokuapp.com/axfr/check/${domain}`,
          )
          .set('Accept', 'application/vnd.tool-belt+json; version=1.0')
          .then(res => {
            if (res.body.affected_dns) {
              const affectedDns = res.body.affected_dns;

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

  renderAxfrStatus = () => {
    const { axfrStatus, loading } = this.state;

    if (loading) {
      return <HourGlassIcon />;
    }

    switch (axfrStatus) {
      case 'start': {
        return <StartIcon />;
      }

      case 'clean': {
        return <CheckIcon />;
      }

      case 'vulnrable': {
        return <ErrorIcon />;
      }

      default: {
        return <StartIcon />;
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { domain, affectedDns, error, loading, axfrStatus } = this.state;
    const buttonClassname = classNames({
      [classes.buttonDefault]: axfrStatus === 'start',
      [classes.buttonClean]: axfrStatus === 'clean',
      [classes.buttonVulnrable]: axfrStatus === 'vulnrable',
    });

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
            />
          </FormControl>
          <div className={classes.wrapper}>
            <Button
              variant="fab"
              className={buttonClassname}
              onClick={this.handleButtonClick}
            >
              {this.renderAxfrStatus()}
            </Button>

            {loading && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </div>
        </div>

        <div className={classes.root}>
          <List component="AffectedDnsList">
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
