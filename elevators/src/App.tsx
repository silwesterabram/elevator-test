import { useState } from "react";
import { Elevator } from "./components/Elevator"
import { Floor } from "./components/Floor"
import "./styles/app.css"
import { ValidValues } from "./types/validValues";

function App() {
  const [pushedFloorStack, setPushedFloorStack] = useState<ValidValues[]>([]);
  const elevatorAQueue: ValidValues[] = [];
  const elevatorBQueue: ValidValues[] = [];

  const handleFloorButtonPress = (floor: ValidValues, direction: "up" | "down") => {
    setPushedFloorStack((prevStack) => [...prevStack, floor]);
    console.log(`Button pressed at floor ${floor} going ${direction}, stack: ${pushedFloorStack}`);
  };

  return (
      <div className="main-holder">
        <div className="left-side-holder">
          {Array.from({ length: 7 }, (_, index) => {
            const level = 6 - index as ValidValues;
            return (
              <Floor
              key={level}
              level={level as ValidValues}
              down_arrow={false}
              up_arrow={false}
              elevator_a_position={0}
              elevator_b_position={6}
              onButtonPress={handleFloorButtonPress}
            />
            )
          })}
        </div>
        <div className="right-side-holder">
          <div className="elevator-a-holder">
            <Elevator current_positon={0} next={null} name='A' />
          </div>
          <div className="elevator-b-holder">
            <Elevator current_positon={6} next={null} name='B' />
          </div>
        </div>
      </div>
  )
}

export default App
