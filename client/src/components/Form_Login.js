import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import WaveformLoader from "./UI/WaveformLoader";
import withWidth from "@material-ui/core/withWidth";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import MyPaper from "./mui/MyPaper";
import MyFormControl from "./mui/MyFormControl";
import MyFormHelperTextBig from "./mui/MyFormHelperText_Big";
import { withFormik, Form } from "formik";
import * as yup from "yup";
import { loginUser, clearErrorMsg } from "../store/actions";

const ButtonWrap = styled.div`
  margin-top: 15px;
  display: flex;
  position: relative;
  justify-content: flex-end;
`;

const ErrorWrap = styled.div`
  flex-grow: 1;
`;

class Login extends Component {
  submitHandler = e => {
    e.preventDefault();
    this.props.onLoginSubmit(
      this.props.values.email,
      this.props.values.password
    );
    this.props.resetForm();
  };

  componentDidMount() {
    this.props.onMounted();
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
      <MyPaper size_s="true" form="true" verticalfix="true" elevation={isFlat}>
        <Form onSubmit={this.submitHandler}>
          <MyFormControl
            fullWidth
            aria-describedby="email-error-text"
            error={touched.email && errors.email}
          >
            <Input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              // inputComponent={Field}
              placeholder="Email"
            />
            <FormHelperText id="email-error-text">
              {touched.email && errors.email && (
                <span>{errors.email || "&nbsp"}</span>
              )}
            </FormHelperText>
          </MyFormControl>
          <MyFormControl
            fullWidth
            aria-describedby="password-error-text"
            error={touched.password && errors.password}
          >
            <Input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              // inputComponent={Field}
              placeholder="Password"
            />
            <FormHelperText id="password-error-text">
              {touched.password && errors.password && (
                <span>{errors.password || "&nbsp"}</span>
              )}
            </FormHelperText>
          </MyFormControl>
          <ButtonWrap>
            <ErrorWrap>
              <MyFormHelperTextBig error>
                {!touched.email && !touched.password ? errorMsg : ""}
              </MyFormHelperTextBig>
            </ErrorWrap>
            <Button
              disabled={!isValid}
              variant="outlined"
              color="primary"
              type="submit"
              style={{ flexShrink: 0 }}
            >
              Submit
            </Button>
          </ButtonWrap>
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
      email: props.email || "",
      password: props.password || ""
    };
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email adddress")
      .required("Email address required"),
    password: yup
      .string()
      .min(6, params => `Must be at least ${params.min} characters long`)
      .max(50, params => `Password may not exceed ${params.max} characters`)
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password required")
  })
})(Login);

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
    onLoginSubmit: (email, password) =>
      dispatch(loginUser({ email, password })),
    onMounted: () => dispatch(clearErrorMsg())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withWidth()(FormikForm))
);
