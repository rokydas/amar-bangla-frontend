import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImageBlock from "../CommonComponents/ImageBlock/ImageBlock";

const ManageAboutContent = () => {
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
  const [isDisableButton, setIsDisableButton] = useState(false);
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/about/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPrevImg(data.about.img);
          setValue("headline", data.about.headline);
          setValue("description", data.about.description);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const aboutContent = {
      ...data,
      img: img ? img : prevImg,
    };

    fetch(`${apiUrl}/about/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(aboutContent),
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
              <ImageBlock
                isDisableButton={isDisableButton}
                setIsDisableButton={setIsDisableButton}
                name="img"
                title="Image"
                img={img}
                setImg={setImg}
                prevImg={prevImg}
              />

              {/* Headline */}
              <h6 className="text-secondary mt-3">
                Headline <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Headline"
                className="form-control"
                {...register("headline", { required: true })}
              />
              {errors.topHeadline && (
                <span className="text-danger">
                  "Headline" is not allowed to be empty
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
                Update About Content
              </button>
            )}
            <p className="my-3 text-danger">{error}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageAboutContent;
