import React from "react";
import AnotherAbout from "./AnotherAbout";

class AboutDev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count1: 0,
      count2: 0,
      user_info: {
        name: "",
        email: "",
        avatar_url: "",
      },
    };
    console.log(this.props.name, "child constructor");
  }

  async componentDidMount() {
    try {
      const response = await fetch(`https://api.github.com/users/${this.props.name}`);
      const result = await response?.json();
      this.setState({
        user_info: result,
      });
    } catch (error) {

    }
    console.log(this.props.name, "child componentDidMount");
  }

  render() {
    console.log(this.props.name, "child render");
    const { contact } = this.props;
    const { name, avatar_url } = this.state.user_info;
    return <div>
      <div>
        <p>Count 1 - {this?.state?.count1}</p>
        <button onClick={() => { this.setState({ count1: this.state.count1 + 1 }); }}>Increase counter 1</button>
        <p>Count 2 - {this?.state?.count2}</p>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "start", alignItems: "center", gap: "2px" }} >
        <p >Created by - </p>
        <p >{name}</p>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "start", alignItems: "center", gap: "2px" }} >
        <p >Contact - </p>
        <p >{contact}</p>
      </div>
      <AnotherAbout parentName={name} />
    </div>;
  }
}

export default AboutDev;