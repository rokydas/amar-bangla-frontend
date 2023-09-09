import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ManageLearnBengaliContent = () => {
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
  const [firstImg, setFirstImg] = useState("");
  const [prevFirstImg, setPrevFirstImg] = useState("");
  const [secondImg, setSecondImg] = useState("");
  const [prevSecondImg, setPrevSecondImg] = useState("");
  const [thirdImg, setThirdImg] = useState("");
  const [prevThirdImg, setPrevThirdImg] = useState("");
  const [firstImgUplocading, setFirstImgUploading] = useState("");
  const [secondImgUplocading, setSecondImgUploading] = useState("");
  const [thirdImgUplocading, setThirdImgUploading] = useState("");
  const authToken = localStorage.getItem("auth-token");
  const [isDisableButton, setIsDisableButton] = useState(false);
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/learn-bengali/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setPrevFirstImg(data.learnBengali.firstImg);
          setPrevSecondImg(data.learnBengali.secondImg);
          setPrevThirdImg(data.learnBengali.thirdImg);
          setValue("title", data.learnBengali.title);
          setValue("description", data.learnBengali.description);
          setValue("firstDescription", data.learnBengali.firstDescription);
          setValue("secondDescription", data.learnBengali.secondDescription);
          setValue("thirdDescription", data.learnBengali.thirdDescription);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const learnBengaliContent = {
      ...data,
      firstImg,
      secondImg,
      thirdImg,
    };

    fetch(`${apiUrl}/learn-bengali/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(learnBengaliContent),
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

  function uploadImage(img, imgSerial) {
    if (img) {
      if (imgSerial === 1) {
        errors.firstImg = undefined;
        setFirstImgUploading(true);
        setFirstImg("");
      } else if (imgSerial === 2) {
        errors.secondImg = undefined;
        setSecondImgUploading(true);
        setSecondImg("");
      } else {
        errors.thirdImg = undefined;
        setThirdImgUploading(true);
        setThirdImg("");
      }

      setIsDisableButton(true);
      let imgData = new FormData();
      imgData.set("key", process.env.REACT_APP_IMG_BB_KEY);
      imgData.append("image", img);

      axios
        .post("https://api.imgbb.com/1/upload", imgData)
        .then((res) => {
          if (imgSerial === 1) {
            setFirstImg(res.data.data.display_url);
            setFirstImgUploading(false);
          } else if (imgSerial === 2) {
            setSecondImg(res.data.data.display_url);
            setSecondImgUploading(false);
          } else {
            setThirdImg(res.data.data.display_url);
            setThirdImgUploading(false);
          }
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
                src={firstImg ? firstImg : prevFirstImg}
                alt="first img"
              />
              <h6 className="text-secondary mt-3">
                Upload first image <span className="text-danger">*</span>
                {firstImg && <span className="text-success">Uploaded</span>}
                {firstImgUplocading && (
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
                disabled={firstImg}
                {...register("firstImg", { required: false })}
                onChange={(e) => uploadImage(e.target.files[0], 1)}
              />

              <img
                className="mt-5"
                width="100px"
                src={secondImg ? secondImg : prevSecondImg}
                alt="event"
              />
              <h6 className="text-secondary mt-3">
                Upload your image <span className="text-danger">*</span>
                {secondImg && <span className="text-success">Uploaded</span>}
                {secondImgUplocading && (
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
                disabled={secondImg}
                {...register("secondImg", { required: false })}
                onChange={(e) => uploadImage(e.target.files[0], 2)}
              />

              <img
                className="mt-5"
                width="100px"
                src={thirdImg ? thirdImg : prevThirdImg}
                alt="event"
              />
              <h6 className="text-secondary mt-3">
                Upload your image <span className="text-danger">*</span>
                {thirdImg && <span className="text-success">Uploaded</span>}
                {thirdImgUplocading && (
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
                disabled={thirdImg}
                {...register("thirdImg", { required: false })}
                onChange={(e) => uploadImage(e.target.files[0], 3)}
              />

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
              <textarea
                type="text"
                rows="7"
                placeholder="Description"
                className="form-control"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-danger">
                  "Description" is not allowed to be empty
                </span>
              )}

              {/* First Description */}
              <h6 className="text-secondary mt-3">
                First Description <span className="text-danger">*</span>
              </h6>
              <textarea
                type="text"
                rows="7"
                placeholder="First Description"
                className="form-control"
                {...register("firstDescription", { required: true })}
              />
              {errors.firstDescription && (
                <span className="text-danger">
                  "First Description" is not allowed to be empty
                </span>
              )}

              {/* Second Description */}
              <h6 className="text-secondary mt-3">
                Second Description <span className="text-danger">*</span>
              </h6>
              <textarea
                type="text"
                rows="7"
                placeholder="Second Description"
                className="form-control"
                {...register("secondDescription", { required: true })}
              />
              {errors.secondDescription && (
                <span className="text-danger">
                  "Second Description" is not allowed to be empty
                </span>
              )}

              {/* Third Description */}
              <h6 className="text-secondary mt-3">
                Third Description <span className="text-danger">*</span>
              </h6>
              <textarea
                type="text"
                rows="7"
                placeholder="Third Description"
                className="form-control"
                {...register("thirdDescription", { required: true })}
              />
              {errors.thirdDescription && (
                <span className="text-danger">
                  "Third Description" is not allowed to be empty
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
                Update Learn Bengali Content
              </button>
            )}
            <p className="my-3 text-danger">{error}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageLearnBengaliContent;
