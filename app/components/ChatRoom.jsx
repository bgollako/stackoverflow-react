let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let UsersList = require('UsersList');
let MessageAreas = require('MessageAreas');
let api = require('api');

let ChatRoom = React.createClass({
    
    getInitialState(){
        return {
            currentUserId:'',
            curentUsername:'',
            messages:[]

        };
    },

    getDummyState(){
        return {
            currentUserId:'',
            curentUsername:'',
            messages:[]
        };
    },

    createToMessage(userId,message){
        return{
            type:'TO',
            userId,
            message
        };
    },

    createFromMessage(userId,message){
        return{
            type:'FROM',
            userId,
            message
        };
    },

    handleUserSelect(userId,username){
        let state = this.getDummyState();
        state.currentUserId = userId;
        state.curentUsername = username;
        let newArray = this.state.messages.map(t=>t);
        state.messages = newArray;
        this.setState(state);
    },

    handleSendMessage(e){
        e.preventDefault();
        if(this.state.currentUserId == '' || this.state.curentUsername == '')
            return;
        let userDetails = api.getUserFromLocalStorage();
        let userId = (userDetails && userDetails.user)?userDetails.user:'';
        let value = this.refs.message.value.trim();
        if(value == '')
            return;
        
        let webSocket = this.props.getWebSocket();
        while(webSocket.readState==0){}
        let message = JSON.stringify({
            sender_id: userId,
            reciever_id: this.state.currentUserId,
            message:value
        });
        console.log(message);
        webSocket.send(message);
    },

    onMessageRecieved(e){
        console.log(e.data);
        let userDetails = api.getUserFromLocalStorage();
        let userId = (userDetails && userDetails.user)?userDetails.user:'';
        if(e.data && e.data.length > 0){
            let message = JSON.parse(e.data);
            if(message){
                let newArray = this.state.messages.map(t=>t);
                if(message.sender_id == userId){
                    let toMessage = this.createToMessage(message.reciever_id,message.message);
                    console.log("TO " + JSON.stringify(toMessage));
                    newArray.push(toMessage);
                }else{
                    let fromMessage = this.createFromMessage(message.sender_id,message.message);
                    console.log("FROM " + JSON.stringify(fromMessage));
                    newArray.push(fromMessage);
                }
                let state = this.getDummyState();
                state.currentUserId = this.state.currentUserId;
                state.curentUsername = this.state.curentUsername;
                state.messages = newArray;
                this.setState(state);
            }
        }
        
    },

    render(){
        let webSocket = this.props.getWebSocket();
        webSocket.onmessage = this.onMessageRecieved;
        return(
            <div className='container'>
                <div className="row">
                    <div className="col-sm-3" style={{paddingRight:'2px'}}>
                         <UsersList onUserSelect={this.handleUserSelect}/>
                    </div>
                    <div className="col-sm-9" style={{paddingLeft:'2px'}}>
                        <MessageAreas username={this.state.curentUsername} userId={this.state.currentUserId} messages={this.state.messages}/>
                        <div className="form-group" style={{marginBottom:'2px'}}>
                            <textarea style={{resize:'None'}} ref='message' placeholder='Message' className="form-control" rows="2" id="comment"></textarea>
                        </div>
                        <button type="button" className="btn btn-info" onClick={this.handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = connect(state=>{
    return {
        status: state.getSearchQuestionState.status,
        questions: state.getSearchQuestionState.questions
    };
})(ChatRoom);

// module.exports = connect()(SearchQuestions);