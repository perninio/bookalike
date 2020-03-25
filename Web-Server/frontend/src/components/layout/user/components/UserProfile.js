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
	  <div className="user-image">
		<img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" height="100px"/>
	  </div>
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
	  </div>
    );
  }
}

export default App;
