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

import { withFormik, InjectedFormikProps } from "formik";
import * as yup from "yup";
import { IUser, IObj } from "../../typeDefs";

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

type FormVals = {
  headerOverlay: string;
  headerphoto: string;
  origin: string;
  profilename: string;
  profilenameColor: string;
  profilephoto: string;
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

  componentDidMount() {
    this.setState({
      profilenameColor: this.props.user.profilenameColor,
      headerOverlay: this.props.user.photos.headerOverlay
    });
  }

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

    // if (id === "profilephoto") {
    //   this.setState({ profilePhotoName: file.name });
    // } else if (id === "headerphoto") {
    //   this.setState({ headerPhotoName: file.name });
    // }
    this.props.setFieldValue(id, file);
  };

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let values = this.props.values;
    values.profilenameColor = this.state.profilenameColor;
    values.headerOverlay = this.state.headerOverlay;

    //validate image
    if (values.profilephoto || values.headerphoto) {
      const photos = [values.profilephoto, values.headerphoto];
      photos.forEach(photo => {
        console.log(
          JSON.stringify(
            {
              fileName: photo.name,
              type: photo.type,
              size: `${photo.size} bytes`
            },
            null,
            2
          )
        );
      });
    }

    this.props.onFormSubmit(values);
    this.handleEditClose();
  };

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      user,
      pathId
    } = this.props;

    const headerBackground =
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
    headerOverlay: state.user.photos.headerOverlay || "rgba(3,3,3,0)"
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFormSubmit: (vals: FormVals) => {
      dispatch(updateUser(vals, "ProfileHeaderCard"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(FormikForm));
