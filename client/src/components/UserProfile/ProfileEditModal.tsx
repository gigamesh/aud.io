import React from "react";
import styled from "styled-components";
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
import Typography from "@material-ui/core/Typography";
import PhotoAddButton from "../UI/PhotoAddButton";
import Button from "@material-ui/core/Button";
import { IObj } from "../../typeDefs";

class ProfileEditModal extends React.Component<IObj, {}> {
  render() {
    const {
      values,
      handleChange,
      handleBlur,
      touched,
      width,
      errors,
      headerOverlay,
      editOpen,
      profilenameColor,
      handleEditClose,
      submitHandler,
      handleColorChange,
      handleOverlayChange,
      addFileHandler,
      profilephoto,
      headerphoto,
      uploadErrors
    } = this.props;

    const EditDialogTopLineWrap = styled.div`
      display: flex;
      width: 100%;
      justify-content: space-between;
      input {
        display: inline-block;
        cursor: pointer;
      }
    `;

    const FileName = styled.div`
      margin: 0 auto;
      max-width: 200px;
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `;

    const FileAddLabel = styled.label`
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `;

    return (
      <Dialog
        fullWidth
        maxWidth="md"
        fullScreen={width === "xs"}
        transitionDuration={500}
        open={editOpen || false}
        onClose={handleEditClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={submitHandler}>
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
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
              <MyFormControl
                aria-describedby="profile-color-text"
                style={{ width: "50px" }}
              >
                <InputLabel htmlFor="namecolor">Color:</InputLabel>
                <Input
                  disableUnderline
                  id="namecolor"
                  type="color"
                  name="namecolor"
                  style={{ width: "30px" }}
                  onChange={handleColorChange}
                  value={profilenameColor}
                />
              </MyFormControl>
            </EditDialogTopLineWrap>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <MyFormControl
                aria-describedby="profilephoto-error-text"
                error={uploadErrors.profilephoto}
              >
                <div>
                  <FileAddLabel htmlFor="profilephoto">
                    <PhotoAddButton
                      color="primary"
                      fontSize="large"
                      title="Upload Profile Photo"
                      style={{ marginRight: "5px" }}
                    />
                    Profile Photo
                  </FileAddLabel>

                  {uploadErrors.profilephoto && (
                    <FormHelperText id="profile-photo-error-text" error>
                      {uploadErrors.profilephoto}
                    </FormHelperText>
                  )}

                  <input
                    accept="image/*"
                    type="file"
                    onChange={addFileHandler}
                    id="profilephoto"
                    style={{ display: "none" }}
                  />
                  <FileName>
                    <Typography color="primary" variant="body2">
                      {profilephoto.name}
                    </Typography>
                  </FileName>
                </div>
              </MyFormControl>
              <MyFormControl
                aria-describedby="headerphoto-error-text"
                error={uploadErrors.profilephoto}
              >
                <div>
                  <FileAddLabel htmlFor="headerphoto">
                    <PhotoAddButton
                      color="primary"
                      fontSize="large"
                      title="Upload Header Photo"
                      style={{ marginRight: "5px" }}
                    />
                    Header Photo
                  </FileAddLabel>

                  {uploadErrors.headerphoto && (
                    <FormHelperText id="header-photo-error-text" error>
                      {uploadErrors.headerphoto}
                    </FormHelperText>
                  )}

                  <input
                    accept="image/*"
                    type="file"
                    onChange={addFileHandler}
                    id="headerphoto"
                    style={{ display: "none" }}
                  />
                  <FileName>
                    <Typography color="primary" variant="body2">
                      {headerphoto.name}
                    </Typography>
                  </FileName>
                </div>
              </MyFormControl>
            </div>
            <MyFormControl horizontalcenter="true" fullWidth>
              <Typography variant="subtitle1">Header Photo Overlay</Typography>
              <RadioGroup
                row
                aria-label="overlay"
                name="overlay"
                value={headerOverlay}
                onChange={handleOverlayChange}
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
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={
                !!uploadErrors.profilephoto || !!uploadErrors.headerphoto
              }
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default ProfileEditModal;
