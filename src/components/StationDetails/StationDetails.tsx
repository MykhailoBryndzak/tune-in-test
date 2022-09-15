import { StationType } from "../../App";
import "./styles.scss";

type Props = {
  currentStation: StationType;
};

export const StationDetails = ({ currentStation }: Props) => {
  return (
    <>
      <span className="description">{currentStation.description}</span>
      <span>
        <b>popularity:</b> {currentStation.popularity}
      </span>
      <span>
        <b>reliability:</b> {currentStation.reliability}
      </span>
      <div className="tags">
        <b>tags:</b>
        {currentStation.tags.map((tag, index) => (
          <span className="tag" key={index}>
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};
