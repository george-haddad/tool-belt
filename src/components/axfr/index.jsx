// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import superagent from 'superagent';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing.unit,
  },
});

type Props = {
  classes: any,
};

type State = {
  axfr: {
    onlinecheck: {
      domain: string,
      affectedDns: ?Array<string>,
      error: boolean,
    },
  },
};

class AxfrPanel extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      axfr: {
        onlinecheck: {
          domain: '',
          affectedDns: undefined,
          error: false,
        },
      },
    };
  }

  handleDomainChange = (event: any) => {
    this.setState({
      axfr: {
        onlinecheck: {
          domain: event.target.value,
          affectedDns: this.state.axfr.onlinecheck.affectedDns,
          error: this.state.axfr.onlinecheck.error,
        },
      },
    });
  };

  axfrOnlineCheck = () => {
    const { domain } = this.state.axfr.onlinecheck;
    if (domain.length > 0) {
      superagent
        .get(`//api.axfrcheck.com/api/check/axfr/${domain}`)
        .set('Accept', 'application/json')
        // .set('Access-Control-Allow-Origin', '*')
        .then(res => {
          if (res.body.data[0].affected_dns) {
            const affectedDns = res.body.data[0].affected_dns;
            this.setState({
              axfr: {
                onlinecheck: {
                  domain: this.state.axfr.onlinecheck.domain,
                  affectedDns,
                  error: this.state.axfr.onlinecheck.error,
                },
              },
            });
          }
        })
        .catch(() => {
          this.setState({
            axfr: {
              onlinecheck: {
                domain: this.state.axfr.onlinecheck.domain,
                affectedDns: this.state.axfr.onlinecheck.affectedDns,
                error: true,
              },
            },
          });
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { axfr } = this.state;

    const SuccessLogo = () => {
      if (axfr.onlinecheck.affectedDns && axfr.onlinecheck.domain.length > 0) {
        if (axfr.onlinecheck.affectedDns.length > 0) {
          return <ErrorIcon className={classes.icon} color="error" />;
        }

        return <CheckIcon className={classes.icon} color="primary" />;
      }
      return <div />;
    };

    return (
      <div>
        <div>
          <FormControl className={classes.margin}>
            <TextField
              id="domain"
              label="Domain"
              error={axfr.onlinecheck.error}
              className={classes.textField}
              value={axfr.onlinecheck.domain}
              onChange={event => this.handleDomainChange(event)}
              margin="normal"
            />
          </FormControl>
          <Button
            variant="outlined"
            className={classes.button}
            color="primary"
            size="small"
            onClick={this.axfrOnlineCheck}
          >
            Go
          </Button>
          <SuccessLogo />
        </div>
        <div className={classes.root}>
          <List component="AffectedDnsList">
            {axfr.onlinecheck.affectedDns &&
              axfr.onlinecheck.affectedDns.map(domainName => (
                <ListItem button key={domainName}>
                  <ListItemText primary={domainName} />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AxfrPanel);
