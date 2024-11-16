import { useEffect, useState } from "react";
import { Elevator } from "./components/Elevator"
import { Floor } from "./components/Floor"
import "./styles/app.css"
import { ValidValues } from "./types/validValues";
import { ElevatorInterface } from "./components/ElevatorInterface";

function App() {
  const [elevatorAQueue, setElevatorAQueue] = useState<ValidValues[]>([]);
  const [elevatorBQueue, setElevatorBQueue] = useState<ValidValues[]>([]);
  const [elevatorAPosition, setElevatorAPosition] = useState<ValidValues>(0);
  const [elevatorBPosition, setElevatorBPosition] = useState<ValidValues>(6);

  const [elevatorBDynamicClassName, setElevatorBDynamicClassName] = useState<string>(``);
  const [elevatorADynamicClassName, setElevatorADynamicClassName] = useState<string>(``);

  const handleFloorButtonPress = (floor: ValidValues, direction: "up" | "down") => {
    const distanceToA = Math.abs(floor - elevatorAPosition);
    const distanceToB = Math.abs(floor - elevatorBPosition);

    const updateQueue = (currentPosition: ValidValues, setQueue: React.Dispatch<React.SetStateAction<ValidValues[]>>) => {
      const queue: ValidValues[] = [];
      
      if (currentPosition < floor) {
        // Moving up: add each floor between current position and target floor
        for (let i = currentPosition + 1; i <= floor; i++) {
          queue.push(i as ValidValues);
        }
      } else {
        // Moving down: add each floor between current position and target floor
        for (let i = currentPosition - 1; i >= floor; i--) {
          queue.push(i as ValidValues);
        }
      }
  
      // Update the selected elevator's queue
      setQueue((prevQueue) => [...prevQueue, ...queue]);
      console.log(`Pushing floors to queue: ${queue.map(f => `${f}-${direction}`).join(", ")}`);
    };

    if (distanceToA < distanceToB || (distanceToA === distanceToB && elevatorAPosition !== elevatorBPosition)) {
      updateQueue(elevatorAPosition, setElevatorAQueue);
    } else {
      updateQueue(elevatorBPosition, setElevatorBQueue);
    }
  };

  useEffect(() => {
    if (elevatorAQueue.length > 0) {
      setElevatorADynamicClassName(`move-${elevatorAPosition}-to-${elevatorAQueue[0]}`);
    }
    if (elevatorAQueue.length > 0) {
      const interval = setInterval(() => {
        setElevatorAPosition(elevatorAQueue[0]);
        console.log(`A moved to ${elevatorAQueue[0]}`);
        setElevatorAQueue((prevQueue) => prevQueue.slice(1))
      }, 2000)

      return () => clearInterval(interval);
    }
  }, [elevatorAQueue]);

  useEffect(() => {
    if (elevatorBQueue.length > 0) {
      setElevatorBDynamicClassName(`move-${elevatorBPosition}-to-${elevatorBQueue[0]}`);
    }
    if (elevatorBQueue.length > 0) {
      const interval = setInterval(() => {
        setElevatorBPosition(elevatorBQueue[0]);
        console.log(`B moved to ${elevatorBQueue[0]}`);
        setElevatorBQueue((prevQueue) => prevQueue.slice(1))
      }, 2000)

      return () => clearInterval(interval);
    }
  }, [elevatorBQueue]);

  return (
    <div className="app-main-holder">
      <div className="main-holder">
        <ElevatorInterface elevatorPosition={elevatorAPosition} className={"elevator-a-interface-holder"} name={"A"} />
        <div className="left-side-holder">
          {Array.from({ length: 7 }, (_, index) => {
            const level = 6 - index as ValidValues;
            return (
              <Floor
              key={level}
              level={level as ValidValues}
              down_arrow={false}
              up_arrow={false}
              elevator_a_position={elevatorAPosition}
              elevator_b_position={elevatorBPosition}
              onButtonPress={handleFloorButtonPress}
            />
            )
          })}
        </div>
        <div className="right-side-holder">
          <div className="elevator-a-holder">
            <Elevator current_positon={elevatorAPosition} next={elevatorAQueue[0] || null} name='A' visualClassName={elevatorADynamicClassName} />
          </div>
          <div className="elevator-b-holder">
            <Elevator current_positon={elevatorBPosition} next={elevatorBQueue[0] || null} name='B' visualClassName={elevatorBDynamicClassName} />
          </div>
        </div>
        <ElevatorInterface elevatorPosition={elevatorBPosition} className={"elevator-b-interface-holder"} name={"B"} />
      </div>
    </div>
  )
}

export default App
