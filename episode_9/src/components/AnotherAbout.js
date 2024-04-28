import React from "react";

class AnotherAbout extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.parentName + " Another About Constructor");
  }
  componentDidMount() {
    console.log(this.props.parentName + " Another About componentDidMount");
  }
  render() {
    console.log(this.props.parentName + " Another About render");
    return <React.Fragment>
      <div>Another class based component</div>
    </React.Fragment>;
  }
}

export default AnotherAbout;