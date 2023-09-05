import React, { useEffect, useState } from "react";
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
  const [banner, setBanner] = useState("");
  const [prevBanner, setPrevBanner] = useState("");
  const [leftImg, setLeftImg] = useState("");
  const [prevLeftImg, setPrevLeftImg] = useState("");
  const [rightImg, setRightImg] = useState("");
  const [prevRightImg, setPrevRightImg] = useState("");
  const [isDisableButton, setIsDisableButton] = useState(false);
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/home/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPrevBanner(data.home.banner);
          setPrevLeftImg(data.home.leftImg);
          setPrevRightImg(data.home.rightImg);
          setValue("topHeadline", data.home.topHeadline);
          setValue("topDescription", data.home.topDescription);
          setValue("leftHeadline", data.home.leftHeadline);
          setValue("leftDescription", data.home.leftDescription);
          setValue("rightHeadline", data.home.rightHeadline);
          setValue("rightDescription", data.home.rightDescription);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const homeContent = {
      ...data,
      banner: banner ? banner : prevBanner,
      leftImg: leftImg ? leftImg : prevLeftImg,
      rightImg: rightImg ? rightImg : prevRightImg,
    };

    fetch(`${apiUrl}/home/update`, {
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
                img={banner}
                setImg={setBanner}
                prevImg={prevBanner}
              />
              <ImageBlock
                isDisableButton={isDisableButton}
                setIsDisableButton={setIsDisableButton}
                name="leftImg"
                title="Left Image"
                img={leftImg}
                setImg={setLeftImg}
                prevImg={prevLeftImg}
              />
              <ImageBlock
                isDisableButton={isDisableButton}
                setIsDisableButton={setIsDisableButton}
                name="rightImg"
                title="Right Image"
                img={rightImg}
                setImg={setRightImg}
                prevImg={prevRightImg}
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
              <textarea
                type="text"
                rows="7"
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
              <textarea
                type="text"
                rows="7"
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
              <textarea
                type="text"
                rows="7"
                placeholder="Left Description"
                className="form-control"
                {...register("leftDescription", { required: true })}
              />
              {errors.leftDescription && (
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
