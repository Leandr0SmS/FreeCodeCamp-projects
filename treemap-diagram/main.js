import { renderD3 } from "./data-d3.js";

const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const Header = ({array, onListClick}) => {

    const list = array.map((elem, i) => {
        return (
            <p 
                key={i}
                id={elem.name}
                onClick={onListClick}
            >{`${elem.name} Data Set`}</p>
        )
    })

    return (
        <header>
            <nav>
                {list}
            </nav>
        </header>
    )
}

const Container = () => {
    return (
        <div id="container" >
            <div id="tooltip"></div>
        </div>
    )
};

const App = () => {

    const [data, setData] = useState([]);

    const [display, setDisplay] = useState()
    
    useEffect(() => {
        fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json')
            .then(res => res.json())
            .then(data => {
                setData(d => [...d, data])
        });

        fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
            .then(res => res.json())
            .then(data => {
                setData(d => [...d, data])
        });

        fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
            .then(res => res.json())
            .then(data => {
                setData(d => [...d, data])
        });
    }, []);

    useEffect(() => {
        const displayWidth = window.innerWidth * 0.8;
        const dataSelected = data.filter(d => d.name === display)
        if (data.length === 3) {
            renderD3(dataSelected, displayWidth, 700);
        }
    }, [display]);

    const handleListClick = (e) => {
        setDisplay(e.target.id)
    }

    return (
        <React.Fragment>
            <Header 
                array={data} 
                onListClick={handleListClick}
            />
            {data.length === 3
            ? <Container/>
            : <h1 id="loader">Loading...</h1>}
        </React.Fragment>
    )
}

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);