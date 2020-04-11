import React, {Component} from 'react';
import { Uppload, en, Local, Preview , Camera, Instagram, Facebook, Screenshot, Crop, Pixabay} from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

const defaultImage =
  "https://images.unsplash.com/photo-1557137848-12de044c6f84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400";
var localStream;
  const uppload = new Uppload({
    lang: en,
    defaultService: "local",
    uploader: (file, updateProgress) =>
      new Promise(resolve => {
        setTimeout(() => resolve(window.URL.createObjectURL(file)), 4000);
        let progress = 0;
        const interval = setInterval(() => {
          if (progress > 99) {
              clearInterval(interval);
          }
          updateProgress(progress++);
        }, 30);
      })
  });

uppload.use([new Local(), new Preview(), new Camera(), new Instagram(), new Facebook(), new Screenshot(), new Crop({
    aspectRatioOptions: {
      free: NaN,
      square: 1,
      "16:9": 16 / 9
    }
  }), new Pixabay("15997968-08e2b4133a763a2b3a078bcb7")]);

export class UpploadReact extends React.Component {
    constructor() {
      super();
      this.state = {
        url: defaultImage,
        ready: false
      };
    }
    open() {
      uppload.on("upload", url => {
        this.setState({ url });
      });
      uppload.open();
      
    }
    render() {
      return (
        <div>
          <div><img style={{marginLeft:500, marginTop:100}} alt="" src={this.state.url} /></div>
          <button className="Button" onClick={this.open.bind(this)} style={{marginLeft:"650px", marginTop: "10px"}}>Click here </button>
        </div>
      );
    }
  }


export default UpploadReact;