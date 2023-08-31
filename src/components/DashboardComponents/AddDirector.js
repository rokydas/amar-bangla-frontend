import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddDirector = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const authToken = localStorage.getItem("auth-token");
  const [img, setImg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    const director = { ...data, img };
    const apiUrl = process.env.REACT_APP_API_ROOT;

    fetch(`${apiUrl}/director/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(director),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          alert(data.msg);
          reset();
          setImg("");
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  function uploadImage(img) {
    if (img) {
      errors.img = undefined;
      setIsUploading(true);
      setImg("");
      setIsDisableButton(true);
      let imgData = new FormData();
      imgData.set("key", "eb1530acc816b285faadaf680e0152b7");
      imgData.append("image", img);

      axios
        .post("https://api.imgbb.com/1/upload", imgData)
        .then((res) => {
          setImg(res.data.data.display_url);
          setIsUploading(false);
          setIsDisableButton(false);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className="text-secondary mt-3">
              Upload your image <span className="text-danger">*</span>
              {img && <span className="text-success">Uploaded</span>}
              {isUploading && (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              )}
            </h6>
            <input
              className="form-control mt-2"
              type="file"
              accept="image/*"
              disabled={img}
              {...register("img", { required: true })}
              onChange={(e) => uploadImage(e.target.files[0])}
            />
            {errors.img && (
              <span className="text-danger">Please upload director image</span>
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
              Name <span className="text-danger">*</span>
            </h6>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">
                "Name" is not allowed to be empty
              </span>
            )}
            <h6 className="text-secondary mt-3">
              Designation <span className="text-danger">*</span>
            </h6>
            <input
              type="text"
              placeholder="Designation"
              className="form-control"
              {...register("designation", { required: true })}
            />
            {errors.designation && (
              <span className="text-danger">
                "Designation" is not allowed to be empty
              </span>
            )}

            <h6 className="text-secondary mt-3">Facebook</h6>
            <input
              type="text"
              placeholder="Facebook"
              className="form-control"
              {...register("facebook", { required: false })}
            />

            <h6 className="text-secondary mt-3">Linkedin</h6>
            <input
              type="text"
              placeholder="Linkedin"
              className="form-control"
              {...register("linkedin", { required: false })}
            />

            <h6 className="text-secondary mt-3">Twitter</h6>
            <input
              type="text"
              placeholder="Twitter"
              className="form-control"
              {...register("twitter", { required: false })}
            />
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
              Add Director
            </button>
          )}
          <p className="my-3 text-danger">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default AddDirector;
