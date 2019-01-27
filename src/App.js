import React, { Component } from 'react';
import Routes from "./routes"
import Header from "./Componentes/Header";

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Routes />
            </div>
        );
    }
}

export default App;
