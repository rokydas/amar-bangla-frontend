import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiDeleteBin6Fill } from "react-icons/ri";

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const authToken = localStorage.getItem("auth-token");
  const [banner, setBanner] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [date, setDate] = useState(new Date());
  const [gallery, setGallery] = useState([]);

  const onSubmit = (data) => {
    setIsLoading(true);
    const socialEvent = { ...data, banner, date, gallery };
    const apiUrl = process.env.REACT_APP_API_ROOT;

    fetch(`${apiUrl}/event/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(socialEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          alert(data.msg);
          reset();
          setBanner("");
          setGallery([]);
          setError("");
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  function uploadBanner(banner) {
    if (banner) {
      errors.banner = undefined;
      setIsUploading(true);
      setBanner("");
      setIsDisableButton(true);
      let imgData = new FormData();
      imgData.set("key", process.env.REACT_APP_IMG_BB_KEY);
      imgData.append("image", banner);

      axios
        .post("https://api.imgbb.com/1/upload", imgData)
        .then((res) => {
          setBanner(res.data.data.display_url);
          setIsUploading(false);
          setIsDisableButton(false);
        })
        .catch((error) => console.log(error));
    }
  }

  function uploadGalleryImg(img, index) {
    if (img) {
      let imgData = new FormData();
      imgData.set("key", process.env.REACT_APP_IMG_BB_KEY);
      imgData.append("image", img);

      axios
        .post("https://api.imgbb.com/1/upload", imgData)
        .then((res) => {
          const newGallery = [...gallery];
          newGallery[index] = res.data.data.display_url;
          setGallery(newGallery);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h6 className="text-secondary mt-3">
              {banner && <img src={banner} width="100" alt="Banner" />}
              <p className="mt-2">
                Upload Event Banner <span className="text-danger">*</span>
              </p>
              {banner && <span className="text-success">Uploaded</span>}
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
              disabled={banner}
              {...register("banner", { required: true })}
              onChange={(e) => uploadBanner(e.target.files[0])}
            />
            {errors.banner && (
              <span className="text-danger">Please upload the banner</span>
            )}
            <h6 className="text-secondary mt-3">
              Date <span className="text-danger">*</span>
            </h6>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
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
            <h6 className="text-secondary mt-3">
              Description
            </h6>
            <textarea
              type="text"
              placeholder="Description"
              rows="7"
              className="form-control"
              {...register("description", { required: false })}
            />

            <h6 className="text-secondary mt-3">
              Gallery <span className="text-danger">*</span>
            </h6>
            {gallery.map((img, index) => (
              <div className="my-3">
                {img ? (
                  <img src={img} className="me-3" width="100" alt="Banner" />
                ) : (
                  <input
                    className=" mt-2"
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadGalleryImg(e.target.files[0], index)}
                  />
                )}
                <RiDeleteBin6Fill
                  size={25}
                  onClick={() => {
                    const newGallery = [...gallery];
                    newGallery.splice(index, 1);
                    setGallery(newGallery);
                  }}
                />
              </div>
            ))}
            <div
              onClick={() => {
                const newGallery = [...gallery];
                newGallery.push("");
                setGallery(newGallery);
              }}
              className="btn btn-primary"
            >
              Add Image
            </div>
            <br />
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
                Add Event
              </button>
            )}
            <p className="my-3 text-danger">{error}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
