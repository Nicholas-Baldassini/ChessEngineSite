import React, { Component } from "react";

import * as THREE from "three";
import ThreeGraphics from "./ThreeGraphics";
class ThreeComponent extends Component {
  componentDidMount() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    ThreeGraphics(renderer);
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default ThreeComponent;
