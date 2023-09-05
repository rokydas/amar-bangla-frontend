import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ManageMembershipContent = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authToken = localStorage.getItem("auth-token");
  const [isDisableButton, setIsDisableButton] = useState(false);
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/membership/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setValue("title", data.membership.title);
          setValue("description", data.membership.description);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const membershipContent = {
      ...data
    };

    fetch(`${apiUrl}/membership/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(membershipContent),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          alert(data.msg);
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Title */}
              <h6 className="text-secondary mt-3">
                Title <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Title"
                className="form-control"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-danger">
                  "Title" is not allowed to be empty
                </span>
              )}

              {/* Description */}
              <h6 className="text-secondary mt-3">
                Description <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Description"
                className="form-control"
                {...register("description", { required: true })}
              />
              {errors.topDescription && (
                <span className="text-danger">
                  "Description" is not allowed to be empty
                </span>
              )}

            </form>
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm my-3"
                role="status"
              ></div>
            ) : (
              <button
                disabled={isDisableButton}
                className="custom-large-btn mt-3 mx-auto"
              >
                Update Membership Content
              </button>
            )}
            <p className="my-3 text-danger">{error}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageMembershipContent;
