import { useEffect, useState } from "react";
import { Elevator } from "./components/Elevator"
import { Floor } from "./components/Floor"
import "./styles/app.css"
import { ValidValues } from "./types/validValues";
import { ElevatorInterface } from "./components/ElevatorInterface";

function App() {
  const [elevatorAQueue, setElevatorAQueue] = useState<ValidValues[]>([]);
  const [elevatorBQueue, setElevatorBQueue] = useState<ValidValues[]>([]);
  const [elevatorAPosition, setElevatorAPosition] = useState<ValidValues>(0); // start elevator from bottom floor
  const [elevatorBPosition, setElevatorBPosition] = useState<ValidValues>(6); // start elevator from top floor
  const [elevatorBDynamicClassName, setElevatorBDynamicClassName] = useState<string>(``);
  const [elevatorADynamicClassName, setElevatorADynamicClassName] = useState<string>(``);
  const [elevatorAActiveButtons, setElevatorAActiveButtons] = useState<ValidValues[]>([]);
  const [elevatorBActiveButtons, setElevatorBActiveButtons] = useState<ValidValues[]>([]);

  const handleElevatorButtonPress = (target: ValidValues, elevator: "A" | "B") => {
    const queue: ValidValues[] = [];
    const elevatorQueue = elevator === "A" ? elevatorAQueue : elevatorBQueue;
    const setElevatorQueue = elevator === "A" ? setElevatorAQueue : setElevatorBQueue;
    const elevatorPosition = elevator === "A" ? elevatorAPosition : elevatorBPosition;

    if (elevatorPosition === target && elevatorQueue.length === 0) {
      return;
    }

    elevator === "A" ? 
      setElevatorAActiveButtons([...elevatorAActiveButtons, target]) : 
      setElevatorBActiveButtons([...elevatorBActiveButtons, target]);

    const startingPosition = elevatorQueue.length > 0 ?
      elevatorQueue[elevatorQueue.length - 1] :
      elevator === "A" ? 
        elevatorAPosition :
        elevatorBPosition;
    
    if (startingPosition < target) {
      for (let i = startingPosition + 1; i <= target; ++i) {
        queue.push(i as ValidValues);
      }
    } else {
      for (let i = startingPosition - 1; i >= target; --i) {
        queue.push(i as ValidValues)
      }
    }

    setElevatorQueue((prevQueue) => [...prevQueue, ...queue]);
  }

  const handleFloorButtonPress = (floor: ValidValues) => {
    const distanceToA = Math.abs(floor - elevatorAPosition);
    const distanceToB = Math.abs(floor - elevatorBPosition);

    const elevatorQueue = distanceToA < distanceToB || (distanceToA === distanceToB) ? elevatorAQueue : elevatorBQueue;
    const elevatorPosition = 
      distanceToA < distanceToB || 
      (distanceToA === distanceToB) ? 
        elevatorAPosition : 
        elevatorBPosition;

    if (floor === elevatorPosition && elevatorQueue.length === 0) {
      return;
    }

    const startingPosition = elevatorQueue.length > 0 ?
      elevatorQueue[elevatorQueue.length - 1] : 
      distanceToA < distanceToB || ((distanceToA === distanceToB) && (elevatorAPosition < elevatorBPosition)) ?
        elevatorAPosition :
        elevatorBPosition;

    const updateQueue = (currentPosition: ValidValues, setQueue: React.Dispatch<React.SetStateAction<ValidValues[]>>) => {
      const queue: ValidValues[] = [];
      
      if (currentPosition < floor) {
        for (let i = currentPosition + 1; i <= floor; i++) {
          queue.push(i as ValidValues);
        }
      } else {
        for (let i = currentPosition - 1; i >= floor; i--) {
          queue.push(i as ValidValues);
        }
      }
  
      setQueue((prevQueue) => [...prevQueue, ...queue]);
    };

    if (
      distanceToA < distanceToB || 
      ((distanceToA === distanceToB) && elevatorAPosition < elevatorBPosition)) {
      updateQueue(startingPosition, setElevatorAQueue);
    } else {
      updateQueue(startingPosition, setElevatorBQueue);
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
        <ElevatorInterface 
          elevatorPosition={elevatorAPosition} 
          className={"elevator-a-interface-holder"} 
          name={"A"} 
          onElevatorButtonPress={handleElevatorButtonPress}
          activeButtons={elevatorAActiveButtons}
          setActiveButtons={setElevatorAActiveButtons}
        />
        <div className="left-side-holder">
          {Array.from({ length: 7 }, (_, index) => {
            const level = 6 - index as ValidValues;
            return (
              <Floor
                key={level}
                level={level as ValidValues}
                downArrow={false}
                upArrow={false}
                onButtonPress={handleFloorButtonPress}
                elevatorAQueueIsEmpty={elevatorAQueue.length === 0}
                elevatorBQueueIsEmpty={elevatorBQueue.length === 0}
                elevatorAQueue={elevatorAQueue}
                elevatorBQueue={elevatorBQueue} 
                elevatorAPosition={elevatorAPosition} 
                elevatorBPosition={elevatorBPosition} 
              />
            )
          })}
        </div>
        <div className="right-side-holder">
          <div className="elevator-a-holder">
            <Elevator current_positon={elevatorAPosition} name='A' visualClassName={elevatorADynamicClassName} />
          </div>
          <div className="elevator-b-holder">
            <Elevator current_positon={elevatorBPosition} name='B' visualClassName={elevatorBDynamicClassName} />
          </div>
        </div>
        <ElevatorInterface 
          elevatorPosition={elevatorBPosition} 
          className={"elevator-b-interface-holder"} 
          name={"B"} 
          onElevatorButtonPress={handleElevatorButtonPress}
          activeButtons={elevatorBActiveButtons}
          setActiveButtons={setElevatorBActiveButtons}
        />
      </div>
    </div>
  )
}

export default App
