import React, { Component } from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import ENV from "../Settings/EnvVariables";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


class Administration extends Component {

    tituloModal = '';
    textoModal = '';


    constructor(props){
        super(props);
        this.state = {
            expanded: null,
            usuarios: [],
            name: '',
            email: '',
            password: '',
            faculdade: '',
            matricula: '',
            isTeacher: false,
            showPassword: false,
            open: false
        };
    }

    componentDidMount(){
        this.carregarUsuarios();
    }

    carregarUsuarios(){
        axios.get(`${ENV.userAPI}/api/user`).then((response) =>{
            this.setState({usuarios: response.data});
        }).catch(error => {
            console.log('Error => ', error);
        });
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
    };

    handleChangeForm = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleChangeChecker = name => event => {
        this.setState({ [name]: event.target.checked });
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
            <DialogTitle id="responsive-dialog-title">{this.tituloModal}</DialogTitle>
            <DialogContent>
              <DialogContentText>{this.textoModal}</DialogContentText>
            </DialogContent>
          </Dialog>
        );
    }

    deletarUsuario(userId){
        axios.delete(`${ENV.userAPI}/api/user?userId=${userId}`).then((response) => {
            if(response.data){
                this.tituloModal = "Sucesso!";
                this.textoModal = "Sucesso ao deletar o usuário!";
                this.handleClickOpen();
                this.carregarUsuarios();
            }
            else{
                this.tituloModal = "Atenção!";
                this.textoModal = "Usuário não deletado!";
                this.handleClickOpen();
                this.carregarUsuarios();
            }
        }).catch(error => {
            this.tituloModal = "Erro";
            this.textoModal = "Houve algum ao deletar o usuário!";
            this.handleClickOpen();
            this.carregarUsuarios();
        });
    }

    createUser(){
        const user = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            isTeacher: this.state.isTeacher,
            faculdade: this.state.faculdade,
            matricula: this.state.matricula
        };

        axios.post(`${ENV.userAPI}/api/user`,user).then((response) => {
            if(response.data){
                this.tituloModal = "Sucesso!";
                this.textoModal = "Sucesso ao criar o usuário!";
                this.handleClickOpen();
                this.carregarUsuarios();
            }
            else{
                this.tituloModal = "Atenção!";
                this.textoModal = "Usuário não cadastrado!";
                this.handleClickOpen();
                this.carregarUsuarios();
            }
        }).catch(error => {
            this.tituloModal = "Erro";
            this.textoModal = "Houve algum ao cadastrar o usuário!";
            this.handleClickOpen();
            this.carregarUsuarios();
        });

        this.setState(
            {
                name: '',
                email: '',
                password: '',
                faculdade: '',
                matricula: '',
                isTeacher: false
            }
        )
    }

    renderCriarUsuario(){
        return(
            <div>
                <FormControl>
                    <InputLabel htmlFor="adornment-email" style={{color: 'red'}}>Nome *</InputLabel>
                    <Input id="adornment-name" style={{ width: '300px' }} 
                    value = {this.state.name} onChange={this.handleChangeForm('name')} onKeyPress={e => {
                        if(e.key === 'Enter') {
                        this.createUser();
                        }
                    }}/>
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel htmlFor="adornment-email" style={{color: 'red'}}>Email *</InputLabel>
                    <Input id="adornment-email" startAdornment={<InputAdornment position="start">@</InputAdornment>} style={{ width: '300px' }} 
                    value = {this.state.email} onChange={this.handleChangeForm('email')} onKeyPress={e => {
                        if(e.key === 'Enter') {
                        this.createUser();
                        }
                    }}/>
                </FormControl>
                <br />
                <br />
                <FormControl>
                <InputLabel htmlFor="adornment-password" style={{color: 'red'}}>Senha *</InputLabel>
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
                    } value={this.state.password} onChange={this.handleChangeForm('password')} onKeyPress={e => {
                    if(e.key === 'Enter') {
                        this.createUser();
                    }
                    }}/>
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel htmlFor="adornment-email">Faculdade</InputLabel>
                    <Input id="adornment-faculdade" style={{ width: '300px' }} 
                    value = {this.state.faculdade} onChange={this.handleChangeForm('faculdade')} onKeyPress={e => {
                        if(e.key === 'Enter') {
                        this.createUser();
                        }
                    }}/>
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel htmlFor="adornment-email">Matricula</InputLabel>
                    <Input id="adornment-matricula" style={{ width: '300px' }} 
                    value = {this.state.matricula} onChange={this.handleChangeForm('matricula')} onKeyPress={e => {
                        if(e.key === 'Enter') {
                        this.createUser();
                        }
                    }}/>
                </FormControl>
                <br />
                <br />
                Professor?
                <Switch checked={this.state.isTeacher} onChange={this.handleChangeChecker('isTeacher')} value="checkedA"/>
                <br />
                <br />
                <Button variant="contained" color="primary" onClick={() => {
                    this.createUser();
                }}>
                    Criar
                </Button>
            </div>
        );
    }

    convertBoolToString(item){
        if(item){
            return "Sim";
        }
        return "Não";
    }

    renderTable(){
        return (
            <div>
                <DialogTitle>Usuários Registrados</DialogTitle>
                <Paper>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Senha</TableCell>
                            <TableCell>Matricula</TableCell>
                            <TableCell>Faculdade</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.usuarios.map(row => (
                            <TableRow key={row.userId}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.password}</TableCell>
                            <TableCell>{row.matricula}</TableCell>
                            <TableCell>{row.faculdade}</TableCell>
                            <TableCell>{this.convertBoolToString(row.isTeacher)}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={()=>{
                                    this.deletarUsuario(row.userId);
                                }}>Deletar</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            
        );
    }


    render() {
        return(
            <div>
                <DialogTitle>Administração de Usuários</DialogTitle>

                <div>
                <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')} style={{width: '100%'}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Criar Usuário</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderCriarUsuario()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>

                <div>
                    {this.renderTable()}
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

export default Administration;