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

    getUsername(){
        if(this.props.username && this.props.username!='')
            return this.props.username;
        else
            return 'Chat Room';
    },

    render(){
        return (
            <div className="panel panel-success" style={{marginBottom:'2px'}}>
                <div className="panel-heading"><strong>{this.getUsername()}</strong></div>
                <div className="panel-body" style={{height:'500px',overflow:'scroll'}}>
                    {this.displayMessages()}
                </div>
            </div>
        );
    }
});

module.exports = MessageAreas;