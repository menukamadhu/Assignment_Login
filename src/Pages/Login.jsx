import React, { useEffect, useState, useRef } from "react";
import LoginPic from "../Assets/Login.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthenticationServices from "../Services/AuthenticationServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Login = () => {
  // UseStates
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [firstName, setFirstName] = useState("");
  const [open, setOpen] = useState(false);
  const [equal, setEqual] = useState(true);
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    phone: "",
    newusername: "",
    newpassword: "",
    confirm_password: "",
  });

  // Show Password click on icon
  const [showPassword, setShowPassword] = useState(false);
  const showPwd = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  //   React hook form for show error message
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   Axios method to Login
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const user = {
      username: data.username,
      password: data.password,
    };
    console.log(user);
    try {
      const result = await AuthenticationServices.userLogin(user);
      if (result.status === 200) {
        const { firstName } = result.data;
        setFirstName(firstName);
        // Save data to local storage
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({
            firstname: firstName,
            username: data.username,
            password: data.password,
          })
        );
        navigate("/home");
      } else {
        toast.error("Incorrect E-mail or Password!");
        setTimeout(async () => {
          e.target.reset();
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred While Deleting Your Server");
    }
  };

  //   Register Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitRegister = async (data, e) => {
    e.preventDefault();
    console.log("aaaaaaaaaaaaaa", data.newpassword);
    if (data.newpassword != data.confirm_password) {
      setEqual(false);
    } else {
      const newuser = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        newusername: data.newusername,
        newpassword: data.newpassword,
      };
      console.log(newuser);
      toast.success("Task has been added successfully");
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="relative flex bg-white md:flex-col-reverse">
        {/* Welcome Section */}

        <section name="Welcome" className="">
          <div className="relative h-screen md:w-2/3 hero bg-black opacity-80">
            <img
              src={LoginPic}
              alt=""
              className="hidden object-fill w-full h-full md:block opacity-70"
            />
            <div className="bg-black opacity-70 hero-overlay"></div>
            <div className="absolute left-20 bottom-32">
              <h1 className="mb-5 text-white text-7xl ">
                Welcome to the Login page
              </h1>
              <p className="mb-5 text-2xl text-white">
                Please enter your Username and Password.
              </p>
            </div>

            {/* Add social media icons */}

            <div className="absolute hidden grid-flow-col gap-8 bottom-10 md:grid left-1/3">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-linkedin"
                  viewBox="0 0 16 16"
                  className="duration-300 cursor-pointer hover:scale-110">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-instagram"
                  viewBox="0 0 16 16"
                  className="duration-300 cursor-pointer hover:scale-110">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="duration-300 cursor-pointer fill-current hover:scale-110">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="duration-300 cursor-pointer fill-current hover:scale-110">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="duration-300 cursor-pointer fill-current hover:scale-110">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Login Section */}

        <section name="Login">
          <div className="absolute top-0 flex flex-col justify-between w-full h-full p-20 py-40 bg-white md:w-1/3 md:left-2/3">
            <div className="flex flex-col">
              <h2 class="text-5xl font-bold text-blue-800">Login</h2>
              <p class="mt-4 text-sm text-blue-600">
                If you already a member, easily log in
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* Form */}

              <form
                action=""
                class="flex flex-col gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  required
                  id="outlined-required"
                  label="username"
                  variant="outlined"
                  name="username"
                  {...register("username", {
                    required: true,
                  })}
                />
                {errors.username?.type === "required" && (
                  <p className="text-red-600 text-sm">Username is required</p>
                )}

                <div class="relative">
                  <TextField
                    required
                    id="outlined-required"
                    label="password"
                    variant="outlined"
                    className="w-full"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    onClick={showPwd}
                    class="absolute duration-300 bi bi-eye top-1/3 right-3 hover:scale-125 cursor-pointer"
                    viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm">Password is required</p>
                )}

                <div className="flex items-center justify-center md:pt-8">
                  <Button variant="contained" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </div>

            {/* Forgot password */}

            <div class="md:pb-12 pb-4 border-b border-gray-400">
              <a class="text-sm text-blue-700 hover:underline" href="">
                Forgot your password?
              </a>
            </div>

            {/* Register */}

            <div className="flex flex-row items-center justify-between">
              <p className="text-sm text-gray-600">Don't have an account?</p>
              <Button variant="outlined" size="small" onClick={handleClickOpen}>
                Register
              </Button>
            </div>
          </div>

          {/* Register */}
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">Register</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <form
                    action=""
                    onSubmit={handleSubmit(onSubmitRegister)}
                    className="flex flex-col gap-4 p-2">
                    <TextField
                      required
                      id="outlined-required"
                      label="Full Name"
                      variant="outlined"
                      name="fullname"
                      {...register("fullname", {
                        required: true,
                      })}
                    />
                    {errors.fullname?.type === "required" && (
                      <p className="text-red-600 text-sm">
                        Please enter a name
                      </p>
                    )}
                    <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      variant="outlined"
                      name="email"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-600 text-sm">
                        Please enter a valid email
                      </p>
                    )}
                    <TextField
                      required
                      id="outlined-required"
                      label="Phone"
                      variant="outlined"
                      name="phone"
                      {...register("phone", {
                        required: true,
                      })}
                    />
                    {errors.phone?.type === "required" && (
                      <p className="text-red-600 text-sm">
                        Please enter a phone number
                      </p>
                    )}
                    <TextField
                      required
                      id="outlined-required"
                      label="User Name"
                      variant="outlined"
                      name="newusername"
                      {...register("newusername", {
                        required: true,
                      })}
                    />
                    {errors.newusername?.type === "required" && (
                      <p className="text-red-600 text-sm">
                        Please enter a username
                      </p>
                    )}
                    <TextField
                      required
                      id="outlined-required"
                      label="Password"
                      variant="outlined"
                      name="newpassword"
                      type="password"
                      {...register("newpassword", {
                        required: true,
                      })}
                    />
                    {errors.newpassword?.type === "required" && (
                      <p className="text-red-600 text-sm">
                        Please enter a password
                      </p>
                    )}

                    <div class="relative">
                      <TextField
                        required
                        id="outlined-required"
                        label="Confirm Password"
                        variant="outlined"
                        className="w-full"
                        name="confirm_password"
                        type={showPassword ? "text" : "password"}
                        {...register("confirm_password", {
                          required: true,
                        })}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        onClick={showPwd}
                        class="absolute duration-300 bi bi-eye top-1/3 right-3 hover:scale-125 cursor-pointer"
                        viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </div>
                    {errors.confirm_password && (
                      <p className="text-red-600 text-sm">
                        Please enter same password
                      </p>
                    )}
                    {!equal && (
                      <p className="text-red-600">Please Enter Same Password</p>
                    )}

                    <div className="flex flex-row items-end justify-end gap-4 pt-2">
                      <Button autoFocus onClick={handleClose}>
                        Close
                      </Button>
                      <Button type="submit" autoFocus variant="outlined">
                        Register
                      </Button>
                    </div>
                  </form>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
