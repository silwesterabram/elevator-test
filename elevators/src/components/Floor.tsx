import { useState } from "react"
import "../styles/floor.css"
import { CallButtons } from "./CallButtons"
import { ValidValues } from "../types/validValues"
import { ElevatorIndicatingLights } from "./ElevatorIndicatingLights"

export const Floor = (props: {
    down_arrow?: boolean,
    up_arrow?: boolean,
    level: ValidValues,
    elevator_a_position: ValidValues,
    elevator_b_position: ValidValues,
    onButtonPress: (floor: ValidValues, direction: "up" | "down") => void
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
                up_arrow={props.up_arrow} 
                down_arrow={props.down_arrow} 
                current_floor={props.level}
                floorState={floorState}
                setFloorState={setFloorState} 
                onButtonPress={props.onButtonPress}
                elevatorAPosition={props.elevator_a_position}
                elevatorBPosition={props.elevator_b_position}
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