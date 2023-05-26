const {useState} = React; 

const markdownContent = `# Markdown Previewer: 
---
<br>

## Markdown Previewer:

> Project to **FreeCodeCamp** curriculum

<br>

### Delevoped with:

- React
\`\`\`
const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>);
\`\`\`
- [Marked](https://cdnjs.com/libraries/marked) \`marked.parse(string, {mangle: false, headerIds: false, breaks: true});\`

<br>

---

<br>

[Created by Leandr0SmS](https://github.com/Leandr0SmS)
<br>

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

const Form = ({textValue, onChangeText}) => {

    return (
        <div className="editor box">
            <h1 className="header">Editor</h1>
            <textarea
                id="editor"
                placeholder={markdownContent}
                value={textValue}
                onChange={onChangeText}
            />
        </div>
    )
}

const Marked = ({string}) => {
    const parsed = marked.parse(string, {mangle: false, headerIds: false, breaks: true});
    const filtered = filterXSS(parsed);

    return (
        <div className="box">
            <h1 className="header">Previewer</h1>
            <div 
                id="preview"
                dangerouslySetInnerHTML={{ __html: filtered }} 
            >
            </div>
        </div>
    )
}

const App = () => {

    const [formData, setFormData] = useState(markdownContent)

    console.log(formData);
    return (
        <React.Fragment>
            <Form
                onChangeText={e => setFormData(e.target.value)}
                textValue={formData}
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