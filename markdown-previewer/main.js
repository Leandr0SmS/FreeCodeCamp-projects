const {useState} = React;

const Form = ({textValue, onChangeText}) => {

    return (
        <div className="editor box">
            <h1 className="header">Editor</h1>
            <textarea
                className="textarea"
                placeholder="markdown here..."
                value={textValue}
                onChange={onChangeText}
            />
        </div>
    )
}

const Marked = ({string}) => {
    const parsed = marked.parse(string, {mangle: false, headerIds: false});
    const filtered = filterXSS(parsed);

    return (
        <div className="box">
            <h1 className="header">Previewer</h1>
            <div 
                className="previewer"
                dangerouslySetInnerHTML={{ __html: filtered }} 
            />
        </div>
    )
}

const App = () => {

    const [formData, setFormData] = useState('')

    return (
        <React.Fragment>
            <Form
                value={formData}
                onChangeText={e => setFormData(e.target.value)}
            />
            <Marked
                string={formData}
            />
        </React.Fragment>
    )
}

//render
const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>);