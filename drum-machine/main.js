const {useState, useEffect} = React;

let padsData = [
    {
        id: "Q",
        audioSrc: "Heater-6.mp3",
        name: "clap"
    },
    {
        id: "W",
        audioSrc: "Cev_H2.mp3",
        name: "close hh"
    },
    {
        id: "E",
        audioSrc: "Dsc_Oh.mp3",
        name: "open hh"
    },
    {
        id: "A",
        audioSrc: "Heater-1.mp3",
        name: "heater 1"
    },
    {
        id: "S",
        audioSrc: "Heater-2.mp3",
        name: "heater 2"
    },
    {
        id: "D",
        audioSrc: "Heater-3.mp3",
        name: "heater 3"
    },
    {
        id: "Z",
        audioSrc: "Heater-4_1.mp3",
        name: "heater 4"
    },
    {
        id: "X",
        audioSrc: "Kick_n_Hat.mp3",
        name: "kick 'n hat"
    },
    {
        id: "C",
        audioSrc: "RP4_KICK_1.mp3",
        name: "kick"
    }
]

const Pad = ({onPadClick, id, audioSrc, name}) => {
    return (
        <div 
            className="drum-pad" 
            onPointerDown={onPadClick}
            onTouchStart={onPadClick}
            id={name}
        >
            {id}
            <audio className="clip" id={id} src={`./songs/${audioSrc}` ? `./songs/${audioSrc}` : `https://s3.amazonaws.com/freecodecamp/drums/${audioSrc}`} type="audio/mpeg">
                <source src={`./songs/${audioSrc}`} type="audio/mpeg" />
            </audio>
        </div>
    )
};

const App = () => {

    const [display, setdisplay] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const pad = padsData.filter(p => (p.id == e.key.toUpperCase()));
            if (pad.length == 1) {
                setdisplay(pad[0].name);
                document.getElementById(`${pad[0].id}`).play();
            }
        };
        window.addEventListener('keypress', handleKeyDown);
        return () => {
          window.removeEventListener('keypress', handleKeyDown);
        };
      }, []);

    const handlePadClick = (e) => {
        const pad = e.target;
        e.target.children[0].play();
        setdisplay(pad.getAttribute('id'));
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