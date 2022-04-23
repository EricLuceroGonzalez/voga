import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = (props) => {

  const renderCoordinates = (params) => {
    return props.location.map((item,k) => {
      return (
        <Marker 
        key={k}
        coordinates={[item.lon, item.lat]} fill="#777">
          <circle 
        key={k} r={1} fill="#F53" />
        </Marker>
      );
    });
  };
  return (
    <ComposableMap
      //   projection="geoAzimuthalEqualArea"
      projectionConfig={{
        // rotate: [100, 20, 0],
        scale: 300,
      }}
    >
      <ZoomableGroup zoom={3} center={[-80, 0]}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
              />
            ))
          }
        </Geographies>
        {renderCoordinates()}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
