// step 1: create element.
const heading = React.createElement("h1", { id: "heading" }, "Hello World from React.JS");
// step 2: link the ReactDOM with root
const root = ReactDOM.createRoot(document.getElementById("root"));
// step 3: render element in root react dom
root.render(heading);