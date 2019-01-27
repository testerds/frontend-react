import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {

    logOut(){
        localStorage.removeItem('userTesterDS');
        window.location = '/login';
    }

    render(){
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            TesterDS
                        </Typography>
                        <Button color="inherit" onClick={()=> this.props.history.push('/home')}>Home</Button>
                        <Button color="inherit" style={{position:'absolute',right: '0'}} onClick={()=> {
                            this.logOut();
                        }}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;