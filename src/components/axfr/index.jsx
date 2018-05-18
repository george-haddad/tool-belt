// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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
});

type Props = {
  classes: any,
};

type State = {
  domain: string,
};

class AxfrPanel extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
    };
  }

  handleDomainChange = (event: any) => {
    this.setState({
      domain: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { domain } = this.state;

    return (
      <div>
        <FormControl className={classes.margin}>
          <TextField
            id="domain"
            label="Domain"
            className={classes.textField}
            value={domain}
            onChange={event => this.handleDomainChange(event)}
            margin="normal"
          />
        </FormControl>
        <br />
        <Button variant="outlined" className={classes.button} color="primary">
          Go
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AxfrPanel);
