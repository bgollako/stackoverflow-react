let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let ToMessage = require('ToMessage');
let FromMessage = require('FromMessage');

let MessageAreas = React.createClass({

    displayMessages(){
        let messagesArray=[];
        for(let i=0;i<this.props.messages.length;i++){
            let message = this.props.messages[i];
            if(message.type =='TO' && message.userId == this.props.userId){
                messagesArray.push(
                    <ToMessage message={message.message} key={i}/>
                );
            }else if(message.type == 'FROM' && message.userId == this.props.userId){
                messagesArray.push(
                    <FromMessage message={message.message} key={i} username={message.userId}/>
                );
            }
        }
        return messagesArray;
    },

    render(){
        return (
            <div className="panel panel-default" style={{marginBottom:'2px'}}>
                <div className="panel-heading"><strong>{this.props.username}</strong></div>
                <div className="panel-body" style={{height:'600px',overflow:'scroll'}}>
                    {this.displayMessages()}
                </div>
            </div>
        );
    }
});

module.exports = MessageAreas;