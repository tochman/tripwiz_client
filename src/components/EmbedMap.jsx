import React, { useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from 'react-redux'

const EmbedMap = props => {
  const { lat, lng } = props.coords

  const onClickHandler = e => {
    props.changeCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const getCurrentLocation = () => {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        props.changeCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div id="location" style={{ margin: "20px" }}>
        {lat.toFixed(3)}, {lng.toFixed(3)}
      </div>
      <div id="map">
        <Map
          google={props.google}
          zoom={10}
          center={{ lat: lat, lng: lng }}
          style={{ width: "640px", height: "640px" }}
          onClick={(mapProps, map, e) => onClickHandler(e)}
        >
          <Marker position={{ lat: lat, lng: lng }} />
        </Map>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    coords: state.coords
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCoords: coords => {
      dispatch({ type: "CHANGE_COORDS", payload: coords })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY
})(EmbedMap));