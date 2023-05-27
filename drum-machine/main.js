const {useState} = React;

let padsData = [
    {
        id: "Q",
        audioSrc: "clap.mp3"
    },
    {
        id: "W",
        audioSrc: "clap.mp3"
    },
    {
        id: "E",
        audioSrc: "clap.mp3"
    },
    {
        id: "A",
        audioSrc: "clap.mp3"
    },
    {
        id: "S",
        audioSrc: "clap.mp3"
    },
    {
        id: "D",
        audioSrc: "clap.mp3"
    },
    {
        id: "Z",
        audioSrc: "clap.mp3"
    },
    {
        id: "X",
        audioSrc: "clap.mp3"
    },
    {
        id: "C",
        audioSrc: "clap.mp3"
    }
]

const Pad = ({onPadClick, id, audioSrc}) => {
    return (
        <div className="drum-pad" onClick={onPadClick}>
            {id}
            <audio className="clip" id={id}>
                <source src={`./songs/${audioSrc}`} type="audio/mpeg"/>
            </audio>
        </div>
    )
};


const App = () => {

    const [pad, setPad] = useState(null);

    const handlePadClick = (e) => {
        console.log(e.target.children[0])
        e.target.children[0].play()
    };

    const pads = padsData.map(p  => {
        return (
            <Pad
                key={p.id}
                onPadClick={handlePadClick}
                id={p.id}
                audioSrc={p.audioSrc}
            />
        )
    })

    let display;
    switch (pad) {
        case "Q":
            display = "clap"
            break;
        case "W":
            display = "close hh"
            break;
        case "E":
            display = "open hh"
            break;
        case "A":
            display = "heater 1"
            break;
        case "S":
            display = "heater 2"
            break;
        case "D":
            display = "heater 3"
            break;
        case "Z":
            display = "heater 4"
            break;
        case "X":
            display = "kick n' hat"
            break;
        case "C":
            display = "kick"
            break;
        default:
            console.log(`data error`);
    }

    return (
        <div id="drum-machine">
            <div id="display">
                {display}
            </div>
            <div className="pads-div">
                {pads}
            </div>
        </div>
    )
};

//Render
const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>);