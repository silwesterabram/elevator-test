import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "../styles/floor.css"

export const ElevatorIndicatingLights = (props: {
  aUp: "active" |  "inactive",
  aDown: "active" |  "inactive",
  bUp: "active" |  "inactive",
  bDowm: "active" |  "inactive",
}) => {
  return (
    <div className="indicating-lights-holder">
      A
      <div className="indicating-a-holder">
        <PlayArrowIcon sx={{
            transform: "rotate(-90deg)",
            fontSize: "3rem"
          }}
          className={`A-up-${props.aUp}`}
        />
        <PlayArrowIcon sx={{
            transform: "rotate(90deg)",
            fontSize: "3rem"
          }}
          className={`A-down-${props.aDown}`}
        />
      </div>
      B
      <div className="indicating-b-holder">
        <PlayArrowIcon sx={{
            transform: "rotate(-90deg)",
            fontSize: "3rem",
          }}
          className={`B-up-${props.bUp}`}
        />
        <PlayArrowIcon sx={{
            transform: "rotate(90deg)",
            fontSize: "3rem",
          }}
          className={`B-down-${props.bDowm}`}
        />
      </div>
    </div>
  )
}