let React = require('react');
let ReactDOM = require('react-dom');
let BasicQuestion = require('BasicQuestion');
let {connect} = require('react-redux');


let ChatSend = React.createClass({

    getInitialState(){
        return {
            value:''
        };
    },

    handleClick(e){
        e.preventDefault();
        let value = this.refs.message.value;
        this.setState({value:''});
        this.props.handleSendMessage(value);
    },

    handleChange(e){
        e.preventDefault();
        this.setState({value:this.refs.message.value});
    },

    render(){
        return (
            <div>
                <div className="form-group" style={{marginBottom:'2px'}}>
                    <textarea value={this.state.value} style={{resize:'None'}} ref='message' placeholder='Message' className="form-control" rows="2" id="comment" onChange={this.handleChange}></textarea>
                </div>
                <button type="button" className="btn btn-info" onClick={this.handleClick}>Send</button>
            </div>
        );
    }
});

module.exports = ChatSend;