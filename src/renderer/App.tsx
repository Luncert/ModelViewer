import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ModelScene from './view/ModelScene';
import { Header, Container } from './view';
import { Menu, MenuItem, MenuSubItem } from './view/Menu';
import { ipcRenderer } from 'electron';
import { Channels } from '../common/Constants';
const styles =  require('./App.css') as any;
import em from './component/EventManager';
import Events from './component/Events';

interface AppState {
}

class App extends Component<any, AppState> {
  
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <div className={styles.app}>
          <Header title='ModelViewer' element={
            <Menu>
              <MenuItem name='File'>
                <MenuSubItem name='Open' onSelect={() => {
                  let filePaths: string[] = ipcRenderer.sendSync(Channels.OpenFile)
                  if (filePaths.length > 0) {
                    em.emit(Events.LOAD_MODEL, filePaths[0])
                  }
                }} />
              </MenuItem>
              <MenuItem name='Help'>
              </MenuItem>
            </Menu>
          } />
          <Container>
            <ModelScene />
          </Container>
        </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));