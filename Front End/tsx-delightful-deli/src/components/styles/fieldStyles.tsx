import { makeStyles, Theme } from '@mui/material';

const fieldStyles = makeStyles((theme: Theme) => ({
  dropdownField: {
    marginTop: theme.spacing(2), // Adjust the spacing as needed
    marginBottom: theme.spacing(2),
    display: 'block',
  },
}));

export default fieldStyles;
