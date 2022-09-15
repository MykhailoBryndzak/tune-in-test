import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StationListContext } from "../../App";
import "./styles.scss";

enum SortBy {
  POPULARITY = "popularity",
  RELIABILITY = "reliability",
}

export const StationList = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(SortBy.RELIABILITY);

  const stationList = useContext(StationListContext).sort(function (a, b) {
    return b[sortBy] - a[sortBy];
  });

  const handleStationClick = (stationId: string) => {
    navigate("/" + stationId);
  };

  return (
    <div className="stationListPage">
      <h1 className="title">TuneIn Radio List</h1>
      <div>
        <label htmlFor="station">
          <b>SortBy:</b>
        </label>
        <input
          className="radioBtn"
          type="radio"
          value={SortBy.POPULARITY}
          checked={sortBy === SortBy.POPULARITY}
          onChange={() => setSortBy(SortBy.POPULARITY)}
        />
        Popularity
        <input
          className="radioBtn"
          type="radio"
          value={SortBy.RELIABILITY}
          checked={sortBy === SortBy.RELIABILITY}
          onChange={() => setSortBy(SortBy.RELIABILITY)}
        />
        Reliability
      </div>

      {stationList.map((item) => {
        return (
          <div
            className="station"
            key={item.id}
            onClick={() => handleStationClick(item.id)}
          >
            <img className="stationLogo" src={item.imgUrl} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
