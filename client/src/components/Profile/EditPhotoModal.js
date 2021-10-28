import axios from "axios";
import AWS from "aws-sdk";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../modules/userInfo";

export default function EditPhotoModal({
  isModalOpen,
  openModalHandler,
  prevPhoto,
}) {
  const dispatch = useDispatch();
  const [File, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(prevPhoto);

  const imgOnchange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    const imageURL = URL.createObjectURL(imageFile);
    setPreview(imageURL);
  };

  const ACCESS_KEY = "AKIA6LEUKF6HOQL5GBPL";
  const SECRET_ACCESS_KEY = "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";
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "winnersrecordimagestorage";
  const bucketurl =
    "https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com";

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
      ContentType: "image",
    };
    myBucket.putObject(params).on("success", (res) => {
      console.log(res);
      const path = res;
      setImg(`${bucketurl}${path}`);
      handleEdit();
    });
  };

  const handleEdit = () => {
    const oldToken = localStorage.getItem("token");
    axios
      .put(
        "http://localhost:8080/auth/img",
        { img },
        { headers: { authorization: `Bearer ${oldToken}` } }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.removeItem("token", oldToken);
        localStorage.setItem("token", token);
        dispatch(setUserInfo(userdata));
        setFile(null);
        setImg(null);
        setPreview(null);
        openModalHandler();
      });
  };

  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div>
              <input
                type="file"
                accept="image/*"
                name="file"
                onChange={(e) => imgOnchange(e)}
              />
              <div>
                <img src={preview} />
              </div>
            </div>
            <div className="modal--btnContainer">
              <button onClick={openModalHandler}>돌아가기</button>
              <button
                onClick={() => {
                  uploadFile(File);
                }}
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
