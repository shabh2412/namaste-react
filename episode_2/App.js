import React from "react";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("customRootForReact"));

const createDivWithID = (id, children) => {
  return React.createElement("div", { id }, children);
};

const createH1 = ({ id, text }) => {
  return React.createElement("h1", { id }, text);
};

const h1 = createH1({ id: "heading_1", text: "I am H1" });
const parent = createDivWithID("parent_div", h1);

root.render(parent);