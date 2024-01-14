import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UseForms = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm();
  // {defaultValues: {
  //     firstName: "Kalvium",
  //     lastName: "LPU",
  //     email: "email@email.com",
  // }}
  console.log(errors);
  // console.log(Object.keys(errors).map((key) => errors[key].message));

  console.log(watch("firstName"));
  console.log("isSubmitSuccessful: ", isSubmitSuccessful);
  console.log("isSubmitted", isSubmitted);

  const FormSubmitHandler = (data) => {
    console.log("data: ", data);
    trigger()
  };

  const toastHandler =() => {
    if (isSubmitSuccessful) {
      toast.success('Form Submitted Successfully', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })}else{
        for (const errorKey in errors) {
          const errorMessage = errors[errorKey]?.message;
          if (errorMessage) {
            toast.error(errorMessage, {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
            console.log('errorKey', errorKey)
          }
        }
      }
    }
    console.log('Handler', toastHandler)
    
    toastHandler()
    

  return (
    <div className="form-container">
      <ToastContainer/>
      <fieldset>
        <legend>Fill this form</legend>
        <form onSubmit={handleSubmit(FormSubmitHandler)}>
          {isSubmitSuccessful && (
            <div className="success">
              <p>Registration Successful!</p>
            </div>
          )}  

          <label>First Name :</label>
          <input
            type="text"
            name="firstName"
            {...register("firstName", {
              required: "Fill First Name",
              minLength: { value: 4, message: "Minimum 4 characters required" },
              maxLength: { value: 8, message: "Maximum 8 characters allowed" },
            })}
          />
          {/* {errors.firstName && <p className="err">{errors.firstName.message}</p>} */}
          <p className="err">{errors.firstName?.message}</p>
          <label>Last Name :</label>
          <input
            type="text"
            name="lastName"
            {...register("lastName", {
              required: "Fill Last Name",
              minLength: { value: 4, message: "Minimum 4 characters required" },
            })}
          />
          <p className="err">{errors.lastName?.message}</p>

          <label>Email :</label>
          <input
            type="email"
            name="email"
            {...register("email", {
              required: "Enter Email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email",
              },
            })}
          />
          <p className="err">{errors.email?.message}</p>

          <label>Password :</label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: "Enter Password",
              minLength: "Minimum 8 characters required",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
                message: "Invalid Password",
              },
            })}
          />
          <p className="err">{errors.password?.message}</p>

          <input type="submit" value={"Register"}  />
          <button
            onClick={() => {
              reset();
            }}
          >
            RESET
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default UseForms;
