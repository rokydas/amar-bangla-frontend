import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    const profileInfo = { ...data, isAdmin: false };
    if (data.password === data.confirmPassword) {
      delete profileInfo.confirmPassword;

      fetch("http://localhost:5001/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const { email, name } = data.user;
            const newLoggedInInfo = { email, name };
            setLoggedInUser(newLoggedInInfo);
            localStorage.setItem("auth-token", data.token);
            navigate("/");
          } else {
            alert(data.msg);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      alert("Password and confirm password don't match.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h6 className="text-secondary mt-3">
          Your Name <span className="text-danger">*</span>
        </h6>
        <input
          type="text"
          placeholder="Name"
          className="form-control mt-3"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-danger">"Name" is not allowed to be empty</span>
        )}

        <h6 className="text-secondary mt-3">
          Your Email <span className="text-danger">*</span>
        </h6>
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-danger">
            "Email" is not allowed to be empty
          </span>
        )}

        <h6 className="text-secondary mt-3">
          Password <span className="text-danger">*</span>
        </h6>
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-danger">
            "Password" is not allowed to be empty
          </span>
        )}

        <h6 className="text-secondary mt-3">
          Confirm Password <span className="text-danger">*</span>
        </h6>
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <span className="text-danger">
            "Confirm Password" is not allowed to be empty
          </span>
        )}
        <br />
        {isLoading ? (
          <div
            className="spinner-border spinner-border-sm my-3"
            role="status"
          ></div>
        ) : (
          <button
            className="custom-large-btn mt-3 mx-auto"
          >
            Register
          </button>
        )}
      </form>
      <p className="mt-3">
        Already have an account? Please{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          login
        </Link>
      </p>
    </div>
  );
};

export default Register;
