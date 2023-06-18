import { renderD3 } from "./indexD3.js";
const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const App = () => {

    const [educationData, setEducationData] = useState("");
    const [countyData, setCountyData] = useState("");
    
    useEffect(() => {
        fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
            .then(res => res.json())
            .then(data => {
            setEducationData(data)
        })
    }, []);

    useEffect(() => {
        fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
            .then(res => res.json())
            .then(data => {
            setCountyData(data)
        })
    }, []);

    useEffect(() => {
        const displayWidth = window.innerWidth;
        if (educationData && countyData) {
            renderD3([educationData, countyData], displayWidth, 700);
        }
    }, [educationData, countyData])

    return (
        <div id='app'>
            <div id="container" >
                <div id='tooltip'></div>
            </div>
        </div>
    )
}

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);