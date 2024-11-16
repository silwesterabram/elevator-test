import "../styles/app.css"
import "../styles/elevatorInterface.css"
import { Display as SevenSegmentDisplay } from "react-7-segment-display";
import { ValidValues } from "../types/validValues";
import { useEffect } from "react";

export const ElevatorInterface = (props: {
  elevatorPosition: ValidValues,
  className: string,
  name: "A" | "B",
  onElevatorButtonPress: (target: ValidValues, elevator: "A" | "B") => void,
  activeButtons: ValidValues[],
  setActiveButtons: React.Dispatch<React.SetStateAction<ValidValues[]>>,
}) => {
  useEffect(() => {
    if (props.activeButtons.includes(props.elevatorPosition) && props.elevatorPosition === props.activeButtons[0]) {
      props.setActiveButtons([...props.activeButtons.slice(1)]);
    }
  }, [props.elevatorPosition])

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
        {
          Array.from({ length: 7}, (_, index) => {
            const val = 6 - index;
            return (
              <div 
                className={`single-button-holder button-${props.activeButtons.includes(val as ValidValues) ? "active" : "inactive"}`} 
                onClick={() => props.onElevatorButtonPress(val as ValidValues, props.name)}>
                <h1>{val}</h1>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}