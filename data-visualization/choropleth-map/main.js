import { renderD3 } from "./indexD3.js";
const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const Container = () => {
    return (
        <div id="container" >
            <div id="tooltip"></div>
        </div>
    )
};

const App = () => {

    const [educationData, setEducationData] = useState("");
    const [countyData, setCountyData] = useState("");
    
    useEffect(() => {
        fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
            .then(res => res.json())
            .then(data => {
            setEducationData(data);

        fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
            .then(res => res.json())
            .then(data => {
            setCountyData(data)
        })
        })
    }, []);

    useEffect(() => {
        const displayWidth = window.innerWidth * 0.8;
        if (educationData && countyData) {
            const maxWidth = displayWidth > 960 ? 960 : displayWidth;
            renderD3([educationData, countyData], maxWidth, 700);
        }
    }, [educationData, countyData])

    return (
        <div id='app'>
            <h1 id="title">United States Educational Attainment</h1>
            <h3 id="description">Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</h3>
            {educationData && countyData
            ? <Container/>
            : <h1 id="loader">Loading...</h1>}
        </div>
    )
}

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);