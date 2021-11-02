import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const prevPage = useSelector((state) => state.prevPage);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
    setErrorMessage("");
  };

  const handleLogin = () => {
    const { email, password } = loginInfo;
    axios
      .post(
        "http://localhost:8080/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.setItem("token", token);
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
          dispatch(setLogin());
          dispatch(setUserInfo(userdata));
          history.push(prevPage);
        }
      })
      .catch((err) => {
        setErrorMessage("이메일 또는 비밀번호를 확인해주세요");
      });
  };

  const handleKakao = (e) => {
    e.preventDefault();
    window.location.assign(
      "https://kauth.kakao.com/oauth/authorize?client_id=42184b4ebbf71c527914d5cf6269aae0&redirect_uri=http://localhost:3000/redirect&&response_type=code"
    );
  };

  const handleNaver = () => {
    axios
      .get("http://localhost:8080/auth/naver/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogle = () => {
    axios
      .get("http://localhost:8080/auth/google/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter" && isValid) {
      handleLogin();
    }
  };

  const isValid = loginInfo.email && loginInfo.password;

  return (
    <div className="login--container">
      <div className="login--logo" onClick={() => history.push("/main")}>
        로고
      </div>
      <div className="login--inputcontainer">
        <input
          className="login--input"
          type="email"
          placeholder="E-mail"
          onChange={handleInputValue("email")}
          onKeyPress={handleKeyPress}
        />
        <input
          className="login--input"
          type="password"
          placeholder="비밀번호"
          onChange={handleInputValue("password")}
          onKeyPress={handleKeyPress}
        />
        <div className="login--error">{errorMessage}</div>
      </div>
      <div className="login--btncontainer">
        {isValid ? (
          <button className="login--btn-ok" onClick={handleLogin}>
            로그인
          </button>
        ) : (
          <button className="login--btn">로그인</button>
        )}
        <button className="login--btn" onClick={() => history.push("/signup")}>
          회원가입
        </button>
      </div>
      <div className="login--socialcontainer">
        <img
          className="login--socialbtn"
          src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%86%8C%EC%85%9C%EC%95%84%EC%9D%B4%EC%BD%98/btn_kakao.png"
          onClick={handleKakao}
        />
        <img
          className="login--socialbtn"
          src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%86%8C%EC%85%9C%EC%95%84%EC%9D%B4%EC%BD%98/naver.png"
          onClick={handleNaver}
        />
        <img
          className="login--socialbtn"
          src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%86%8C%EC%85%9C%EC%95%84%EC%9D%B4%EC%BD%98/google-icon-styl.png"
          onClick={handleGoogle}
        />
      </div>
      <div className="login--copyright">
        © Copyright 2021 Team MeltingBrain. All rights reserved.
      </div>
    </div>
  );
}
