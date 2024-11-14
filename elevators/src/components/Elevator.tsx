import "../styles/elevator.css"

export const Elevator = (props: {
  current_positon: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  next: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null,
  name: 'A' | 'B',
}) => {
  return (
    <div className="elevator-holder">
      <h1>
        {props.name}
      </h1>
    </div>
  )
}