let React = require('react');
let ReactDOM = require('react-dom');
let Root = require('Root');
let store = require('store').configure();
let {Provider} = require('react-redux');
// let redux_example = require('./redux-example.jsx');


ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('app')
);