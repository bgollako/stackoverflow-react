let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');

let FromMessage = React.createClass({
    render(){
        return (
            <div className="well well-sm" style={{backgroundColor:'#ceeaf2',marginRight:'450px',boxShadow:'0 1px 2px rgba(0, 0, 0, 0.2)',borderRadius:'2px'}}>
                <small><i>{this.props.username}:</i></small><br/>
                {this.props.message}
            </div>
        );
    }
});

module.exports = FromMessage;