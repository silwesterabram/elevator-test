import { useState } from "react"
import "../styles/floor.css"
import { CallButtons } from "./CallButtons"
import { ValidValues } from "../types/validValues"

export const Floor = (props: {
    down_arrow?: boolean,
    up_arrow?: boolean,
    level: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    elevator_a_position: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    elevator_b_position: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    onButtonPress: (floor: ValidValues, direction: "up" | "down") => void
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
            <h1 className="floor-title">
                F{props.level}
            </h1>         
        </div>
    </>
    )
}