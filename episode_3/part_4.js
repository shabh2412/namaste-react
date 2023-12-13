import React from "react";
import ReactDOM from "react-dom/client";

// React Element
const heading = (
  <h1>
    Namaste React using JSX 🚀
  </h1>
);

// React Component
// Two ways of creating React Component
// Class Basrd Component - OLD
// Functional Component - NEW

// What is React Functional Component? -  It is a normal JS function which returns some JSX Element.

// This is a react component.
const HeadingFunctional = () => (
  <h1>
    Namaste React using JSX 🚀
  </h1>
);
const HeadingComponent = () => {
  return (<div>
    <h1>Namaste React Funtional Component</h1>;
    <HeadingFunctional />
  </div>);
};


const HeadingComponent2 = () => (
  <h1 className="heading">NR H2</h1>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);
root.render(<HeadingComponent />);

// Difference between react element and react component?

// What is component composition?
// Composing 2 components into one another.