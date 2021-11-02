import { useEffect, useState } from "react";

export default function TypeSelector({ type, setType }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (type === "match") {
      setSelected("매치");
    }
    if (type === "trade") {
      setSelected("거래");
    }
  }, []);

  return (
    <ul>
      <li
        onClick={() => {
          setIsDropOpen(true);
          setSelected("분류");
        }}
      >
        {selected}
      </li>
      {isDropOpen ? (
        <>
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setType("match");
            }}
          >
            매치
          </li>
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setType("trade");
            }}
          >
            거래
          </li>
        </>
      ) : null}
    </ul>
  );
}
