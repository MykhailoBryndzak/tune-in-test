import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Station } from "./pages/Station";
import { StationList } from "./pages/StationList";

export type StationType = {
  id: string;
  description: string;
  name: string;
  imgUrl: string;
  streamUrl: string;
  reliability: number;
  popularity: number;
  tags: string[];
};

export const StationListContext = createContext<StationType[]>([]);

function App() {
  const [stationList, setStationList] = useState<StationType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json"
        );
        const data = await response.json();

        setStationList(data.data);
      } catch (err) {
        console.error("fetch err", err);
      }
    };

    fetchData();
  }, []);

  return (
    <StationListContext.Provider value={stationList}>
      <Routes>
        <Route path="/" element={<StationList />} />
        <Route path=":stationId" element={<Station />} />
      </Routes>
    </StationListContext.Provider>
  );
}

export default App;
