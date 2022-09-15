import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StationListContext } from "../../App";
import "./styles.scss";

export const Recommendations = () => {
  const navigate = useNavigate();
  const { stationId } = useParams();
  const stationList = useContext(StationListContext);
  const currentStation = stationList.find((item) => item.id === stationId);

  const similarStations = useMemo(
    () =>
      stationList.filter(
        (s) =>
          s.id !== currentStation?.id &&
          s.tags.some((tag) => currentStation?.tags.includes(tag))
      ),
    [currentStation?.id, currentStation?.tags, stationList]
  );

  return (
    <div className="recommendations">
      <hr className="divider" />

      <h2 className="title">Recommendations</h2>
      <div className="list">
        {similarStations.map((recommendation) => (
          <div
            key={recommendation.id}
            onClick={() => navigate("/" + recommendation.id)}
          >
            <h4>{recommendation.name}</h4>
            <img src={recommendation.imgUrl} alt={recommendation.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
