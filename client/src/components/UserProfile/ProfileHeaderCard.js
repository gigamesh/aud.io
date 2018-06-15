import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MyFormControl from '../mui/MyFormControl'
import { withFormik, Form } from 'formik'
import * as yup from 'yup'

import { updateUser } from '../../store/actions';

class ProfileHeaderCard extends React.Component {
  state = {
    editOpen: false,
  };

  handleEditOpen = () => {
    this.setState({ editOpen: true });
  };

  handleEditClose = () => {
    this.setState({ editOpen: false });
  };

  submitHandler = (e) =>{
    e.preventDefault();

    let { profilename, headerphoto, profilephoto } = this.props.values;
    this.props.onFormSubmit({
      profilename,
      profilephoto,
      headerphoto    
    });
    this.handleEditClose();
  }


  render(){
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
    
  let headerBackground = user.photos.header || `/img/profile/default-header.jpg`;

  const OuterWrap = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    /* background: pink; */
    background: url(${headerBackground});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding-top: 27%;
    &:hover #edit-btn {
      transform: scale(1);
    }
  `
  const InnerWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 2% 1% 2% 2%;
   `

  const ProfileImgDiv = styled.div`
    background: url(${user.photos.primary || "/img/avatar.jpg"});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 20%;
    padding-top: 20%;
    border-radius: 50%;
    float: right;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `

  const TranslucentDiv = styled.div`
    float: right;
    text-align: right;
    span {
      /* white-space: pre; */
      display: inline-block;
      padding: 0 10px;
      line-height: 95%;
      height: 1.1em;
      background:rgb(18,21,22,0.3);
    }
  `

  const ProfileNameWrapper = styled.div`
    position: relative;
    display: block;
    float: right;
    height: 100%;
    max-width: 50%;
  `

  const formatUserName = name => {
    let nameArr = name.split(' ');
    let nameArrMap = nameArr.map((word, i) => (
        <span key={i}>{word} </span>
      ))
    return nameArrMap
  }

  const ProfileName = styled(Typography)`
    color: #fff;
    font-weight: 300;
    line-height: 0;
    font-size: ${props.width};
  `

  const EditBn = styled(Button)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: #fff;
    opacity: 0.8;
    transform: scale(0);
    transition: all 150ms;
    &:hover {
      background: #fff;
      opacity: 1;
    }
    .icon--edit {
      padding: 0 5px;
    }
  `

  let EditBtnComp = user.isAuth && user._id === pathId ? (
      <EditBn 
        id='edit-btn' 
        variant="raised" 
        aria-label="edit" 
        size="small"
        onClick={this.handleEditOpen}>
        <Edit className='icon--edit'/>
        Edit
      </EditBn>
  ) : null;
    return (
      <React.Fragment>
        <OuterWrap>
          <InnerWrap>      
            <ProfileImgDiv/>
            <ProfileNameWrapper>
              <TranslucentDiv>
                <Hidden smDown>
                  <ProfileName 
                    variant={
                      props.width === "xs" ? "display1" :
                      props.width === "sm" ? "display2" :
                      props.width === "md" || props.width === "lg" ? "display3" :
                      "display4"
                    }
                    >
                    {formatUserName(user.profilename) || ''}
                  </ProfileName>
                </Hidden>
              </TranslucentDiv>
            </ProfileNameWrapper>
            {EditBtnComp}
          </InnerWrap>
        </OuterWrap>

        <div>
          <Dialog
            fullWidth
            maxWidth='md'
            fullScreen={props.width === 'xs'} 
            transitionDuration={500}
            open={this.state.editOpen}
            onClose={this.handleEditClose}
            aria-labelledby="form-dialog-title">
            <Form onSubmit={this.submitHandler}>
              <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>
                Edit Profile
              </DialogTitle>
              <DialogContent>
                <MyFormControl fullWidth
                aria-describedby='profile-error-text'
                error={touched.profilename && errors.profilename}>
                  <InputLabel htmlFor='profilename'>Profile Name</InputLabel>
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
                    {touched.profilename && errors.profilename && 
                    <span>{errors.profilename}</span>}
                  </FormHelperText>    
                </MyFormControl>
                <MyFormControl fullWidth
                aria-describedby='headerphoto-error-text'
                error={touched.headerphoto && errors.headerphoto}
                >
                  <InputLabel htmlFor='headerphoto'>Header Photo URL</InputLabel>
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
                    {touched.headerphoto && errors.headerphoto && 
                    <span>{errors.headerphoto}</span>}
                  </FormHelperText>    
                </MyFormControl>
                <MyFormControl fullWidth
                aria-describedby='profilephoto-error-text'
                error={touched.profilephoto && errors.profilephoto}
                >
                  <InputLabel htmlFor='profilephoto'>Profile Photo URL</InputLabel>
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
                    {touched.profilephoto && errors.profilephoto && 
                    <span>{errors.profilephoto}</span>}
                  </FormHelperText>    
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
            </Form>
          </Dialog>
        </div>
      </React.Fragment>
    )
  }
}

const FormikForm = withFormik({
	mapPropsToValues(props){
		return {
      profilename: props.profilename,
      headerphoto: props.headerphoto,
			profilephoto: props.profilephoto,
		}
	},
  validationSchema: yup.object().shape({
    profilename: yup.string().max(50, params => `Name may not exceed ${params.max} characters`)
      .required('Profile name required'),
    headerphoto: yup.string().url('Must be a valid URL'),
    profilephoto: yup.string().url('Must be a valid URL')

  }),
})(ProfileHeaderCard);

const mapStateToProps = state => {
  return {
    profilename: state.user.profilename || '',
    headerphoto: state.user.photos.header || '',
    profilephoto: state.user.photos.primary || ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: (vals) => dispatch(updateUser(vals))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(FormikForm))
