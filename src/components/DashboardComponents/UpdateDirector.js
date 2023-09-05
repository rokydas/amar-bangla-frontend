import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDirector = () => {
  const { id } = useParams();

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
  const [img, setImg] = useState("");
  const [prevImg, setPrevImg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(false);
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/director/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPrevImg(data.director.img);
          setValue("img", data.director.img);
          setValue("name", data.director.name);
          setValue("email", data.director.email);
          setValue("designation", data.director.designation);
          setValue("profession", data.director.profession);
          setValue("facebook", data.director.facebook);
          setValue("twitter", data.director.twitter);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const director = { ...data, img: img ? img : prevImg };

    fetch(`${apiUrl}/director/update/${id}`, {
      method: "PUT",
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
          navigate("/dashboard/manage-director");
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
      imgData.set("key", process.env.REACT_APP_IMG_BB_KEY);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <img
                className="mt-5"
                width="100px"
                src={img ? img : prevImg}
                alt="director"
              />
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
                {...register("img", { required: false })}
                onChange={(e) => uploadImage(e.target.files[0])}
              />

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

              <h6 className="text-secondary mt-3">
                Profession <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Profession"
                className="form-control"
                {...register("profession", { required: true })}
              />
              {errors.profession && (
                <span className="text-danger">
                  "Profession" is not allowed to be empty
                </span>
              )}

              <h6 className="text-secondary mt-3">Facebook</h6>
              <input
                type="text"
                placeholder="Facebook"
                className="form-control"
                {...register("facebook", { required: false })}
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
                Update Director
              </button>
            )}
            <p className="my-3 text-danger">{error}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateDirector;
