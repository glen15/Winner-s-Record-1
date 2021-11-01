import { useEffect, useRef, useState } from "react";

const { kakao } = window;

const PostMap = ({
  place = "37.5161996814031|127.075939572603|서울 송파구 올림픽로 25|서울종합운동장|서울 송파구 잠실동",
}) => {
  // '위도|경도|주소|빌딩이름|리스트에서 보일 주소'

  const container = useRef(null);

  useEffect(() => {
    const data = place.split("|");

    const location = new kakao.maps.LatLng(data[0], data[1]);

    const map = new kakao.maps.Map(container.current, {
        center: location,
        level: 5,
      }),
      marker = new kakao.maps.Marker({
        map,
        position: location,
      }),
      infowindow = new kakao.maps.InfoWindow({
        map,
        position: new kakao.maps.LatLng(Number(data[0]) + 0.0015, data[1]),
        content: `<div class="map--infowindow">${
          data[3] === "null" ? data[2] : data[3]
        }</div>`,
        removable: true,
      });
  }, []);

  return (
    <div className="post--map">
      <div className="post--map--container">
        <div className="post--map" ref={container} />
      </div>
    </div>
  );
};

export default PostMap;
