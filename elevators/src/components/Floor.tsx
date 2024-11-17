import { useState } from "react"
import "../styles/floor.css"
import { CallButtons } from "./CallButtons"
import { ValidValues } from "../types/validValues"
import { ElevatorIndicatingLights } from "./ElevatorIndicatingLights"

export const Floor = (props: {
    downArrow?: boolean,
    upArrow?: boolean,
    level: ValidValues,
    onButtonPress: (floor: ValidValues) => void
    elevatorAQueueIsEmpty: boolean,
    elevatorBQueueIsEmpty: boolean,
    elevatorAQueue: ValidValues[],
    elevatorBQueue: ValidValues[],
    elevatorAPosition: ValidValues,
    elevatorBPosition: ValidValues,
}) => {
    const [floorState, setFloorState] = useState<"calledUp" | "calledDown" | "free">("free");

    return (
    <>
        <div className="floor-background-holder">
            <CallButtons 
                current_floor={props.level}
                floorState={floorState}
                setFloorState={setFloorState} 
                onButtonPress={props.onButtonPress}
                elevatorAPosition={props.elevatorAPosition}
                elevatorBPosition={props.elevatorBPosition}
            />
            <ElevatorIndicatingLights 
                aUp={(!props.elevatorAQueueIsEmpty && props.elevatorAQueue[0] > props.elevatorAPosition) ? "active" : "inactive"} 
                aDown={(!props.elevatorAQueueIsEmpty && props.elevatorAQueue[0] < props.elevatorAPosition) ? "active" : "inactive"} 
                bUp={(!props.elevatorBQueueIsEmpty && props.elevatorBQueue[0] > props.elevatorBPosition) ? "active" : "inactive"} 
                bDowm={(!props.elevatorBQueueIsEmpty && props.elevatorBQueue[0] < props.elevatorBPosition) ? "active" : "inactive"} 
            />
            <h1 className="floor-title">
                F{props.level}
            </h1>         
        </div>
    </>
    )
}