import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imgUrl: "",
  box: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imgUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const numberOfRegions = data.outputs[0].data.regions.length;
    let faces = [];
    for (let i = 0; i < numberOfRegions; i++) {
      const faceBox = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      faces.push({
        leftCol: faceBox.left_col * width,
        topRow: faceBox.top_row * height,
        rightCol: width - faceBox.right_col * width,
        bottomRow: height - faceBox.bottom_row * height,
      });
    }
    return faces;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onButtonClick = () => {
    this.setState({ imgUrl: this.state.input });
    fetch("https://fathomless-beyond-12838.herokuapp.com/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://fathomless-beyond-12838.herokuapp.com/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, box, route, imgUrl } = this.state;
    const { entries, name } = this.state.user;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <div>
            <Logo />
            <Rank entries={entries} name={name} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonClick={this.onButtonClick}
            />
            <FaceRecognition imgUrl={imgUrl} box={box} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
