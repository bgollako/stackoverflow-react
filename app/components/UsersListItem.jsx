let React = require('react');
let ReactDOM = require('react-dom');
let BasicQuestion = require('BasicQuestion');
let {connect} = require('react-redux');


let UsersListItem = React.createClass({

    handleClick(e){
        e.preventDefault();
        this.props.onItemClick(this.props.user_id,this.props.user);
    },

    getIcon(){
        if(this.props.status){
            if(this.props.status == 'online')
                return 'images/green.png';
            else
                return 'images/yellow.png';
        }else{
            return 'images/yellow.png';
        }
    },

    render(){
        return (
            <a id={this.props.user_id} href='#' className={this.props.class_name} onClick={this.handleClick}>{this.props.user}<img style={{float:'right'}} src={this.getIcon()} /></a>
        );
    }
});

module.exports = UsersListItem;