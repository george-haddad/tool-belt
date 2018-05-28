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
import superagent from 'superagent';
import moment from 'moment';

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
  progressRoot: {
    flexGrow: 1,
  },
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

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
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      domain: '',
      error: false,
      data: undefined,
    };
  }

  handleDomainChange = (event: any) => {
    this.setState({
      domain: event.target.value,
      error: this.state.error,
      data: this.state.data,
    });
  };

  handleButtonClick = () => {
    const { domain } = this.state;

    if (domain.length > 0) {
      this.setState({ loading: true }, () => {
        superagent
          .get(
            `https://thawing-meadow-89074.herokuapp.com/axfr/domain/${domain}`,
          )
          .set('Accept', 'application/vnd.tool-belt+json; version=1.0')
          .then(res => {
            if (res.body) {
              const data = res.body;

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

  render() {
    const { classes } = this.props;
    const { loading, domain, error, data } = this.state;

    return (
      <Paper className={classes.paper}>
        <Typography variant="title" align="left">
          Online Domain Check
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
          />
        </FormControl>

        <div>
          <FormControl>
            <TextField
              id="created-at"
              label="Created at"
              type="date"
              className={classes.textField}
              margin="normal"
              disabled
              InputLabelProps={{
                shrink: true,
              }}
              value={
                data &&
                moment(Date.parse('Tue, 24 May 2016 12:17:42 GMT')).format(
                  'YYYY-MM-DD',
                )
              }
            />
          </FormControl>
          <br />

          <Typography variant="subheading" align="center">
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

          <Typography variant="subheading" align="center">
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
