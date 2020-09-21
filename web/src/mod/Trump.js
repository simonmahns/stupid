import React, { Component } from "react";

import textur from "./hold.png";

import spottMessTex from "./hold.png";
import spottTexture from "./hold.png";
import man from "./trumpp.glb";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

var meshH = [];
class Trump extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -74.0102,
      lat: 40.704,
      zoom: 15.5,
      sub: "submit email",
      subme: "",
      subVal: 0,
      opaci: 0,
      visi: "hidden",
      popupV: "hidden",
      popupO: 0,
      email: "",
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    // var d = new Date();
    // var startTime = d.getTime();
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    camera.position.y = 0;
    camera.position.z = 10;

    var spottGeo = new THREE.PlaneGeometry(1, 1);
    const load2 = new THREE.TextureLoader();
    var spottMat = new THREE.MeshBasicMaterial({
      map: load2.load(spottTexture),
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: false,
    });
    var spottPlane = new THREE.Mesh(spottGeo, spottMat);
    spottPlane.position.set(110, 125.3, 190);

    // var directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    // directionalLight.position.set(0, 1, 0);
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);
    // var light = new THREE.PointLight(0xc4c4c4, 10);
    // light.position.set(0, 300, 500);
    // scene.add(light);
    // var light2 = new THREE.PointLight(0xc4c4c4, 10);
    // light2.position.set(500, 100, 0);
    // scene.add(light2);
    // var light3 = new THREE.PointLight(0xc4c4c4, 10);
    // light3.position.set(0, 100, -500);
    // scene.add(light3);
    // var light4 = new THREE.PointLight(0xc4c4c4, 10);
    // light4.position.set(-500, 300, 500);
    // scene.add(light4);
    // scene.add(spottPlane);
    // var fogColor = new THREE.Color(0x000000);
    // scene.fog = new THREE.FogExp2(fogColor, 0.01);
    // renderer.setClearColor(0x000000);
    // this.spottPlane = spottPlane;
    var hlight = new THREE.AmbientLight(0x404040, 10);
    scene.add(hlight);
    var loader = new GLTFLoader();

    loader.load(man, function (gltf) {
      var car = gltf.scene.children[0];
      car.scale.set(10.5, 10.5, 10.5);
      scene.add(gltf.scene);
      this.car = car;
    });
    this.scene = scene;

    this.camera = camera;
    this.renderer = renderer;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }
  resizeCanvasToDisplaySize() {
    const canvas = this.renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }
  animate() {
    // counter += 0.07;
    // //continuous glowy/plusing buildings
    // var indd = Math.sin(counter * 0.2) + 1;
    // this.mat.size = (-0.5 * indd * indd + indd) * 0.5 + 1.2;
    // this.parent.position.y = (-0.5 * indd * indd + indd) * 5.0;

    //this.messPlane
    //play video at right time
    this.scene.rotation.y += 0.005;
    var tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
    var windowHeight = window.innerHeight;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.fov =
      (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
    this.camera.updateProjectionMatrix();
    this.resizeCanvasToDisplaySize();

    // this.renderer.setSize(window.innerWidth - 18, window.innerHeight);
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        className="three"
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Trump;
