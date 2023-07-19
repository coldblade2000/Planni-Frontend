import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./redux/reducers"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";
import 'fontsource-roboto';
import {createRoot} from "react-dom/client";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const middleware = [
    thunk,
];
const composeEnhancers = composeWithDevTools({trace: true})

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(...middleware)
))
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const theme = createTheme({
    palette: {
        mode: "light"
    }
})
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>

            <BrowserRouter>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>

    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
