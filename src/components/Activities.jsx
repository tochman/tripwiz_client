import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Grid, Button } from "semantic-ui-react";
import { addActivityType } from "../modules/destination.js"

const Activities = props => {
  const [activityType, setActivityType] = useState(null);
  const [actTimes, setActTimes] = useState(null);

  const activities = [
    { key: 1, value: "amusement_park", text: "Amusement Park" },
    { key: 2, value: "aquarium", text: "Aquarium" },
    { key: 3, value: "art_gallery", text: "Art Gallery" },
    { key: 4, value: "beauty_salon", text: "Beauty Salon" },
    { key: 5, value: "casino", text: "Casino" },
    { key: 6, value: "museum", text: "Museum" },
    { key: 7, value: "night_club", text: "Night Club" },
    { key: 8, value: "park", text: "Park" },
    { key: 9, value: "zoo", text: "Zoo" }
  ];

  const number = [
    { key: 1, value: "1", text: "One" },
    { key: 2, value: "2", text: "Two" },
    { key: 3, value: "3", text: "Three" }
  ];

  const onNextHandler = async () => {
    const response = await addActivityType(activityType, actTimes, props.trip);
    if (response.status === 200) {
    } else {
      return props.setMessage("Something went wrong.");
    }
  };

  return (
    <div className="activities">
      <h1>{props.destination}</h1>
      <Grid>
        <Grid.Column width={7}>
          <h2>Focus of trip:</h2>
          <Dropdown
            placeholder="Select Activity"
            clearable
            fluid
            selection
            options={activities}
            onChange={(e, data) => setActivityType(data.value)}
          />
          <h3>Number of times:</h3>
          <Dropdown
            placeholder="How many times?"
            fluid
            selection
            options={number}
            onChange={(e, data) => setActTimes(data.value)}
          />
          <Button onClick={onNextHandler}>Next</Button>
          {props.message}
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    message: state.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Activities);