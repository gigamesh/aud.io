import React from 'react';
import { connect } from 'react-redux'
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MyFormControl from '../mui/MyFormControl';
// import withMobileDialog from '@material-ui/core/withMobileDialog';

import { withFormik, Form } from 'formik'
import * as yup from 'yup'

import { updateUser } from '../../store/actions';

class ProfileEditDialog extends React.Component{

  submitHandler = (e) =>{
    e.preventDefault();

    let { profilename, headerphoto, profilephoto } = this.props.values;
    this.props.onFormSubmit({
      profilename,
      profilephoto,
      headerphoto    
    });
    this.props.handleClose();
  }

  render(){

    let {
      open,
      handleClose,
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
    } = this.props;

    return (
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Form>
    );
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
})(ProfileEditDialog);

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

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);