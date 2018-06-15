
const MuiTheme = {
    breakpoints: {
      keys: [
        0: "xs",
        1: "sm",
        2: "md",
        3: "lg",
        4: "xl"
      ],
      values: {
        xs: 0,
        sm: 450,
        md: 670,
        lg: 950,
        xl: 1400
      }
    },
    typography: {
      // fontWeightLight: 100,
      // fontWeightRegular: 300,
      // fontWeightMedium: 500,
      fontFamily: 'Montserrat',
      display4: {
        fontSize: '5rem'
      },
      display3: {
        fontSize: '3rem'
      },
      display2: {
        fontSize: '2.4rem'
      },
      display1: {
        fontSize: '2rem'
      },
      button: {
        textTransform: 'none',
        fontWeight: 500
      }
    },
    transitions: {
      duration: {
        enteringScreen: 400,
        leavingScreen: 400
      }
    },
    palette: {
      // type: 'dark',
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
        // paper: '#0a0a0a',
        // default: '#0a0a0a'
      },
      text: {
        primary: "#19191b",
        secondary: "#212125",
        // disabled: "rgba(255, 255, 255, 0.3)",
        // hint: "rgba(255, 255, 255, 0.3)",
        // icon: "rgba(255, 255, 255, 0.3)"
      }
    },
    overrides: {
      MuiButton: {
        root: {
          fontWeight: 500
        }
      },
      MuiFormGroup: {
        root: {
          margin: '0px'
        }
      }, 
      MuiToolbar: {
        root: {
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }
      },
      MuiInputLabel: {
        root: {
          fontWeight: 300,
          opacity: 0.8
        },
        shrink: {
          color: '#42A5F5'
        }
      },
      MuiInput: {
        input: {
          padding: '3px 0',
          color: '#000',
          borderRadius: '3px',
          fontSize: '1em',
          fontWeight: 300,
          height: '1.1em'
        }
      },
      MuiFormHelperText:{
        root: {
          marginTop: '4px'
        },
        marginDense: {
          minHeight: 0
        }
      },
      MuiFormControl: {
        root: {
          margin: '4px 0'
        }
      },
      MuiTabScrollButton: {
        root: {
          flexBasis: '30px',
          color: '#42A5F5'
        }
      },
      MuiTab: {
        root: {
          minWidth: '60px',
          textTransform: 'none'
        },
        labelContainer: {
          paddingLeft: '6px',
          paddingRight: '6px'
        }
      },
      MuiDrawer: {
        paper: {
          minWidth: '250px',
          justifyContent: 'center'
        }
      }
    }
  }
  
  export default MuiTheme