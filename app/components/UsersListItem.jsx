let React = require('react');
let ReactDOM = require('react-dom');
let BasicQuestion = require('BasicQuestion');
let {connect} = require('react-redux');


let UsersListItem = React.createClass({

    handleClick(e){
        e.preventDefault();
        this.props.onItemClick(this.props.user_id,this.props.user);
    },

    render(){
        return (
            <a id={this.props.user_id} href='#' className={this.props.class_name} onClick={this.handleClick}>{this.props.user}</a>
        );
    }
});

module.exports = UsersListItem;