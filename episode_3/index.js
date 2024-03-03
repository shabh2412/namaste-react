import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

const elem = <span>React Element</span>;

const title = (
  <h1 className="head" tabIndex={5}>
    {elem}
    Namaste React using JSX🚀
  </h1>
);
const Title = () => (
  <h1 className="head" tabIndex={5}>
    {elem}
    Namaste React using JSX🚀
  </h1>
);

const HeadingComponent = () => (
  <div id="container">
    {
      // if you write curly braces inside JSX, then you can run any js code inside jsx.
      title
    }
    <Title />
    <Title></Title>
    <div className="heading">Namaste React Functional Component</div>
  </div>
);

root.render(<HeadingComponent />);