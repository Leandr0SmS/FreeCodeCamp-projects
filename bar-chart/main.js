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
            console.log(data)
            setData(data)
    })
        const svg = d3.select('#app')
                      .append('svg')
                      .attr('width', w)
                      .attr('height', h)
    }, []);

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