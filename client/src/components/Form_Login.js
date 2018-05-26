import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MyPaper from './mui/MyPaper';
// import MyTypography from './mui/MyTypography';
import { withFormik, Form, FastField } from 'formik'
import Yup from 'yup'

const ButtonWrap = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  font-weight: 300;
`
const Login = ({
	values,
	handleChange
}) => (
	<MyPaper padding={'60px 50px 50px 50px'}>
		<Form>
			<FormControl fullWidth>
				<InputLabel htmlFor="email">Email</InputLabel>
				<Input 
					id='email'
					type="email" 
					name="email"
          value={values.email}
          onChange={handleChange}
          // component={Input}
          />
			</FormControl>
			<FormControl fullWidth>
				<InputLabel htmlFor="password">Password</InputLabel>
				<Input 
					id='password'
					type="password" 
					name="password"
          value={values.password}
          onChange={handleChange} 
          // component={Input}
          />
			</FormControl>
			<ButtonWrap>
				<Button 
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
	mapPropsToValues({ email, password }){
		return {
			email: email || '',
			password: password || ''
		}
	},
  handleSubmit(values){
    console.log(values);
  }
})(Login)

export default class Form_Login extends Component {

	render() {
		return (
			<FormikForm />
		)
	}
}