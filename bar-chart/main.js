import { d3Code } from "./mainD3.js";
const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const App = () => {

    const [dataGDP, setDataGDP] = useState("");
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
      
    useEffect(() => {
      window.addEventListener('resize', handleResize);
    
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
            .then(res => res.json())
            .then(data => {
            setDataGDP(data.data)
    })
    }, []);

    useEffect(() => {

        if (dataGDP) {
            d3Code(dataGDP, 900, 500);
        }

    }, [dataGDP])

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