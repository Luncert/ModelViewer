import path from 'path'
import fs from 'fs'
import express, { Express } from 'express'
import { Config } from 'electron'

const pac = `
function FindProxyForURL(url, host) {
  return 'PROXY localhost:49070';
}
`

export default class ResourceServer {

  private server: Express
  private resourceCache: ResourceSearchPath[]

  getProxy(): Config {
    return ({
      pacScript: 'http://localhost:49070/proxy.pac'
    })
  }

  registerResource(filePath: string) {
    let p: ResourceSearchPath = {
      baseResource: path.basename(filePath),
      resourceLocation: path.dirname(filePath),
      resourceCache: new Set()
    }
    fs.readdirSync(p.resourceLocation).forEach(() => p.resourceCache.add)
    this.resourceCache.push(p)
  }

  start() {
    this.server = express()
    this.server.get('/proxy.pac', (req, rep) => {

    })
    this.server.get('/resource/*', (req, rep) => {
      console.log(req.path)
    })
    this.server.listen(49070, () => console.log('resource server started'))
  }
}

interface ResourceSearchPath {
  baseResource: string
  resourceLocation: string
  resourceCache: Set<string>
}