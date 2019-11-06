import React, { Component } from "react";
import Popup from "./Popup";
import ImageUploader from "./ImageUploader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  closePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.closePopup.bind(this)}>
          Dodaj nowe zdjęcie
        </button>
        {this.state.showPopup ? (
          <Popup
            closePopup={this.closePopup.bind(this)}
            content={<ImageUploader />}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
