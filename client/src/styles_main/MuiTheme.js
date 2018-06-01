import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const MuiTheme = {
      breakpoints: {
        values: {
          sm: 730
        }
      },
      typography: {
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightMedium: 500,
        fontFamily: "Lato",
        button: {
          fontWeight: 300
        }
      },
      palette: {
        type: 'dark',
        primary: {
          light: '#BBDEFB',
          main: '#42A5F5',
          dark: '#1565C0',
        },
        secondary: {
          light: '#E57373',
          main: '#F44336',
          dark: '#C62828',
        },
        background: {
          paper: '#1a1f22',
          default: '#1a1f22'
        },
      },
      overrides: {
        MuiFormGroup: {
          root: {
            margin: '0px'
          }
        },
        MuiInput: {
          root: {
            color: 'inherit'
          }
        },
        MuiRadio: {
          colorSecondary: {
            '&$checked': {
              color: 'lightgreen'
        }
      }
    }
    }
  }
  export default MuiTheme