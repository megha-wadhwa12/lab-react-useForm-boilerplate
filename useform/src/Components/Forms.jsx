import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Forms = () => {
  // state to check if form is submitted
  const [formSubmit, setFormSubmit] = useState(false);

  // state to keep track of all errors
  const [formErr, setFormErr] = useState({});

  // state to keep all form data
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  // console.log(formData);

  //     const firstNameHandler = (e)=>{
  //         setFormData({
  //         ...form Data,
  //         firstName: e.target.value,
  // })
  //     }
  //     const lastNameHandler = (e)=>{
  //         setFormData({
  //             ...formData,
  //             lastName: e.target.value,
  //         })
  //     }
  //     const emailHandler = (e)=>{
  //         setFormData({
  //             ...formData,
  //             email: e.target.value,
  //         })
  //     }
  //     const numberHandler = (e)=>{
  //         setFormData({
  //             ...formData,
  //             phone: e.target.value,
  //         })
  //     }
  //handle all inputs in form
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    // console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);

    let errors = validate(formData);
    setFormErr(errors);
    // console.log("errors: " errors);

    let errKeyArray = Object.keys(errors);
    // console.log(errKeyArray)

    if (errKeyArray.length == 0) {
      setFormSubmit(true);
      toast.success("Yayyyyy !! Form Submitted !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setFormSubmit(false);
      errKeyArray.forEach((key) => {
        toast.error(errors[key], {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          height: "200px", 
        });
      });
    }
  };

  const validate = (data) => {
    let err = {};

    if (data.firstName.trim() == "") {
      err.firstName = "Enter your First Name";
    }
    if (data.lastName.trim() == "") {
      err.lastName = "Enter your Last Name";
    }
    if (data.email.trim() == "") {
      err.email = "Enter your email";
    }
    if (data.phone.trim().length != 10) {
      err.phone = "Enter your 10-Digit Phone No.";
    }
    console.log(err);
    return err;
  };

  return (
    <div className="form-container">
      <ToastContainer/>
      <fieldset>
        <legend>Fill this form</legend>
        <form
          onSubmit={(e) => {
            formSubmitHandler(e);
          }}
        >
          {formSubmit && (
            <div className="success">
              <p>Registration Successful!</p>
            </div>
          )}
          <div>
            <label>First Name :</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {formErr.firstName && <p className="err">Enter your Name</p>}
          </div>
          <div>
            <label>Last Name :</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {formErr.lastName && <p className="err">Enter your Last Name</p>}
          </div>
          <div>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {formErr.email && <p className="err">Enter your Email</p>}
          </div>
          <div>
            <label>Phone Number :</label>
            <input
              type="number"
              name="phone"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {formErr.phone && (
              <p className="err">Enter your 10-Digit Phone No.</p>
            )}
          </div>

          <input type="submit" value={"Register"} />
        </form>
      </fieldset>
    </div>
  );
};

export default Forms;
