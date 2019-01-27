import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import './App.css';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showPassword: false,
      user: null,
      open: false
    }
  }
  async componentDidMount() {
    const user = localStorage.getItem('userTesterDS');
    await this.setState({
      user: JSON.parse(user)
    });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  renderModal(){
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Atenção!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{"Usuário ou senha incorreta."}</DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  async login(){
    axios.get(`http://localhost:5000/api/users/login?userName=${this.state.email}&password=${this.state.password}`).then((response)=> {
      var user = response.data;
      localStorage.setItem('userTesterDS', JSON.stringify(user));
      this.setState({
        user: user
      });
    }).catch(error => {
      console.log('Error => ',error);
      this.handleClickOpen();
    })
  }

  async logout(){
    localStorage.removeItem('userTesterDS');
    await this.setState({
      email: '',
      password:'',
      user: null
    });
  }


  render() {
    if(!this.state.user){
      return (
        <div className="App">
          <header className="App-header">
            <h3>Tester DS - Login</h3>
            <FormControl>
              <InputLabel htmlFor="adornment-email">E-mail</InputLabel>
              <Input id="adornment-amount" startAdornment={<InputAdornment position="start">@</InputAdornment>} style={{ width: '300px' }} 
              value = {this.state.email} onChange={this.handleChange('email')} onKeyPress={e => {
                if(e.key === 'Enter') {
                  this.login();
                }
              }}/>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="adornment-password">Senha</InputLabel>
              <Input id="adornment-password" type={this.state.showPassword ? 'text' : 'password'} style={{ width: '300px' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                } value={this.state.password} onChange={this.handleChange('password')} onKeyPress={e => {
                  if(e.key === 'Enter') {
                    this.login();
                  }
                }}/>
            </FormControl>
            <FormControl style={{paddingTop:'20px'}}>
              <Button variant="contained" onClick={() => {
                this.login();
              }}>
                Entrar
              </Button>
            </FormControl>
          </header>
          {this.renderModal()}
        </div>
      );
    }
    else {
      return (
        <div>
          <p>Logado!!!</p>
          <Button variant="contained" onClick={()=> {
            this.logout();
          }}>
          Sair
          </Button>
        </div>

      )
    }
  }
}

export default App;
