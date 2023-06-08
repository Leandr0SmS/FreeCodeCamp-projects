import { d3Code } from "./mainD3.js";
const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const App = () => {

    const [data, setData] = useState("");

    const w = 500;
    const h = 500;

    useEffect(() => {

        fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
            .then(res => res.json())
            .then(data => {
            setData(data.data)
    }).then(() => {
        
        d3Code();

    })


    }, []);

    console.log(data)

    return (
        <div id='app'>
            <h1 id="title">United States GDP</h1>
        </div>
    )
}

//render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)