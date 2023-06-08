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

        svg.selectAll('rect')
           .data(data.data)
           .enter()
           .append('rect')
           .attr('x', (d, i) => i * 30)
           .attr('y', (d, i) => h - 3 * d)
           .attr('width', 25)
           .attr('height', (d, i) => 3 * d)
           .fill('fill', 'navy')

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