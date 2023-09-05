import axios from "axios";
import React, { useState } from "react";

const ImageBlock = ({
  isDisableButton,
  setIsDisableButton,
  name,
  title,
  img,
  setImg,
  prevImg,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  function uploadImage(img) {
    if (img) {
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
    <div>
      <img
        className="mt-5"
        width="100px"
        src={img ? img : prevImg}
        alt="image"
      />
      <h6 className="text-secondary mt-3">
        Upload {title} <span className="text-danger">*</span>
        {img && <span className="text-success">Uploaded</span>}
        {isUploading && (
          <div className="spinner-border spinner-border-sm" role="status"></div>
        )}
      </h6>
      <input
        className="form-control mt-2"
        type="file"
        accept="image/*"
        disabled={img}
        onChange={(e) => uploadImage(e.target.files[0])}
      />
    </div>
  );
};

export default ImageBlock;
