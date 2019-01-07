import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";
import { RootState } from "../../store/reducers";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button, { ButtonProps } from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import Edit from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MyFormControl from "../mui/MyFormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { withFormik, InjectedFormikProps } from "formik";
import * as yup from "yup";
import { IUser } from "../../typeDefs";

import { updateUser } from "../../store/actions";

type IProfileHeaderProps = {
  pathId: string;
  user: IUser;
  width: string;
};

type SCProps = {
  headerOverlay: string;
  textcolor: string;
  width: string;
};

type Props = InjectedFormikProps<
  ReturnType<typeof mapDispatchToProps> & IProfileHeaderProps,
  any
>;

const initialState = {
  editOpen: false,
  profilenameColor: "#ffffff",
  headerOverlay: "rgba(3,3,3,0)"
};

class ProfileHeaderCard extends React.Component<
  Props,
  Readonly<Partial<typeof initialState>>
> {
  state = initialState;

  handleEditOpen = () => {
    this.setState({ editOpen: true });
  };

  handleEditClose = () => {
    this.setState({ editOpen: false });
  };

  handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ profilenameColor: e.target.value });
    this.props.setValues({
      ...this.props.values,
      profilenameColor: e.target.value
    });
  };

  handleOverlayChange = (e: React.ChangeEvent<any>) => {
    this.setState({ headerOverlay: e.target.value });
    this.props.setValues({
      ...this.props.values,
      headerOverlay: e.target.value
    });
  };

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let values = this.props.values;
    values.profilenameColor = this.state.profilenameColor;
    values.headerOverlay = this.state.headerOverlay;
    this.props.onFormSubmit(values);
    this.handleEditClose();
  };

  componentDidMount() {
    this.setState({
      profilenameColor: this.props.user.profilenameColor,
      headerOverlay: this.props.user.photos.headerOverlay
    });
  }

  render() {
    let props = this.props;
    let {
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      user,
      pathId
    } = this.props;

    let headerBackground =
      user.photos.header || `/img/profile/default-header.jpg`;

    const OuterWrap = styled.div`
      position: relative;
      width: 100%;
      height: 0;
      background: url(${headerBackground});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      padding-top: 24%;
    `;
    const InnerWrap = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;

    const ProfileImgDiv = styled.div`
      background: url(${user.photos.primary || "/img/avatar.jpg"});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      width: 21%;
      padding-top: 21%;
      border-radius: 50%;
      float: right;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    `;

    const TranslucentDiv = styled.div<Partial<SCProps>>`
      position: absolute;
      display: flex;
      align-items: flex-start;
      top: 0;
      left: 0;
      background: ${props => props.headerOverlay};
      height: 100%;
      width: 100%;
      float: right;
      text-align: right;
      padding: 1% 1% 1% 3%;
      span {
        display: inline-block;
        padding: 0 10px;
        line-height: 95%;
        height: 0.95em;
      }
    `;

    const ProfileNameWrapper = styled.div<Partial<SCProps>>`
      position: relative;
      display: block;
      float: right;
      max-width: 75%;
      flex-shrink: 10;
      border: 1px solid ${props => props.textcolor};
    `;

    const formatUserName = (name: string) => {
      let nameArr = name.split(" ");
      let nameArrMap = nameArr.map((word, i) => <span key={i}>{word} </span>);
      return nameArrMap;
    };

    const ProfileName = styled(Typography as any)<Partial<SCProps>>`
      color: ${props => props.textcolor};
      font-size: ${props => {
        return props.width === "xs" || props.width === "sm"
          ? "1.5em"
          : props.width === "md"
          ? "2em"
          : props.width === "lg"
          ? "3em"
          : "4em";
      }};
      font-weight: 400;
      line-height: 0;
    `;

    const EditBn = styled(Button)<any>`
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: #ffffff;
      opacity: 0.8;
      transition: all 150ms;
      padding: 5px;
      &:hover {
        background: #ffffff;
        opacity: 1;
      }
      .icon--edit {
        padding-right: 4px;
      }
    `;

    let EditBtnComp =
      user.isAuth && user._id === pathId ? (
        <EditBn
          id="edit-btn"
          variant="contained"
          aria-label="edit"
          size="small"
          onClick={this.handleEditOpen}
        >
          <Edit className="icon--edit" />
          Edit
        </EditBn>
      ) : null;

    const EditDialogTopLineWrap = styled.div`
      display: flex;
      width: 100%;
      justify-content: space-between;
      .namecolor--wrap {
        float: right;
      }
      input {
        display: inline-block;
        cursor: pointer;
      }
    `;

    return (
      <React.Fragment>
        <OuterWrap>
          <InnerWrap>
            <TranslucentDiv headerOverlay={this.state.headerOverlay}>
              <ProfileImgDiv />
              <div style={{ flexGrow: 1, width: "100%" }} />
              <Hidden smDown>
                <ProfileNameWrapper textcolor={this.state.profilenameColor}>
                  <ProfileName
                    textcolor={this.state.profilenameColor}
                    width={this.props.width}
                  >
                    {formatUserName(user.profilename) || ""}
                  </ProfileName>
                </ProfileNameWrapper>
              </Hidden>
            </TranslucentDiv>
            {EditBtnComp}
          </InnerWrap>
        </OuterWrap>

        <div>
          <Dialog
            fullWidth
            maxWidth="md"
            fullScreen={props.width === "xs"}
            transitionDuration={500}
            open={this.state.editOpen || false}
            onClose={this.handleEditClose}
            aria-labelledby="form-dialog-title"
          >
            <form onSubmit={this.submitHandler}>
              <DialogTitle
                id="form-dialog-title"
                style={{ textAlign: "center" }}
              >
                Edit Profile
              </DialogTitle>
              <DialogContent>
                <EditDialogTopLineWrap>
                  <MyFormControl
                    fullWidth
                    aria-describedby="profile-error-text"
                    error={touched.profilename && errors.profilename}
                  >
                    <InputLabel htmlFor="profilename">Profile Name</InputLabel>
                    <Input
                      id="profilename"
                      name="profilename"
                      placeholder="Profile Name"
                      type="text"
                      value={values.profilename}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText id="profile-error-text">
                      {touched.profilename && errors.profilename && (
                        <span>{errors.profilename}</span>
                      )}
                    </FormHelperText>
                  </MyFormControl>
                  <MyFormControl aria-describedby="profile-color-text">
                    <div className="namecolor--wrap">
                      <InputLabel htmlFor="namecolor">Color:</InputLabel>
                      <Input
                        disableUnderline
                        id="namecolor"
                        type="color"
                        name="namecolor"
                        onChange={this.handleColorChange}
                        value={this.state.profilenameColor}
                      />
                    </div>
                  </MyFormControl>
                </EditDialogTopLineWrap>
                <MyFormControl
                  fullWidth
                  aria-describedby="profilephoto-error-text"
                  error={touched.profilephoto && errors.profilephoto}
                >
                  <InputLabel htmlFor="profilephoto">
                    Profile Photo URL
                  </InputLabel>
                  <Input
                    id="profilephoto"
                    name="profilephoto"
                    placeholder="Profile Photo URL"
                    type="url"
                    value={values.profilephoto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText id="headerphoto-error-text">
                    {touched.profilephoto && errors.profilephoto && (
                      <span>{errors.profilephoto}</span>
                    )}
                  </FormHelperText>
                </MyFormControl>
                <MyFormControl
                  fullWidth
                  aria-describedby="headerphoto-error-text"
                  error={touched.headerphoto && errors.headerphoto}
                >
                  <InputLabel htmlFor="headerphoto">
                    Header Photo URL
                  </InputLabel>
                  <Input
                    id="headerphoto"
                    name="headerphoto"
                    placeholder="Header Photo URL"
                    type="url"
                    value={values.headerphoto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText id="headerphoto-error-text">
                    {touched.headerphoto && errors.headerphoto && (
                      <span>{errors.headerphoto}</span>
                    )}
                  </FormHelperText>
                </MyFormControl>
                <MyFormControl horizontalcenter="true" fullWidth>
                  <Typography variant="body2">Header Photo Overlay</Typography>
                  <RadioGroup
                    row
                    aria-label="overlay"
                    name="overlay"
                    value={this.state.headerOverlay}
                    onChange={this.handleOverlayChange}
                  >
                    <FormControlLabel
                      value="rgba(3,3,3,0.5)"
                      control={<Radio color="default" />}
                      label="Darker"
                    />
                    <FormControlLabel
                      value="rgba(3,3,3,0.25)"
                      control={<Radio color="default" />}
                      label="Dark"
                    />
                    <FormControlLabel
                      value="rgba(3,3,3,0)"
                      control={<Radio color="default" />}
                      label="None"
                    />
                    <FormControlLabel
                      value="rgba(250,250,250,0.35)"
                      control={<Radio color="default" />}
                      label="Light"
                    />
                    <FormControlLabel
                      value="rgba(250,250,250,0.7)"
                      control={<Radio color="default" />}
                      label="Lighter"
                    />
                  </RadioGroup>
                </MyFormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleEditClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </React.Fragment>
    );
  }
}

type FormikVals = Partial<ReturnType<typeof mapStateToProps>>;

const FormikForm = withFormik<Props, FormikVals>({
  mapPropsToValues(props: any) {
    return {
      profilename: props.profilename,
      headerphoto: props.headerphoto,
      profilephoto: props.profilephoto
    };
  },
  validationSchema: yup.object().shape({
    profilename: yup
      .string()
      .max(50, (props: any) => `Name may not exceed ${props.max} characters`)
      .required("Profile name required"),
    headerphoto: yup.string().url("Must be a valid URL"),
    profilephoto: yup.string().url("Must be a valid URL")
  }),
  handleSubmit: () => {}
})(ProfileHeaderCard) as any;

const mapStateToProps = (state: RootState) => {
  return {
    profilename: state.user.profilename || "",
    headerphoto: state.user.photos.header || "",
    profilephoto: state.user.photos.primary || "",
    profilenameColor: state.user.profilenameColor || "#ffffff",
    headerOverlay: state.user.photos.headerOverlay || "rgba(3,3,3,0)"
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFormSubmit: (vals: any) => {
      dispatch(updateUser(vals, "ProfileHeaderCard"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(FormikForm));
