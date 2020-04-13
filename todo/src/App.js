import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Todo from './pages/todo.component';

class App extends React.Component{
    render(){
        return (
            <div>>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Todo}/>
                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default App;