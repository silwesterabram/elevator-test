import "../styles/elevator.css"
import { ValidValues } from "../types/validValues"

export const Elevator = (props: {
  current_positon: ValidValues,
  name: 'A' | 'B',
  visualClassName: string,
}) => {
  return (
    <div className={`elevator-holder-${props.name} ${props.visualClassName}`}>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}