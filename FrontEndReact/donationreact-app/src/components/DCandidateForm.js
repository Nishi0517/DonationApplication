import {
    Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
//import { React, useState,useRef } from "react";
import React, { useState, useEffect,useRef  } from "react";
import useForm from "./useForm";
import Select from "@material-ui/core/Select/Select";
import * as actions from "../actions/dCandidate";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin:{
    margin: theme.spacing(1),
  }
});

const initialFieldValues = {
  fullName: '',
  mobile: '',
  email: '',
  age: '',
  bloodGroup: '',
  address: '',
};

const DCandidateForm = ({ classes, ...props }) => {
  // const {values, setValues}=useState(initialFeildValues)

  //toast msg
  const { addToast } = useToasts()

    //validate()
    //validate({fullName:'Jenny'})
  const validate=(fieldValues = values)=>{
        let temp ={...errors}
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName?"":"This feild is required!!";
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile?"":"This feild is required!!";
        if('bllodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup?"":"This feild is required!!";
        if('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email)?"":"Email is not valid!!";
        setErrors({
            ...temp
        })
        if(fieldValues==values)
            return Object.values(temp).every(x=>x == "")
  }

  const { 
    values, 
    setValues, 
    errors,
    setErrors,
    handleInputChange,
    resetForm
 } = useForm(initialFieldValues,validate,props.setCurrentId);
  
//material-ui select drop down

const inputLabel = useRef(null);
const [labelWidth, setLabelWidth] = useState(0);
useEffect(()=>{
    setLabelWidth(inputLabel.current.offsetWidth);
},[]);
  

const handleSubmit = e=>{
    e.preventDefault();
    if(validate()) {
        const onSuccess = () =>
        { 
            resetForm();
            addToast("Submitted successfully!",{appearence:'success'})
        }
        if(props.currentId==0)
        {
            // props.createDCandidate(values,() => {alert('inserted!')})
            // props.createDCandidate(values,()=>{ window.alert('12312524Updated!!') });
            props.createDCandidate(values,onSuccess);
        console.log(values);
        alert('inserted sucessfully!');
        }
        else{
            // props.updateDCandidate(props.currentId,values,()=>{ window.alert('Updated!!') });
            props.updateDCandidate(props.currentId,values,onSuccess);
            alert('Record updated successfully');
        }
        
    }
}

useEffect(()=>{
    if(props.currentId!=0){
        setValues({
            ...props.dCandidatesList.find(x=>x.id==props.currentId)
        })
    }
},[props.currentId])

  return (
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            {...(errors.fullName &&  { error: true, helperText : errors.fullName})}
          />

          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email &&  { error: true, helperText : errors.email})}
          />
          <FormControl variant="outlined" 
          className={classes.formControl}
          {...(errors.bloodGroup &&  { error: true})}
          >
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>

            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              variant="outlined"
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="AB+">AB +ve</MenuItem>
              <MenuItem value="AB-">AB -ve</MenuItem>
              <MenuItem value="A+">A +ve</MenuItem>
              <MenuItem value="A-">A -ve</MenuItem>
              <MenuItem value="B+">B +ve</MenuItem>
              <MenuItem value="B-">B -ve</MenuItem>
              <MenuItem value="o+">o +ve</MenuItem>
              <MenuItem value="o+">o -ve</MenuItem>
            </Select>

            {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
          </FormControl>
          
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            {...(errors.mobile &&  { error: true, helperText : errors.mobile})}
          />

          <TextField
            name="age"
            variant="outlined"
            label="age"
            value={values.age}
            onChange={handleInputChange}
            {...(errors.age &&  { error: true, helperText : errors.age})}
          />
          <TextField
            name="address"
            variant="outlined"
            label="address"
            value={values.address}
            onChange={handleInputChange}
            {...(errors.address &&  { error: true, helperText : errors.address})}
          />
          <div>

            <Button variant="contained" color="primary"
            type="submit"className={classes.smMargin}>Submit</Button>
            <Button variant="contained" className={classes.smMargin}
            onClick={resetForm}
            >Reset</Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = state=>({
        
    dCandidatesList : state.dCandidate.list
    
})

const mapActionToProps ={
createDCandidate:actions.create,
updateDCandidate:actions.update
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DCandidateForm));
