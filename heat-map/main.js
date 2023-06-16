import { renderD3 } from "./indexD3.js";
const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const Header = ({ subtitle }) => {
    return (
        <React.Fragment>
            <h1 id="title">Monthly Global Land-Surface Temperature</h1>
            <h3 id="description">{subtitle}</h3>
        </React.Fragment>
    )
};

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
            <Header subtitle={data ? `Base Temperature: ${data.baseTemperature}℃` : 'Loading...'} />
            <div id="container" >
                    <p id="legendText">Base Temperature Difference</p>
                </div>
            <div id='tooltip'>
            </div>
        </div>
    )
}

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);
