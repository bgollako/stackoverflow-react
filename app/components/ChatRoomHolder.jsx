let React = require('react');
let ReactDOM = require('react-dom');
let BasicQuestion = require('BasicQuestion');
let {connect} = require('react-redux');
let actions = require('actions');
let ChatRoom = require('ChatRoom');
let api = require('api');

let ChatRoomHolder = React.createClass({

    getInitialState(){
        return {
            webSocket:undefined
        };
    },

    shouldComponentUpdate(nextProps, nextState){
        return false;
    },

    getDummyState(){
        return {
            webSocket:undefined
        };
    },

    getWebSocket(userId){
        let webSocket=undefined;
        if(!this.state.webSocket){
            let userDetails = api.getUserFromLocalStorage();
            let userId = (userDetails && userDetails.user)?userDetails.user:'';
            webSocket = new WebSocket('ws://35.197.28.5:80/chat/'+userId);
            webSocket.onopen=()=>{
                console.log('Ready');
            };
            let state = this.getDummyState();
            state.webSocket = webSocket;
            this.setState(state);
        }else{
            webSocket = this.state.webSocket;
        }
        return webSocket;
    },
    

    

    render(){
        console.log('ChatRoomHolder');
        this.props.dispatch(actions.getAllActiveUserApi());
        return (
            <ChatRoom getWebSocket={this.getWebSocket}/>
        );
    }
});

// module.exports = connect(state=>{
//     return {
//         status: state.getSearchQuestionState.status,
//         questions: state.getSearchQuestionState.questions
//     };
// })(ChatRoom);

module.exports = connect()(ChatRoomHolder);