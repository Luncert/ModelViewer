import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Group, RGBAFormat, RGBFormat, Texture } from 'three';
import path from 'path';
import fs from 'fs';

const CACHED_LOADER: any = {}

export function loadModel(filePath: string): Group {
  let fileType = path.extname(filePath)
  if (fileType.startsWith('.')) {
    fileType = fileType.substr(1)
  }
  let loader = CACHED_LOADER[fileType]
  if (!loader) {
    switch (fileType) {
      case 'obj':
        loader = new OBJLoader()
        break
      case 'fbx':
        loader = new FBXLoader()
        break
      case 'gltf':
        loader = new GLTFLoader()
        break
      default:
        throw new Error('unsupport file type ' + fileType)
    }
    CACHED_LOADER[fileType] = loader
  }

  let data = fs.readFileSync(filePath).toString()
  return loader.parse(data)
}

export function loadTexture(filePath: string): Texture {
  let mediaType = path.extname(filePath).substr(1)
  filePath = path.join(process.cwd(), 'src', 'renderer', 'assets', filePath)
  let data = new Buffer(fs.readFileSync(filePath)).toString('base64')
  let texture = new Texture();

  const img = document.createElement('img')
  img.src = `data:image/${mediaType};base64,${data}`
  texture.image = img
  
  const isJPEG = filePath.search( /\.jpe?g($|\?)/i ) > 0 || filePath.search( /^data\:image\/jpeg/ ) === 0;
  texture.format = isJPEG ? RGBFormat : RGBAFormat;
  texture.needsUpdate = true;

  return texture
}