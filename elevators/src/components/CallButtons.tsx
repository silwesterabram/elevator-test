import NavigationIcon from '@mui/icons-material/Navigation';
import "../styles/navigationButton.css"
import { navigationButtonDownStyles, navigationButtonUpStyles } from '../styles/navigationButton';
import { IconButton } from '@mui/material';
import { ValidValues } from '../types/validValues';
import { useEffect } from 'react';

export const CallButtons = (props: {
  elevatorAPosition: ValidValues,
  elevatorBPosition: ValidValues,
  current_floor: ValidValues,
  floorState: "calledUp" | "calledDown" | "free",
  setFloorState: React.Dispatch<React.SetStateAction<"calledUp" | "calledDown" | "free">>,
  onButtonPress: (floor: ValidValues) => void
}) => {
   const handleUpPress = () => {
    props.setFloorState("calledUp");
    props.onButtonPress(props.current_floor);
  };

  const handleDownPress = () => {
    props.setFloorState("calledDown");
    props.onButtonPress(props.current_floor);
  };

useEffect(() => {
  if (props.floorState === "calledUp" && props.elevatorAPosition === props.current_floor) {
    props.setFloorState("free");
  }
}, [props.elevatorAPosition]);

useEffect(() => {
  if (props.floorState === "calledDown" && props.elevatorAPosition === props.current_floor) {
    props.setFloorState("free");
  }
}, [props.elevatorAPosition]);

useEffect(() => {
  if (props.floorState === "calledUp" && props.elevatorBPosition === props.current_floor) {
    props.setFloorState("free");
  }
}, [props.elevatorBPosition]);

useEffect(() => {
  if (props.floorState === "calledDown" && props.elevatorBPosition === props.current_floor) {
    props.setFloorState("free");
  }
}, [props.elevatorBPosition]);

  return (
    <>
      <div className="call-button-holder">
        {props.current_floor != 6 ? 
          <IconButton onClick={handleUpPress}>
            {props.floorState === "calledUp" && 
              props.current_floor !== props.elevatorAPosition && 
              props.current_floor !== props.elevatorBPosition ? 
              <NavigationIcon style={{
                ...navigationButtonUpStyles, 
                color: "yellow",
                boxShadow: "0px 0px 10px 2px rgba(255, 255, 0, 0.8)",
                backgroundColor: "black",
                borderRadius: "3px",
              }}/>
              :
              <NavigationIcon style={{
                ...navigationButtonUpStyles, 
                backgroundColor: "#313131",
                borderRadius: "3px",
              }} />
            }
          </IconButton>
           : 
          null
        }
        {props.current_floor != 0 ? 
          <IconButton onClick={handleDownPress}>
            {props.floorState === "calledDown" && 
              props.current_floor !== props.elevatorAPosition && 
              props.current_floor !== props.elevatorBPosition ?
              <NavigationIcon style={{
                ...navigationButtonUpStyles, 
                transform: "rotate(180deg)", 
                color: "yellow", 
                boxShadow: "0px 0px 10px 2px rgba(255, 255, 0, 0.8)",
                backgroundColor: "black",
                borderRadius: "3px"
              }}/> :
              <NavigationIcon style={{
                 ...navigationButtonDownStyles, 
                 transform: "rotate(180deg)", 
                 backgroundColor: "#313131",
                 borderRadius: "3px"
              }} />  
            }
          </IconButton>
          :
          null
        }
      </div>
    </>
  );
}