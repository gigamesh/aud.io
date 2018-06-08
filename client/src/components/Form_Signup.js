import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MyFormControl from './mui/MyFormControl';
import MyFormHelperTextBig from './mui/MyFormHelperText_Big';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import MyPaper from './mui/MyPaper';
import Grid from '@material-ui/core/Grid';
import { withFormik, Form } from 'formik'
import * as yup from 'yup'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    display: 'block',
    margin: '0 0 20px 0',
  }
});

const ButtonWrap = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  font-weight: 300;
`
class Signup extends Component {

  // state = {
  //   value: '',
  // };

  // handleChange = event => {
  //   console.log(event.target.value );
  //   this.setState({ value: event.target.value });
  // };

  handleCategorySelect = event => {
    // this.setState({})
  }

  render(){
  let { 
    touched, 
    errors, 
    values, 
    handleChange, 
    handleBlur, 
    isValid, 
    classes,
    errorMsg
    } = this.props;

    return(
	<MyPaper form size_m>
		<Form>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={5}>
          <MyFormControl
            component="fieldset" 
            required 
            className={classes.formControl}
            error={touched.password && errors.category}
            >
            <RadioGroup
              aria-label="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              className={classes.group}
              // inputComponent={Field}
            >
              <FormControlLabel value="Musician" control={<Radio />} label="Musician" />
              <FormControlLabel value="Recording Studio" control={<Radio />} label="Recording Studio" />
            </RadioGroup>
            <FormHelperText id="name-error-text">
              {touched.email && touched.profilename && !values.category &&
              <span>^Required</span>}
            </FormHelperText>  
          </MyFormControl>
        </Grid>
        <Grid item xs={12} sm={7} >
        <MyFormControl fullWidth
          error={touched.profilename && errors.profilename}>
          <Input 
            id='profilename'
            type="profilename" 
            name="profilename"
            value={values.profilename}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Profile Name'
            />
            <FormHelperText id="name-error-text">
              {touched.profilename && errors.profilename && 
              <span>{errors.profilename || '&nbsp'}</span>}
            </FormHelperText>    
        </MyFormControl>
        <MyFormControl fullWidth
          error={touched.email && errors.email}>
          <Input 
            id='email'
            type="email" 
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Email'
            />
            <FormHelperText id="name-error-text">
              {touched.email && errors.email && 
              <span>{errors.email || '&nbsp'}</span>}
            </FormHelperText>    
        </MyFormControl>
        <MyFormControl fullWidth
          error={touched.password && errors.password}>
          <Input 
            id='password'
            type="password" 
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange} 
            placeholder='Password'
            />
            <FormHelperText id="name-error-text">
              {touched.password && errors.password && 
              <span>{errors.password || '&nbsp'}</span>}
            </FormHelperText>  
        </MyFormControl>
        </Grid>
        <Grid item xs={12} >
          <ButtonWrap>
            <MyFormHelperTextBig error>
              {!touched.email && !touched.password ? errorMsg : ''}
            </MyFormHelperTextBig> 
            <Button 
              disabled={!isValid}
              variant="raised" 
              color="primary" 
              style={{fontWeight: 'inherit'}}
              type="submit" >
              Sign Me Up!
            </Button>
          </ButtonWrap>
        </Grid>
      </Grid>
		</Form>
	</MyPaper>
    )
  }
}

const FormikForm = withFormik({
  isInitialValid : false,
	mapPropsToValues(props){
		return {
      profilename: props.profilename || '',
			email: props.email || '',
			password: props.password || '',
      category: props.category || '',
		}
	},
  validationSchema: yup.object().shape({
    profilename: yup.string().max(50, params => `Name may not exceed ${params.max} characters`)
      .required('Profile name required'),
    email: yup.string().email("Invalid email address")
      .required("Email address required"),
    password: yup.string().min(6, params => `Must be at least ${params.min} characters long`)
      .max(50, params => `Password may not exceed ${params.max} characters`)
      .matches(/[0-9]/,'Password must contain at least one number')
      .required('Password required'),
    category: yup.string().required("^Required")
  }),
  handleSubmit({profilename, email, password, category},{resetForm}){
    const request = axios.post('/api/signup',
      { profilename, email, password, category })
      .then(response => console.log(response.data));
      resetForm();
  }
})(withStyles(styles)(Signup));

export default FormikForm