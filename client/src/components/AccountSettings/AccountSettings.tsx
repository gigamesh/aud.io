import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { profileDataInit } from "../../store/actions";
import { states } from "./geography";
import { updateUser } from "../../store/actions";
import styled from "styled-components";
import WaveformLoader from "../UI/WaveformLoader";
import withWidth from "@material-ui/core/withWidth";
import Input from "@material-ui/core/Input";
import MyFormControl from "../mui/MyFormControl";
import MyPaper from "../mui/MyPaper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { withFormik, Form } from "formik";
import * as yup from "yup";

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: flex-end;
`;

const ErrorWrap = styled.div`
  flex-grow: 1;
`;

class AccountSettings extends Component<any, any> {
  componentDidMount() {
    this.props.getProfileData(this.props.userId);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(this.props);

    let data = JSON.parse(JSON.stringify(this.props.values));
    delete data.userId;
    this.props.onFormSubmit(data);
  };

  render() {
    let {
      touched,
      errors,
      values,
      handleChange,
      handleBlur,
      loading,
      width
    } = this.props;

    let isFlat = width === "xs" || width === "sm" ? 0 : 10;

    const Option = styled.option`
      color: rgb(0, 0, 0, 0.5);
    `;
    const stateOptions = states.map(state => {
      return (
        <Option value={state} key={state}>
          {state}
        </Option>
      );
    });

    const form = (
      <MyPaper form="true" size_xl="true" verticalfix="true" elevation={isFlat}>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item md={12} lg={5}>
              <MyFormControl
                fullWidth
                error={touched.profilename && errors.profilename}
              >
                <Input
                  id="profilename"
                  type="text"
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
                component="fieldset"
                required
                error={touched.password && errors.role}
              >
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  style={{ flexDirection: "row" }}
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
            <Grid item md={12} lg={7}>
              <Grid container spacing={8}>
                <Grid item sm={12} md={6} style={{ width: "100%" }}>
                  <MyFormControl fullWidth>
                    <Input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                    <FormHelperText id="name-error-text" />
                  </MyFormControl>
                </Grid>
                <Grid item sm={12} md={6} style={{ width: "100%" }}>
                  <MyFormControl fullWidth>
                    <Input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    <FormHelperText id="name-error-text" />
                  </MyFormControl>
                </Grid>
              </Grid>
              <MyFormControl fullWidth>
                <Input
                  id="street"
                  type="text"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Street Address"
                />
                <FormHelperText id="name-error-text" />
              </MyFormControl>
              <Grid container spacing={8}>
                <Grid item sm={12} md={6} style={{ width: "100%" }}>
                  <MyFormControl fullWidth>
                    <Input
                      id="city"
                      type="text"
                      name="city"
                      value={values.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="City"
                    />
                    <FormHelperText id="name-error-text" />
                  </MyFormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={3}
                  md={2}
                  lg={3}
                  style={{ width: "100%" }}
                >
                  <FormControl
                    style={{ width: "90px", display: "inline-flex" }}
                  >
                    <Select
                      // size={10}
                      native
                      value={values.state}
                      onChange={handleChange}
                      inputProps={{
                        name: "state",
                        id: "state"
                      }}
                    >
                      <Option value="">State</Option>
                      {stateOptions}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sm={9}
                  md={4}
                  lg={3}
                  style={{ width: "100%" }}
                >
                  <MyFormControl fullWidth>
                    <Input
                      id="postalCode"
                      type="text"
                      name="postalCode"
                      value={values.postalCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Zip Code"
                    />
                    <FormHelperText id="name-error-text" />
                  </MyFormControl>
                </Grid>
              </Grid>
            </Grid>
            <ButtonWrap>
              <ErrorWrap />
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                style={{ flexShrink: 0 }}
              >
                Submit
              </Button>
            </ButtonWrap>
          </Grid>
        </form>
      </MyPaper>
    );

    return loading ? <WaveformLoader /> : form;
  }
}

const FormikForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues(props: any) {
    return {
      profilename: props.profilename || "",
      email: props.email || "",
      password: props.password || "",
      role: props.role || "",
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      street: props.street || "",
      city: props.city || "",
      state: props.state || "",
      postalCode: props.postalCode || "",
      userId: props.userId
    };
  },
  validationSchema: yup.object().shape({
    profilename: yup
      .string()
      .max(50, (params: any) => `Name may not exceed ${params.max} characters`)
      .required("Profile name required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email address required"),
    password: yup
      .string()
      .min(6, (params: any) => `Must be at least ${params.min} characters long`)
      .max(
        50,
        (params: any) => `Password may not exceed ${params.max} characters`
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password required"),
    role: yup.string().required("^Required"),
    firstName: yup
      .string()
      .max(50, (params: any) => `May not exceed ${params.max} characters`),
    lastName: yup
      .string()
      .max(50, (params: any) => `May not exceed ${params.max} characters`),
    street: yup
      .string()
      .max(100, (params: any) => `May not exceed ${params.max} characters`),
    city: yup
      .string()
      .max(50, (params: any) => `May not exceed ${params.max} characters`),
    state: yup.string(),
    postalCode: yup.string()
  }),
  handleSubmit: () => {}
})(AccountSettings);

const mapStateToProps = (state: RootState) => {
  return {
    userId: state.user._id,
    loading: state.user.loading,
    errorMsg: state.user.errorMsg,
    profilename: state.user.profilename,
    email: state.user.email,
    role: state.user.role,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    street: state.user.address.street,
    city: state.user.address.city,
    state: state.user.address.state,
    postalCode: state.user.address.postalCode
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFormSubmit: (vals: any) => dispatch(updateUser(vals, "AccountSettings")),
    getProfileData: (userId: string) => dispatch(profileDataInit(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(FormikForm));
