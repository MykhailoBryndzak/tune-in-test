import { useContext, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StationListContext } from "../../App";
import { Loader } from "../../components/Loader/Loader";
import { Recommendations } from "../../components/Recommendations/Recommendations";
import { StationDetails } from "../../components/StationDetails";
import "./styles.scss";

export const Station = () => {
  const navigate = useNavigate();
  const { stationId } = useParams();
  const stationList = useContext(StationListContext);
  const ref: any = useRef(null);

  const [isStreamAvailable, setIsStreamAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (ref.current?.currentSrc) {
      ref.current?.load();
      setIsStreamAvailable(true);
    }
  }, [stationId]);

  const currentStation = stationList.find((item) => item.id === stationId);

  if (!currentStation) {
    return <Loader className="loader" />;
  }

  return (
    <>
      {isLoading && <Loader className="loader" />}
      <button className="backBtn" onClick={() => navigate("/")}>
        ⬅ Back to List
      </button>
      <div className="stationContainer">
        <img src={currentStation.imgUrl} alt={currentStation.name} />
        <h2>{currentStation.name}</h2>
        <audio
          ref={ref}
          className="audio"
          autoPlay
          controls
          onError={() => {
            setIsStreamAvailable(false);
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadedData={() => setIsLoading(false)}
        >
          <source src={currentStation.streamUrl} />
          Your browser does not support the <code>audio</code> element.
        </audio>

        <StationDetails currentStation={currentStation} />

        {!isStreamAvailable && (
          <h3 className="errorMessage">
            Unfortunately stream is not available for now
          </h3>
        )}
      </div>
      <Recommendations />
    </>
  );
};
