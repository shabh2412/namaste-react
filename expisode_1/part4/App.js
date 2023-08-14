const root = ReactDOM.createRoot(document.getElementById("root"));

const createDivWithID = (id, children) => {
  return React.createElement("div", { id }, [children]);
};

const createH1withText = (id, text) => {
  return React.createElement("h1", { id }, text);
};

const createH2withText = (id, text) => {
  return React.createElement("h2", { id }, text);
};

const h1 = createH1withText("h1", "I am H1");
const h2 = createH2withText("h2", "I am H2");

const div1 = createDivWithID("parent1", [h1, h2]);
const div2 = createDivWithID("parent2", [h1, h2]);

const superParent = createDivWithID("superParent", [div1, div2]);

root.render(superParent);