export default function Die(props) {
    const pipPositions = {
        1: ["center"],
        2: ["top-left", "bottom-right"],
        3: ["top-left", "center", "bottom-right"],
        4: ["top-left", "top-right", "bottom-left", "bottom-right"],
        5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
        6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]
    }

    const pips = pipPositions[props.value].map(position => (
        <span className={`pip ${position}`} key={position}></span>
    ))

    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <button
            style={style}
            onClick={props.onClick}
            className="die-face"
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
            {pips}
        </button>
    )
}
