const {useState} = React;

let padsData = [
    {
        id: "Q",
        audioSrc: "clap.mp3",
        name: "clap"
    },
    {
        id: "W",
        audioSrc: "close-hh.mp3",
        name: "close hh"
    },
    {
        id: "E",
        audioSrc: "open-hh.mp3",
        name: "open hh"
    },
    {
        id: "A",
        audioSrc: "heater-1.mp3",
        name: "heater 1"
    },
    {
        id: "S",
        audioSrc: "heater-2.mp3",
        name: "heater 2"
    },
    {
        id: "D",
        audioSrc: "heater-3.mp3",
        name: "heater 3"
    },
    {
        id: "Z",
        audioSrc: "heater-4.mp3",
        name: "heater 4"
    },
    {
        id: "X",
        audioSrc: "kick_n_hat.mp3",
        name: "kick 'n hat"
    },
    {
        id: "C",
        audioSrc: "kick.mp3",
        name: "kick"
    }
]

const Pad = ({onPadClick, id, audioSrc, name}) => {
    return (
        <div className="drum-pad" onMouseDown={onPadClick} name={name}>
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
        console.log(e.target.getAttribute('name'));
        e.target.children[0].play();
        setPad(e.target.getAttribute('name'));
    };

    const pads = padsData.map(p  => {
        return (
            <Pad
                key={p.id}
                onPadClick={handlePadClick}
                id={p.id}
                audioSrc={p.audioSrc}
                name={p.name}
            />
        )
    })

    console.log(pad)

    return (
        <div id="drum-machine">
            <div id="display">
                {pad}
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