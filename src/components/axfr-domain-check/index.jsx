// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

import API from '../../api';
import styles from './styles';

type Props = {
  classes: any,
};

type State = {
  loading: boolean,
  domain: string,
  data: ?{
    affected_domain_count: number,
    created_at: string,
    domain: {
      affected_dns: Array<string>,
      affected_domain: Array<string>,
      whois: {
        city: ?string,
        country: ?string,
      },
    },
  },
  error: boolean,
};

class AxfrOnlineDomainCheck extends Component<Props, State> {
  state = {
    loading: false,
    domain: '',
    error: false,
    data: undefined,
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

  handleButtonClick = () => {
    const { domain } = this.state;

    if (domain.length > 0) {
      this.setState({ loading: true }, () => {
        API.get(`axfr/domain/${domain}`)
          .then(res => {
            if (res.data) {
              const { data } = res.data;

              this.setState({
                loading: false,
                domain: this.state.domain,
                error: false,
                data,
              });
            }
          })
          .catch(() => {
            this.setState({
              loading: false,
              domain: this.state.domain,
              error: true,
            });
          });
      });
    }
  };

  handleDomainChange = (event: any) => {
    this.setState({
      domain: event.target.value,
      error: this.state.error,
      data: this.state.data,
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, domain, error, data } = this.state;

    return (
      <Paper className={classes.paper}>
        <Typography variant="title" align="left">
          Online Domain Check
        </Typography>

        <form>
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
        </form>

        <div>
          <br />
          <Typography variant="subheading" align="left">
            Created at:{data &&
              ` ${moment(Date.parse(data.created_at)).format('YYYY-MM-DD')}`}
          </Typography>

          <Typography variant="subheading" align="left">
            Affected DNS
          </Typography>
          <List className={classes.listRoot} subheader={<li />}>
            {data &&
              data.domain.affected_dns.map(dnsName => (
                <ListItem key={dnsName}>
                  <ListItemText primary={dnsName} />
                </ListItem>
              ))}
          </List>

          <Typography variant="subheading" align="left">
            Affected Domains
          </Typography>
          <List className={classes.listRoot} subheader={<li />}>
            {data &&
              data.domain.affected_domain.map(domainName => (
                <ListItem key={domainName}>
                  <ListItemText primary={domainName} />
                </ListItem>
              ))}
          </List>
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

export default withStyles(styles)(AxfrOnlineDomainCheck);
