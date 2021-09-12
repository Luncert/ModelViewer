import React, { Component } from 'react';
import ReactDom from 'react-dom';
import TextLogo from './lib/components/TextLogo';
import Avatar from './components/Avatar';
import Container from './lib/Container';
import Header from './lib/Header';
import Button from './lib/components/Button';
import Progress from './lib/components/Progress';
import Divider from './lib/components/Divider';
import Modal from './lib/components/Modal';
import Input from './lib/components/Input';
import Label from './lib/components/Label';
import List from './lib/components/List';
// import './lib/components/common.css?global'

const styles =  require('./App.css') as any;

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
          <Header title='Template' subTitle='Loading configuration ...' />
          <Container>
            <div className={styles.header}>
              <TextLogo color='red' logo='
 ██████╗        █████╗ ██╗     ██╗
██╔════╝       ██╔══██╗██║     ██║
██║      ███╗  ███████║██║     ██║
██║      ╚══╝  ██╔══██║██║     ██║     
╚██████╗       ██║  ██║███████╗███████╗
 ╚═════╝       ╚═╝  ╚═╝╚══════╝╚══════╝' />
              <Avatar src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg" />
            </div>
            <div className={styles.menu}>
              <Button>Settings</Button>
              <Button>Jenkins</Button>
              <Button>Themisto</Button>
              <Button>Business Log</Button>
              <Button>Fortify</Button>
              <Button>Dark Duck</Button>
            </div>
            <Divider />
            <Progress value={100} />
            {/* <Modal>
              <Modal.Header>Profile Picture</Modal.Header>
              <Modal.Actions>
                <Button>Cancel</Button>
                <Button>Proceed</Button>
              </Modal.Actions>
            </Modal> */}
            <Label>Name:</Label>
            <Input />
            <Label>Age:</Label>
            <Input />
            <List>
              <List.Item>Apples</List.Item>
              <List.Item>Pears</List.Item>
              <List.Item>Oranges</List.Item>
            </List>
          </Container>
        </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));