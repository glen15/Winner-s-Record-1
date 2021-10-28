import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const FixBtn = ({ fixed, setIsModalActive, setModalText }) => {
  const { postId } = useParams();
  const history = useHistory();

  const clickHandler = () => {
    if (fixed.length < 1) {
      setModalText("상대를 지정해주세요.");
      setIsModalActive(true);
    } else {
      const Authorization = `Bearer ${localStorage.getItem("token")}`;
      axios
        .put(
          `http://localhost:8080/doc/${postId}`,
          { status: "진행" },
          { headers: { Authorization } }
        )
        .then((res) => {
          console.log(res.data);
          history.push(`/post/${postId}`);
          setModalText("상대가 지정되었습니다.");
          setIsModalActive(true);
          // 상대가 확정되었습니다.
          // 닫기 모달
        });
    }
  };
  return (
    <div className={`entry--primary--btn`} onClick={clickHandler}>
      확정 완료
    </div>
  );
};

const ApplyBtn = ({
  postId,
  fixed,
  setApplied,
  setLoginModal,
  setIsModalActive,
  setModalText,
}) => {
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));
  const clickHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (
      fixed.filter((userData) => {
        return userData.userId === userInfo.userId;
      }).length
    ) {
      setModalText("신청자 목록을 확인해주세요.");
      setIsModalActive(true);
    } else {
      const Authorization = `Bearer ${localStorage.getItem("token")}`;
      axios
        .put(
          `http://localhost:8080/entry/${postId}`,
          {
            userId: userInfo.userId,
          },
          {
            headers: { Authorization },
          }
        )
        .then((res) => {
          const applied = res.data.data.filter((e) => {
            return e.status === "대기" ? true : false;
          });
          setApplied(applied);
        });
    }
  };

  return (
    <div className="entry--primary--btn" onClick={clickHandler}>
      신청
    </div>
  );
};

export { FixBtn, ApplyBtn };
