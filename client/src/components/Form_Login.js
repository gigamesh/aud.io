import React, { Component } from 'react'
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import MyPaper from './mui/MyPaper';
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'

const ButtonWrap = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  font-weight: 300;
`
const Login = ({
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  isValid
  }) =>(
	<MyPaper size_m form>
		<Form>
			<FormControl fullWidth
        error={touched.email && errors.email}>
				<Input 
					id='email'
					type="email" 
					name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          inputComponent={Field}
          placeholder='Email'
          />
          <FormHelperText id="name-error-text">
            {touched.email && errors.email && 
            <span>{errors.email || '&nbsp'}</span>}
          </FormHelperText>    
			</FormControl>
			<FormControl fullWidth
        error={errors.password}>
				<Input 
					id='password'
					type="password" 
					name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange} 
          inputComponent={Field}
          placeholder='Password'
          />
          <FormHelperText id="name-error-text">
            {touched.password && errors.password && 
            <span>{errors.password || '&nbsp'}</span>}
          </FormHelperText>  
			</FormControl>
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
    password: yup.string().min(6, 'Must be at least ${min} characters long')
      .max(50,'Password may not exceed ${max} characters')
      .matches(/[0-9]/,'Password must contain at least one number')
      .required('Password required')
  }),
  handleSubmit(values){
    console.log(values);
  }
})(Login);

export default class Form_Login extends Component {

	render() {
		return (
      <div>
			  <FormikForm />
      </div>
		)
	}
}