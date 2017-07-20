let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');

let ToMessage = React.createClass({
    render(){
        return (
            <div className="well well-sm" style={{backgroundColor:'rgba(127, 255, 127, 0.298)',marginLeft:'400px',boxShadow:'0 1px 2px rgba(0, 0, 0, 0.2)',borderRadius:'2px'}}>
                <small><i>You:</i></small><br/>
                {this.props.message}
            </div>
        );
    }
});

module.exports = ToMessage;