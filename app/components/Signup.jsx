let React = require('react');
let ReactDOM = require('react-dom');
let api = require('api');
let {connect} = require('react-redux');
let actions = require('actions');
let {Checkbox,Panel,Form,FormGroup,InputGroup,Glyphicon,FormControl,Button} = require('react-bootstrap');

let Signup = React.createClass({

    getInitialState(){
      return {
        isSubmitted:false,
        mainError:'',
        name:{hasError:false,errorMessage:''},
        username:{hasError:false,errorMessage:''},
        email:{hasError:false,errorMessage:''},
        password:{hasError:false,errorMessage:''},
        city:{hasError:false,errorMessage:''}
      };
    },

    getDummyState: () =>{
      return {
        isSubmitted:false,
        mainError:'',
        name:{hasError:false,errorMessage:''},
        username:{hasError:false,errorMessage:''},
        email:{hasError:false,errorMessage:''},
        password:{hasError:false,errorMessage:''},
        city:{hasError:false,errorMessage:''}
      }
    },
    

    onFormSubmit(e){
      e.preventDefault();
      let name = this.refs.name.value.trim();
      let username = this.refs.username.value.trim();
      let email = this.refs.email.value.trim();
      let password = this.refs.password.value.trim();
      let city = this.refs.city.value.trim();
      let hasError = false;
      let state = this.getDummyState();   
      if(name.length == 0)
        state.name.hasError = true;   
      if(username.length == 0)
        state.username.hasError = true;
      else{
        if(username.includes(' ') || username.includes('  ')){
          state.username.hasError = true;
          state.username.errorMessage = 'No white spaces allowed';
        }else{
          state.username.hasError = false;
          state.username.errorMessage = '';
        }
      }
      if(email.length == 0)
        state.email.hasError = true;
      else{
        if(!email.includes('@')){
          state.email.hasError = true;
          state.email.errorMessage = 'Specify proper email address';
        }else{
          state.email.hasError = false;
          state.email.errorMessage = '';
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
      if(city.length == 0)
        state.city.hasError = true;
      this.setState(state);
      if(!state.username.hasError && !state.email.hasError && !state.password.hasError
          && !state.name.hasError && !state.city.hasError){
            let currState = this.getDummyState();
            currState.isSubmitted = true;
            this.setState(currState);
        this.props.dispatch(actions.signUpApi(name,email,username,password,city));
      }
    },

    getInputStyles(refId){
      let currentState = this.state;
      if(currentState[refId].hasError){
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
      }
    },

    displayLoadingButton(){
      let currentState = this.state;
      if(currentState.isSubmitted && this.props.status == 'BEGIN_SIGN_UP'){
        return (<span><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Signing up</span>);
      }else{
        return (<span>Sign up</span>);
      }
    },

    displayMainErrorMessage(){
      if(this.props.status == 'ERROR_ON_SIGN_UP'){
        return (
           <div className="alert alert-danger" style={{marginTop:'20px'}}>
              <strong>Error</strong>, please consult admin for info.
            </div>
        );
      }
    },

    render(){
      if(this.props.status == 'COMPLETE_SIGN_UP'){
        setTimeout(()=>{this.context.router.push('/login')},1000)
      }
        return (
          <div className style={{marginTop:'5%',marginLeft:'20%',marginRight:'30%'}}>
            {this.displayMainErrorMessage()}
            <div className="panel panel-info">
              <div className="panel-heading">
                <span className="panel-title" style={{fontSize:'24px',fontStyle:'bold'}}>Join the community</span>
              </div>
              <div className="panel-body">
                <form role="form" onSubmit={this.onFormSubmit}>

                  {this.displayErrorMessage('name')}
                  <div className={this.getInputStyles('name')}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    <input type="text" className="form-control" ref="name" placeholder="Name"/>
                  </div>

                  {this.displayErrorMessage('email')}
                  <div className={this.getInputStyles('email')}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                    <input type="text" className="form-control" ref="email" placeholder="Email"/>
                  </div>

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

                  {this.displayErrorMessage('city')}
                  <div className={this.getInputStyles('city')}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                    <input type="text" className="form-control" ref="city" placeholder="City"/>
                  </div>

                  <button type="submit" className="btn btn-info">{this.displayLoadingButton()}</button>
                </form>
              </div>
            </div>          
          </div>
        )
    }
});

// module.exports = Signup;

Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect(state=>{
  return {
    status: state.getSignUpState.status,
    message: state.getSignUpState.message
  };
})(Signup);