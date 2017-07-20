let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let {userLoggedIn} = require('actions');
let api = require('api');
let actions = require('actions');

let Home = React.createClass({
    render(){
        return(
            <img src='images/post_login.jpg' />
        );
    }
});

module.exports = Home;