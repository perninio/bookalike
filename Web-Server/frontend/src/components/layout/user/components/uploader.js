import React from "react";
import './uploader.css'
import {AnchorButton, Intent} from "@blueprintjs/core";

export default class DraggableUploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
	
	onFileLoad(e) {
  //Get current selected or dropped file (it gives you the ability to load multiple images).
  const file = e.currentTarget.files[0];
  //Create instance 
  let fileReader = new FileReader();
  //Register event listeners
  fileReader.onload = () => {
    console.log("IMAGE LOADED: ", fileReader.result);
  }
  //Operation Aborted 
  fileReader.onabort = () => {
    alert("Reading Aborted");
  }
  //Error when loading 
  fileReader.onerror = () => {
    alert("Reading ERROR!");
  }
  //Read the file as a Data URL (which gonna give you a base64 encoded image data)
  fileReader.readAsDataURL(file);
}



  render() {
    return (
      <div
        className="inner-container"
        style={{
        display: "flex",
        flexDirection: "column"
      }}>
        <div className="sub-header">Drag an Image</div>
        <div className="draggable-container">
          
					  <input
			type="file"
			id="file-browser-input"
			name="file-browser-input"
			ref={input => this.fileInput = input}
			onDragOver={(e) => {
			e.preventDefault();
			   e.stopPropagation();
			}}
			onDrop={this
			.onFileLoad
			.bind(this)}
			onChange={this
			.onFileLoad
			.bind(this)}/>
		  
		  
          <div className="files-preview-container"></div>
          <div className="helper-text">Drag and Drop Images Here</div>
          <div className="file-browser-container">
            <AnchorButton
              text="Browse"
              intent={Intent.PRIMARY}
              minimal={true}
              onClick={() => this.fileInput.click()}/>
          </div>
        </div>
        <AnchorButton text="Upload" intent={Intent.SUCCESS}/>
      </div>
    );
  }
}