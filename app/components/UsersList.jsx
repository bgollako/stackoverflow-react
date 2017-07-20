let React = require('react');
let ReactDOM = require('react-dom');
let UsersListItem = require('UsersListItem');
let {connect} = require('react-redux');
let api = require('api');

let UsersList = React.createClass({

    getInitialState(){
        return {
            currentSelection:'',
            users:[]
        };
    },

    getDummyState(){
        return {
            currentSelection:'',
            users:[]
        };
    },

    handleUserItemClick(user_id,user){
        let state = this.getDummyState();
        state.users = this.props.users.map(t=>t);
        state.currentSelection = user_id;
        this.setState(state);
        this.props.onUserSelect(user_id,user);
    },

    shouldComponentUpdate(nextProps, nextState){
        return true;
    },

    getClassForItem(user_id){
        if(this.state.currentSelection == user_id)
            return 'list-group-item active';
        else
            return 'list-group-item';
    },

    renderUser(user){
        return(
            <UsersListItem class_name={this.getClassForItem(user._id)} key={user._id} user_id={user._id} user={user.name} onItemClick={this.handleUserItemClick}/>
        );
    },

    renderUsers(){
        if(this.props.status == 'BEGIN_GET_ACTIVE_USERS'){
            return(
                <img src='images/loader_32.gif' style={{marginLeft:'42%',marginTop:'50%'}}/>
            );
        }else if(this.props.status == 'COMPLETE_GET_ACTIVE_USERS'){
            if(this.props.users.length == 0){
                return (
                <div className="alert alert-info" style={{marginTop:'20px',marginLeft:'10px',marginRight:'10px'}}>
                    No users found online
                </div>
                );
            }
            let userDetails = api.getUserFromLocalStorage();
            let userId = (userDetails && userDetails.user)?userDetails.user:'';
            let usersArray=[];
            for(let i=0; i<this.props.users.length; i++){
                if(userId != this.props.users[i]._id)
                    usersArray.push(this.renderUser(this.props.users[i]));
            }
            return (
                <ul className="list-group" style={{marginBottom:'0px'}}>
                    {usersArray}
                </ul>
            );
        }else if(this.props.status == 'ERROR_ON_GET_ACTIVE_USERS'){
            return(
                <div className="alert alert-danger" style={{marginTop:'20px',marginLeft:'10px',marginRight:'10px'}}>
                Error while fetching users
                </div>
            );
        }else{
            let userDetails = api.getUserFromLocalStorage();
            let userId = (userDetails && userDetails.user)?userDetails.user:'';
            let usersArray=[];
            for(let i=0; i<this.state.users.length; i++){
                if(userId != this.props.users[i]._id)
                    usersArray.push(this.renderUser(this.state.users[i]));
            }
            this.setState(state);
            return (
                <ul className="list-group" style={{marginBottom:'0px'}}>
                    {usersArray}
                </ul>
            );
        }
    },

    render(){
        return (
            <div className="panel panel-default" style={{marginBottom:'2px'}}>
                <div className="panel-heading"><strong>Users</strong></div>
                <div className="panel-body" style={{padding:'0px',height:'500px',overflow:'scroll'}}>
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
});

module.exports = connect(state=>{
    return {
        status: state.getActiveUsersState.status,
        users: (state.getActiveUsersState.users)?state.getActiveUsersState.users.map(t=>t):[],
        message: state.getActiveUsersState.message
    };
})(UsersList);

