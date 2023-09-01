import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImageBlock from "../CommonComponents/ImageBlock/ImageBlock";

const ManageHomeContent = () => {
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

  const onSubmit = (data) => {
    setIsLoading(true);
    const homeContent = { ...data, img: img ? img : prevImg };

    fetch(``, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(homeContent),
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
                name="banner"
                title="Banner"
              />
              <ImageBlock
                isDisableButton={isDisableButton}
                setIsDisableButton={setIsDisableButton}
                name="leftImg"
                title="Left Image"
              />
              <ImageBlock
                isDisableButton={isDisableButton}
                setIsDisableButton={setIsDisableButton}
                name="rightImg"
                title="Right Image"
              />

              {/* Top Headline */}
              <h6 className="text-secondary mt-3">
                Top Headline <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Top Headline"
                className="form-control"
                {...register("topHeadline", { required: true })}
              />
              {errors.topHeadline && (
                <span className="text-danger">
                  "Top Headline" is not allowed to be empty
                </span>
              )}

              {/* Top Description */}
              <h6 className="text-secondary mt-3">
                Top Description <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Top Description"
                className="form-control"
                {...register("topDescription", { required: true })}
              />
              {errors.topDescription && (
                <span className="text-danger">
                  "Top Description" is not allowed to be empty
                </span>
              )}

              {/* Right Headline */}
              <h6 className="text-secondary mt-3">
                Right Headline <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Right Headline"
                className="form-control"
                {...register("rightHeadline", { required: true })}
              />
              {errors.rightHeadline && (
                <span className="text-danger">
                  "Right Headline" is not allowed to be empty
                </span>
              )}

              {/* Right Description */}
              <h6 className="text-secondary mt-3">
                Right Description <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Right Description"
                className="form-control"
                {...register("rightDescription", { required: true })}
              />
              {errors.rightDescription && (
                <span className="text-danger">
                  "Right Description" is not allowed to be empty
                </span>
              )}

              {/* Left Headline */}
              <h6 className="text-secondary mt-3">
                Left Headline <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Left Headline"
                className="form-control"
                {...register("leftHeadline", { required: true })}
              />
              {errors.leftHeadline && (
                <span className="text-danger">
                  "Left Headline" is not allowed to be empty
                </span>
              )}

              {/* Left Description */}
              <h6 className="text-secondary mt-3">
                Left Description <span className="text-danger">*</span>
              </h6>
              <input
                type="text"
                placeholder="Left Description"
                className="form-control"
                {...register("leftDescription", { required: true })}
              />
              {errors.leftHeadline && (
                <span className="text-danger">
                  "Left Description" is not allowed to be empty
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
                Update Home Content
              </button>
            )}
            <p className="my-3 text-danger">{error}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageHomeContent;
