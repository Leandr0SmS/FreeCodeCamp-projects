const Drum = ({displayValue}) => {
    return (
        <div id="drum-machine">
            <div id="display">
                {displayValue}
            </div>
            <div className="pads-div">
                <div className="drum-pad">
                    Q
                    <audio className="clip" id="Q">
                        <source src="./songs/clap.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    W
                    <audio className="clip" id="W">
                        <source src="./songs/close-hh.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    E
                    <audio className="clip" id="E">
                        <source src="./songs/open-hh.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    A
                    <audio className="clip" id="A">
                        <source src="./songs/heater-1.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    S
                    <audio className="clip" id="S">
                        <source src="./songs/heater-2.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    D
                    <audio className="clip" id="D">
                        <source src="./songs/heater-3.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    Z
                    <audio className="clip" id="Z">
                        <source src="./songs/heater-4.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    X
                    <audio className="clip" id="X">
                        <source src="./songs/kick_n_hat.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
                <div className="drum-pad">
                    C
                    <audio className="clip" id="C">
                        <source src="./songs/kick.mp3" type="audio/mpeg"/>
                    </audio>
                </div>
            </div>
        </div>
    )
};

const App = () => {

    let display;
    

    //switch (id) {
    //    case "Q":
    //        display = "clap"
    //        break;
    //    case "W":
    //        display = "close hh"
    //        break;
    //    case "E":
    //        display = "open hh"
    //        break;
    //    case "A":
    //        display = "heater 1"
    //        break;
    //    case "S":
    //        display = "heater 2"
    //        break;
    //    case "D":
    //        display = "heater 3"
    //        break;
    //    case "Z":
    //        display = "heater 4"
    //        break;
    //    case "X":
    //        display = "kick n' hat"
    //        break;
    //    case "C":
    //        display = "kick"
    //        break;
    //    default:
    //        console.log(`data error`);
    //}

    return (
        <Drum 
            displayValue="Something.."
        />
    )
};

//Render
const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>);