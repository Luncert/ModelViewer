import React, { Component } from 'react';
import * as Three from 'three'
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, AxesHelper, GridHelper, TextureLoader } from 'three';
import em, { Handler } from '../component/EventManager';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Events from '../component/Events';
import { loadModel, loadTexture } from './ResourceLoader';

const styles = require('./ModelScene.css') as any

interface ModelSceneProps {
}

export default class ModelScene extends Component<ModelSceneProps> {

  private rendererRef: React.RefObject<HTMLDivElement>

  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private controls: OrbitControls

  private loadModelHandler: Handler

  constructor(props: any) {
    super(props)
    this.rendererRef = React.createRef()
  }

  componentDidMount() {
    let target = this.rendererRef.current

    // create scene
    this.scene = new Scene()
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.z = 5;

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(target.clientWidth, target.clientHeight)
    this.renderer.setClearColor('rgb(84, 84, 206)', 1);
    window.onresize = () => {
      this.renderer.setSize(target.clientWidth, target.clientHeight)
    }

    target.appendChild(this.renderer.domElement)

    // add axis
    // const axesHelper = new AxesHelper(5)
    // this.scene.add(axesHelper)

    // add grid
    const gridHelper = new GridHelper(16, 10);
    this.scene.add(gridHelper)

    // add control
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // load model
    this.loadModelHandler = em.on(Events.LOAD_MODEL, (filePath: string) => {
      this.scene.clear()
      this.scene.add(loadModel(filePath))
      console.log('model loaded')
    })

    this.createSteve()

    this.animate()
  }

  createSteve() {
    const texture = loadTexture('texture/player_skin.png')
    texture.mapping = Three.UVMapping
    texture.repeat.set( 4, 4 );

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({color: 0x00aaff, map: texture});
    const cube = new Mesh(geometry, material);
    this.scene.add(cube);
  }

  componentWillUnmount() {
    em.off(this.loadModelHandler)
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
    this.controls.update()
  }

  render() {
    return (
      <div ref={this.rendererRef} className={styles.renderer}>
      </div>
    )
  }
}