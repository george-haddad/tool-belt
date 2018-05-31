// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StartIcon from '@material-ui/icons/KeyboardArrowRight';
import ErrorIcon from '@material-ui/icons/PriorityHigh';
import CheckIcon from '@material-ui/icons/Check';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

import styles from './styles';

type Props = {
  classes: any,
  loading: boolean,
  icon: 'start' | 'clean' | 'vulnrable',
  handleButtonClick: Function,
};

class CircleLoadingButton extends Component<Props, {}> {
  renderButtonIcon = () => {
    const { icon, loading } = this.props;

    if (loading) {
      return <HourGlassIcon />;
    }

    switch (icon) {
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
    const { classes, loading, icon, handleButtonClick } = this.props;
    const buttonClassname = classNames({
      [classes.buttonDefault]: icon === 'start',
      [classes.buttonClean]: icon === 'clean',
      [classes.buttonVulnrable]: icon === 'vulnrable',
    });

    return (
      <div className={classes.wrapper}>
        <Button
          variant="fab"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {this.renderButtonIcon()}
        </Button>

        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CircleLoadingButton);
