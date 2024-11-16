import "../styles/app.css"
import "../styles/elevatorInterface.css"
import { Display as SevenSegmentDisplay } from "react-7-segment-display";
import { ValidValues } from "../types/validValues";

export const ElevatorInterface = (props: {
  elevatorPosition: ValidValues,
  className: string,
  name: string,
}) => {
  return (
    <div className={props.className}>
      <div className="elevator-interface-header">
        elevator {props.name} controls
        <SevenSegmentDisplay 
          count={1} 
          height={100} 
          value={props.elevatorPosition} 
          color={"#ffffff"} skew={true} 
          backgroundColor={"#808080"}
        />
      </div>
      <div className="elevator-interface-body">
        
      </div>
    </div>
  )
}