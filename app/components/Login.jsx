let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let {userLoggedIn} = require('actions');
let api = require('api');
let actions = require('actions');
let {Image,Panel,Form,FormGroup,ControlLabel,FormControl,Button,InputGroup,Glyphicon} = require('react-bootstrap');

let Login = React.createClass({
    
    getInitialState(){
      return {
        isSubmitted: false,
        username:{hasError:false,errorMessage:''},
        password:{hasError:false,errorMessage:''}
      };
    },

    getDummyState: () =>{
      return {
        isSubmitted: false,
        username:{hasError:false,errorMessage:''},
        password:{hasError:false,errorMessage:''}
      }
    },

    onFormSubmit: function(e){
      e.preventDefault();
      this.props.dispatch(actions.userLoggingIn());
      let username = this.refs.username.value.trim();
      let password = this.refs.password.value.trim();
      let hasError = false;
      let state = this.getDummyState();      
      if(username.length == 0)
        state.username.hasError = true;
      else{
        if(username.includes(' ') || username.includes('  ')){
          state.username.hasError = true;
          state.username.errorMessage = 'Usernames cannot have whitespaces';
        }else{
          state.username.hasError = false;
          state.username.errorMessage = '';
        }
      }
      if(password.length == 0)
        state.password.hasError = true;
      else{
        if(password.length < 8){
          state.password.hasError = true;
          state.password.errorMessage = 'Password must have atleast 8 characters';
        }else{
          state.password.hasError = false;
          state.password.errorMessage = '';
        }
      }
      this.setState(state);
      if(!state.username.hasError && !state.password.hasError){
          let state = this.getDummyState();
          state.isSubmitted = true;
          this.setState(state);
          this.props.onLoginSubmit(username,password);
      }
    },

    getInputStyles(refId){
      let currentState = this.state;
      if(currentState[refId].hasError || (this.props.loginState == 'loggedOut' && (this.props.message && this.props.message.length > 0))){
        return 'form-group input-group has-error';
      }else{
        return 'form-group input-group';
      }
    },

    displayErrorMessage(refId){
      let currentState = this.state;
      if(currentState[refId].hasError){
        if(currentState[refId].errorMessage.length>0){
          return (
            <div style={{color:'#d60c0c',fontStyle:'italic',fontSize:'12px'}}>
              {currentState[refId].errorMessage}
            </div> 
          );
        }
      }else if(this.props.loginState == 'loggedOut' && (this.props.message && this.props.message.length>0) && refId == 'username'){
        return (
          <div style={{color:'#d60c0c',fontStyle:'italic',fontSize:'12px'}}>
              {this.props.message}
            </div> 
        );
      }
    },

    displayLoadingButton(){
      let currentState = this.state;
      if(currentState.isSubmitted && this.props.loginState == 'loggingIn'){
        return (<span><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading</span>);
      }else{
        return (<span>Login</span>);
      }
    },

    getUserDetailsFromLocalStorage:function(){
        let userDetails = api.getUserFromLocalStorage();
        if(userDetails){
            return userDetails.user;
        }
    },

    render: function(){
      console.log(this);
      let userDetails = this.getUserDetailsFromLocalStorage();
      if(userDetails && userDetails.user){
        setTimeout(()=>{this.context.router.push('#/')},1000)
      }

      if(this.props.loginState){
        if(this.props.loginState == 'loggedIn'){
          setTimeout(()=>{this.context.router.push('#/')},1000)
        }
      }
        return (
          <div style={{marginTop:'5%',marginLeft:'20%',marginRight:'30%'}}>
            <div className="panel panel-info">
              <div className="panel-heading">
                <span className="panel-title" style={{fontSize:'24px',fontStyle:'bold'}}>Login</span>
              </div>
              <div className="panel-body">
                <form role="form" onSubmit={this.onFormSubmit}>

                  {this.displayErrorMessage('username')}
                  <div className={this.getInputStyles('username')}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    <input type="text" className="form-control" ref="username" placeholder="Username"/>
                  </div>
                  
                  {this.displayErrorMessage('password')}
                  <div className={this.getInputStyles('password')}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-eye-open"></i></span>
                    <input type="password" className="form-control" ref="password" placeholder="Password"/>
                  </div>

                  <button type="submit" className="btn btn-info">{this.displayLoadingButton()}</button>
                </form>
              </div>
            </div>          
          </div>
        );
    }
});

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect(state=>{
  return {
    loginState: state.userState.status,
    message: state.userState.message
  };
})(Login);