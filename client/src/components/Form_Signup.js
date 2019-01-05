import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userSignup, clearErrorMsg } from "../store/actions";
import styled from "styled-components";
import WaveformLoader from "./UI/WaveformLoader";
import Input from "@material-ui/core/Input";
import MyFormControl from "./mui/MyFormControl";
import MyFormHelperTextBig from "./mui/MyFormHelperText_Big";
import withWidth from "@material-ui/core/withWidth";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import MyPaper from "./mui/MyPaper";
import Grid from "@material-ui/core/Grid";
import { withFormik, Form } from "formik";
import * as yup from "yup";

const ButtonWrap = styled.div`
  margin-top: 15px;
  display: flex;
  position: relative;
  justify-content: flex-end;
`;

const ErrorWrap = styled.div`
  flex-grow: 1;
`;

class Signup extends Component {
  submitHandler = e => {
    e.preventDefault();

    let values = this.props.values;
    values.profilenameColor = "#ffffff";
    values.photos = { headerOverlay: "rgba(3,3,3,0)" };
    values.photos.header = "/img/profile/default-header.jpg";
    this.props.onSignupSubmit(values);
    this.props.resetForm();
  };

  componentDidMount() {
    this.props.clearError();
  }

  render() {
    let {
      touched,
      errors,
      values,
      handleChange,
      handleBlur,
      isValid,
      errorMsg,
      loading,
      userId,
      isAuth,
      width
    } = this.props;

    let isFlat = width === "xs" ? 0 : 10;

    const form = (
      <MyPaper form="true" size_m="true" verticalfix="true" elevation={isFlat}>
        <Form onSubmit={this.submitHandler}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={5}>
              <MyFormControl
                component="fieldset"
                required
                error={touched.password && errors.role}
              >
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="musician"
                    control={<Radio />}
                    label="Musician"
                  />
                  <FormControlLabel
                    value="studio"
                    control={<Radio />}
                    label="Recording Studio"
                  />
                </RadioGroup>
                <FormHelperText id="name-error-text">
                  {touched.email && touched.profilename && !values.role && (
                    <span>^Required</span>
                  )}
                </FormHelperText>
              </MyFormControl>
            </Grid>
            <Grid item xs={12} sm={7}>
              <MyFormControl
                fullWidth
                error={touched.profilename && errors.profilename}
              >
                <Input
                  id="profilename"
                  type="profilename"
                  name="profilename"
                  value={values.profilename}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Profile Name"
                />
                <FormHelperText id="name-error-text">
                  {touched.profilename && errors.profilename && (
                    <span>{errors.profilename || "&nbsp"}</span>
                  )}
                </FormHelperText>
              </MyFormControl>
              <MyFormControl fullWidth error={touched.email && errors.email}>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                />
                <FormHelperText id="name-error-text">
                  {touched.email && errors.email && (
                    <span>{errors.email || "&nbsp"}</span>
                  )}
                </FormHelperText>
              </MyFormControl>
              <MyFormControl
                fullWidth
                error={touched.password && errors.password}
              >
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <FormHelperText id="name-error-text">
                  {touched.password && errors.password && (
                    <span>{errors.password || "&nbsp"}</span>
                  )}
                </FormHelperText>
              </MyFormControl>
            </Grid>
            <Grid item xs={12}>
              <ButtonWrap>
                <ErrorWrap>
                  <MyFormHelperTextBig error>
                    {!touched.email && !touched.password && !touched.profilename
                      ? errorMsg
                      : ""}
                  </MyFormHelperTextBig>
                </ErrorWrap>
                <Button
                  disabled={!isValid}
                  variant="outlined"
                  color="primary"
                  type="submit"
                  style={{ flexShrink: 0 }}
                >
                  Sign Me Up!
                </Button>
              </ButtonWrap>
            </Grid>
          </Grid>
        </Form>
      </MyPaper>
    );

    return loading ? (
      <WaveformLoader />
    ) : userId && isAuth ? (
      <Redirect
        to={{
          pathname: `/user/${userId}`,
          state: { prevPath: this.props.location.pathname }
        }}
      />
    ) : (
      form
    );
  }
}

const FormikForm = withFormik({
  isInitialValid: false,
  mapPropsToValues(props) {
    return {
      profilename: props.profilename || "",
      email: props.email || "",
      password: props.password || "",
      role: props.role || ""
    };
  },
  validationSchema: yup.object().shape({
    profilename: yup
      .string()
      .max(50, params => `Name may not exceed ${params.max} characters`)
      .required("Profile name required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email address required"),
    password: yup
      .string()
      .min(6, params => `Must be at least ${params.min} characters long`)
      .max(50, params => `Password may not exceed ${params.max} characters`)
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password required"),
    role: yup.string().required("^Required")
  })
})(Signup);

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    errorMsg: state.user.errorMsg,
    userId: state.user._id,
    isAuth: state.user.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignupSubmit: vals => dispatch(userSignup(vals)),
    clearError: () => dispatch(clearErrorMsg())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withWidth()(FormikForm))
);
