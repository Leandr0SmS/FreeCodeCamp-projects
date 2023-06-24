import { renderD3 } from "./d3/main-d3.js";
import { datasets } from './resources/datasets.js';

const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const TabSwitcher = ({ data, renderContent }) => {
    const tabIds = data.map(e => e.id);
    const [selectedId, setSelectedId] = useState(tabIds[0]);
    return (
      <>
        <header id="header">
            {tabIds.map((tabId) => (
                <button
                    className="btn"
                    type="button"
                    key={tabId}
                    onClick={() => setSelectedId(tabId)}
                >
                    {tabId}
                </button>
            ))}
        </header>
        <hr />
        <div key={selectedId}>
            {renderContent(selectedId, data)}
        </div>
      </>
    );
};

const DataVisualization = ({ url, title, subtitle, id }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(url)
            .then(res => res.json(url))
            .then(data => {
                setData(data)
        });
    }, []);
    useEffect(() => {
        const percentWidth = window.innerWidth * 0.8;
        if (data) {
            renderD3(data, id, percentWidth, 900)
        }
    }, [data, id]);
    return (
        <React.Fragment>
            <h1 id="title">{title}</h1>
            <h3 id="description">{subtitle}</h3>
            <div 
                className="content"
                id={id}
            >
                <div id="tooltip"></div>
            </div>
        </React.Fragment>
    )
};

const App = () => {
    return (
        <React.Fragment>
            <TabSwitcher
                data={datasets}
                renderContent={(tabId, data) => {
                    const dataSelected = data.filter(elem => elem.id == tabId);
                    const {id, url, title, subtitle} = dataSelected[0];
                    return <DataVisualization
                        url={url}
                        title={title}
                        subtitle={subtitle}
                        id={id}
                    />
                }}
            />
        </React.Fragment>
    )
}

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);