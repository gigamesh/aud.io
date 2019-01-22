const MuiTheme = {
  breakpoints: {
    keys: {
      0: "xs",
      1: "sm",
      2: "md",
      3: "lg",
      4: "xl"
    },
    values: {
      xs: 0,
      sm: 450,
      md: 670,
      lg: 950,
      xl: 1400
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Montserrat",
    fontWeightRegular: 300,
    display4: {
      fontSize: "5rem"
    },
    display3: {
      fontSize: "3rem"
    },
    display2: {
      fontSize: "2.4rem"
    },
    display1: {
      fontSize: "2rem"
    },
    h5: {
      color: "#333",
      lineHeight: "1em"
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      color: "#333"
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
      light: "#BBDEFB",
      main: "#42A5F5",
      dark: "#1565C0"
    },
    secondary: {
      light: "#E57373",
      main: "#F44336",
      dark: "#C62828"
    },
    background: {},
    text: {
      primary: "#333",
      secondary: "#333"
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
        margin: "0px"
      }
    },
    MuiToolbar: {
      root: {
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        justifyContent: "space-between"
      }
    },
    MuiInputLabel: {
      root: {
        fontWeight: 400,
        opacity: 1
      },
      shrink: {
        color: "#42A5F5"
      }
    },
    MuiDivider: {
      root: {
        width: "70%",
        backgroundColor: "#333",
        opacity: 0.3,
        margin: "0 auto",
        alignSelf: "center"
      }
    },
    MuiInput: {
      input: {
        padding: "3px 0",
        color: "#19191b",
        borderRadius: "3px",
        fontSize: "1em",
        height: "1.1em"
      }
    },
    MuiFormHelperText: {
      root: {
        marginTop: "4px"
      },
      marginDense: {
        minHeight: 0
      }
    },
    MuiFormControl: {
      root: {
        margin: "4px 0"
      }
    },
    MuiTabScrollButton: {
      root: {
        flexBasis: "30px",
        color: "#42A5F5"
      }
    },
    MuiTab: {
      root: {
        minWidth: "60px",
        textTransform: "none"
      },
      labelContainer: {
        paddingLeft: "6px",
        paddingRight: "6px"
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiListItem: {
      root: {
        padding: "0 10px"
      },
      default: {
        paddingTop: "4px",
        paddingBottom: "4px"
      },
      button: {
        "&:hover": {
          backgroundColor: "#BBDEFB !important",
          color: "#1565C0"
        }
      }
    },
    MuiDrawer: {
      paper: {
        minWidth: "250px",
        justifyContent: "center"
      }
    },
    MuiRadio: {
      root: {
        height: "35px"
      }
    },
    MuiFormLabel: {
      root: {
        color: "#444"
      }
    },
    MuiMenuItem: {
      root: {
        color: "#444",
        "&$selected": {
          backgroundColor: "#edf6ff",
          color: "#1565C0"
        }
      }
    }
  }
};

export default MuiTheme;
