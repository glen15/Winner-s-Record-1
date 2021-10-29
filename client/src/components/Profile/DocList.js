import PostList from "../Main/PostList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DocList({ userId, isMypage }) {
  const [list, setList] = useState([]);
  const handleCreatedList = () => {
    axios
      .get(`http://localhost:8080/doc?hostId=${userId}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  const handleLikeList = () => {
    axios
      .get(`http://localhost:8080/like/${userId}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  const handleProgressList = () => {
    axios
      .get(`http://localhost:8080/doc?guestId=${userId}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  useEffect(() => {
    handleCreatedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="doclist">
      <ul>
        <li onClick={handleCreatedList}>작성글</li>
        <li onClick={handleProgressList}>진행중</li>
        {isMypage ? <li onClick={handleLikeList}>관심글</li> : null}
      </ul>
      {list.length ? (
        <PostList postList={list} />
      ) : (
        "게시글이 존재하지 않습니다"
      )}
    </div>
  );
}
