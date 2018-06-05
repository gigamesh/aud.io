import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import MyPaper from './mui/MyPaper';
import MyFormControl from './mui/MyFormControl';
import { withFormik, Form } from 'formik'
import * as yup from 'yup'
import { loginUser } from '../store/actions';

const ButtonWrap = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  font-weight: 300;
`

class Login extends Component{
  // submitForm(e){
  //   e.preventDefault();
  // }
  
  render() {
    let {
      touched,
      errors,
      values,
      handleChange,
      handleBlur,
      isValid,
      // handleSubmit
      onLoginSubmit
    } = this.props;
    return (
      <MyPaper size_s form>
        <Form onSubmit={(e) => {
          e.preventDefault();
          onLoginSubmit(values.email,values.password)
        }

          }>
          <MyFormControl fullWidth
            error={touched.email && errors.email}>
            <Input 
              id='email'
              type="email" 
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              // inputComponent={Field}
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
              // inputComponent={Field}
              placeholder='Password'
              />
              <FormHelperText id="name-error-text">
                {touched.password && errors.password && 
                <span>{errors.password || '&nbsp'}</span>}
              </FormHelperText>  
          </MyFormControl>
          <ButtonWrap>
            <Button 
              disabled={!isValid}
              variant="raised" 
              color="primary" 
              style={{fontWeight: 'inherit'}}
              type="submit" >
              Submit
            </Button>
          </ButtonWrap>
        </Form>
      </MyPaper>
    )
  }
}

const FormikForm = withFormik({
  isInitialValid : false,
	mapPropsToValues(props){
		return {
			email: props.email || '',
			password: props.password || ''
		}
	},
  validationSchema: yup.object().shape({
    email: yup.string().email("Please enter a valid email adddress")
      .required("Email address required"),
    password: yup.string().min(6, params => `Must be at least ${params.min} characters long`)
      .max(50, params => `Password may not exceed ${params.max} characters`)
      .matches(/[0-9]/,'Password must contain at least one number')
      .required('Password required')
  }),
  // handleSubmit({email,password},{resetForm}){
    // this.props.dispatch(loginUser(values))
    // const request = axios.post('/api/login',{email,password})
    //       .then(response => console.log(response.data));
    
    

          // resetForm();
  // }
})(Login);

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmit: (email, password) => dispatch(loginUser({email,password}))
  }
}

// export default FormikForm
export default connect(null, mapDispatchToProps)(FormikForm)