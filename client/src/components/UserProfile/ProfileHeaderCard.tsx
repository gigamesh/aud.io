import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/reducers";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import Edit from "@material-ui/icons/Edit";
import ProfileEditModal from "./ProfileEditModal";
import { linkBuilder } from "../../util";

import { withFormik, InjectedFormikProps } from "formik";
import * as yup from "yup";
import { IUser, IObj } from "../../typeDefs";

import { updateProfile } from "../../store/actions";

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
  ReturnType<typeof mapDispatchToProps> &
    ReturnType<typeof mapStateToProps> &
    IProfileHeaderProps,
  any
>;

const initialState: { [index: string]: any } = {
  editOpen: false,
  profilenameColor: "#ffffff",
  headerOverlay: "rgba(3,3,3,0)",
  profilephoto: {},
  headerphoto: {},
  uploadErrors: { profilephoto: "", headerphoto: "" }
};

class ProfileHeaderCard extends React.Component<
  Props,
  Readonly<Partial<typeof initialState>>
> {
  state = initialState;

  componentDidMount() {
    this.setState({
      profilenameColor: this.props.profilenameColor,
      headerOverlay: this.props.user.photos.headerOverlay
    });
  }

  componentDidUpdate(prevProps: IObj) {
    if (prevProps.profileUpdateLoading && !this.props.profileUpdateLoading) {
      this.setState({ profilephoto: {}, headerphoto: {} });
    }
  }

  handleEditOpen = () => {
    this.setState({ editOpen: true });
  };

  handleEditClose = () => {
    this.setState({
      editOpen: false,
      profilephoto: initialState.profilephoto,
      headerphoto: initialState.headerphoto
    });
  };

  handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ profilenameColor: e.target.value });
    this.props.setValues({
      ...this.props.values,
      profilenameColor: e.target.value
    });
  };

  handleOverlayChange = (e: React.ChangeEvent<IObj>) => {
    this.setState({ headerOverlay: e.target.value });
    this.props.setValues({
      ...this.props.values,
      headerOverlay: e.target.value
    });
  };

  addFileHandler = (e: React.ChangeEvent<IObj>) => {
    this.props.handleChange(e);
    const id = e.target.id;
    const file = e.target.files[0];
    let isValid = true;

    //validate image

    isValid = this.validateFile(file, id);
    if (!isValid) return;

    if (id === "profilephoto") {
      this.setState({
        profilephoto: file
      });
    } else if (id === "headerphoto") {
      this.setState({
        headerphoto: file
      });
    }

    this.props.setFieldValue(id, file);
  };

  validateFile = (file: IObj, photoCategory: string) => {
    let error = "";
    if (file.size > 10000000) {
      error = "File must be less than 10mb";
    }
    if (!/(jpeg|jpg|png|gif)/.test(file.type)) {
      error = "File must be JPG, PNG, or GIF";
    }
    const errorObject = {
      ...this.state.uploadErrors,
      [photoCategory]: error
    };

    this.setState({ uploadErrors: errorObject });
    if (error) return false;
    else return true;
  };

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let values = this.props.values;

    const formData = new FormData();
    formData.append("profilenameColor", this.state.profilenameColor);
    formData.append("profilename", values.profilename);
    formData.append("headerOverlay", this.state.headerOverlay);
    formData.append(
      "profilephoto",
      this.state.profilephoto,
      this.state.profilephoto.name
    );
    formData.append(
      "headerphoto",
      this.state.headerphoto,
      this.state.headerphoto.name
    );

    this.props.onFormSubmit(formData);
  };

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      user,
      pathId,
      headerphoto,
      profilephoto
    } = this.props;

    const headerBackground = headerphoto || `/img/profile/default-header.jpg`;

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
      background: url(${profilephoto || "/img/avatar.jpg"});
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

    const EditBn = styled(Button)<IObj>`
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

        <ProfileEditModal
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          handleEditClose={this.handleEditClose}
          submitHandler={this.submitHandler}
          handleColorChange={this.handleColorChange}
          handleOverlayChange={this.handleOverlayChange}
          headerOverlay={this.state.headerOverlay}
          editOpen={this.state.editOpen}
          profilenameColor={this.state.profilenameColor}
          setFieldValue={this.props.setFieldValue}
          addFileHandler={this.addFileHandler}
          profilephoto={this.state.profilephoto}
          headerphoto={this.state.headerphoto}
          uploadErrors={this.state.uploadErrors}
          loading={this.props.profileUpdateLoading}
        />
      </React.Fragment>
    );
  }
}

type FormikVals = Partial<ReturnType<typeof mapStateToProps>>;

const FormikForm = withFormik<Props, FormikVals>({
  mapPropsToValues(props: IObj) {
    return {
      profilename: props.profilename
    };
  },
  validationSchema: yup.object().shape({
    profilename: yup
      .string()
      .max(50, (props: IObj) => `Name may not exceed ${props.max} characters`)
      .required("Profile name required")
  }),
  handleSubmit: () => {}
})(ProfileHeaderCard) as any;

const mapStateToProps = (state: RootState) => {
  return {
    profilename: state.user.profilename || "",
    profilenameColor: state.user.profilenameColor || "#ffffff",
    headerOverlay: state.user.photos.headerOverlay || "rgba(3,3,3,0)",
    user: state.user,
    headerphoto: linkBuilder(state.user.photos.header, 1200),
    profilephoto: linkBuilder(state.user.photos.primary, 500),
    profileUpdateLoading: state.user.profileUpdateLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFormSubmit: (formData: IObj) => {
      dispatch(updateProfile(formData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(FormikForm));
