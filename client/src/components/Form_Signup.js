import React, { Component } from 'react'
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import MyPaper from './mui/MyPaper';
import Grid from '@material-ui/core/Grid';
import { withFormik, Form, Field } from 'formik'
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

  state = {
    value: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.email !== this.props.email) {
      this.props.resetForm(nextProps);
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render(){
  let { touched, errors, values, handleChange, handleBlur, isValid, classes } 
    = this.props;

    return(
	<MyPaper form size_m>
		<Form>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={5}
          //  style={{background: 'pink'}}
           >
          <FormControl component="fieldset" required className={classes.formControl}>
            {/* <FormLabel component="legend">Category</FormLabel> */}
            <RadioGroup
              aria-label="category"
              name="category"
              value={this.state.value}
              onChange={this.handleChange}
              className={classes.group}
            >
              <FormControlLabel value="Musician" control={<Radio />} label="Musician" />
              <FormControlLabel value="Recording Studio" control={<Radio />} label="Recording Studio" />
            </RadioGroup>
            <FormHelperText>^Please select a category</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} 
          // style={{background: 'yellow'}}
          >
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
        </Grid>
        <Grid item xs={12} >
          <ButtonWrap>
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
})(withStyles(styles)(Signup));

export default class Form_Login extends Component {

	render() {
		return (
      <div>
			  <FormikForm />
      </div>
		)
	}
}