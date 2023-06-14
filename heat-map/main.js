import { renderD3 } from "./indexD3.js";
const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const App = () => {

    const [data, setData] = useState("");
    
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
            .then(res => res.json())
            .then(data => {
            setData(data)
    })
    }, []);

    useEffect(() => {
        let displayWidth = window.innerWidth * 0.8
        if (data) {
            renderD3(data, displayWidth, 500);
        }
    }, [data])

    return (
        <div id='app'>
        </div>
    )
}

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);
