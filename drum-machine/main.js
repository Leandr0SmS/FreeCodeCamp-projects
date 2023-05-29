const {useState, useEffect} = React;

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
        <div 
            className="drum-pad" 
            onPointerDown={onPadClick}
            onTouchStart={onPadClick}
            name={name}
        >
            {id}
            <audio className="clip" id={id}>
                <source src={`./songs/${audioSrc}`} type="audio/mpeg"/>
            </audio>
        </div>
    )
};


const App = () => {

    const [display, setdisplay] = useState(null);

    useEffect(() => {
        window.addEventListener('keypress', handleKeyDown);
        return () => {
          window.removeEventListener('keypress', handleKeyDown);
        };
      }, []);

    const handlePadClick = (e) => {
        const pad = e.target;
        e.target.children[0].play();
        setdisplay(pad.getAttribute('name'));
    };

    const handleKeyDown = (e) => {
        const pad = padsData.filter(p => (p.id == e.key.toUpperCase()));
        if (pad.length == 1) {
            setdisplay(pad[0].name);
            document.getElementById(`${pad[0].id}`).play();
        }
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