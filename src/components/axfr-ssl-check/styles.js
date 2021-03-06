// @flow

const styles = (theme: any) => ({
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
  margin: {
    margin: theme.spacing.unit,
  },
});

export default styles;
