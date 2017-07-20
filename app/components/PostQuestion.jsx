let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let actions = require('actions');
let {Panel,Form,FormGroup,ControlLabel,FormControl,Button,InputGroup,Glyphicon} = require('react-bootstrap');

let PostQuestion = React.createClass({

    getInitialState(){
      return {
        title:{hasError:false,message:''},
        question:{hasError:false,message:''},
        main:{hasError:false,message:''},
        isSubmitted:false
      };
    },

    getDummyState(){
      return {
        title:{hasError:false,message:''},
        question:{hasError:false,message:''},
        main:{hasError:false,message:''},
        isSubmitted:false
      };
    },


    onFormSubmit: function(e){
      e.preventDefault();
      //clear existing state on submit
      this.setState(this.getDummyState());
      let title = this.refs.title.value.trim();
      let question = this.refs.question.value.trim();
      let newState = this.getDummyState();
      newState.isSubmitted = true;
      if(title.length == 0)
        newState.title.hasError = true;
      if(question.length == 0)
        newState.question.hasError = true;
      if(newState.title.hasError || newState.question.hasError){
        this.setState(newState);
        return;
      }
      this.setState(newState);
      this.props.dispatch(actions.postQuestionApi(title,question));
    },

    getInputStyles(refId){
      let currentState = this.state;
      if(currentState[refId].hasError){
        return 'form-group has-error';
      }else{
        return 'form-group';
      }
    },

    displayLoadingButton(){
      let currentState = this.state;
      if(currentState.isSubmitted && this.props.status == 'POSTING_QUESTION'){
        return (<span><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Posting</span>);
      }else{
        return (<span>Post</span>);
      }
    },

    displayMainMessage(){
      if(this.props.status){
        if(this.props.status == 'POSTED_QUESTION'){
          return (
            <div className="alert alert-success" style={{marginTop:'20px'}}>
              Your Question has been posted.
            </div>
          );
        }else if(this.props.status == 'ERROR_ON_POST'){
          return (
            <div className="alert alert-danger" style={{marginTop:'20px'}}>
              <strong>Error</strong>, please consult admin for info.
            </div>
          );
        }
      }
    },

    render: function(){
        return (
          <div className='container'>
            <ul className="nav nav-tabs">
                    <li className="active"><a href="#/home">Post Question</a></li>
                    {/* <li><a href="#/home">Your Questions</a></li> */}
            </ul>
          <div className='container' style={{backgroundColor:'white',height:'100%'}}>
            {this.displayMainMessage()}
            <div className={this.getInputStyles('title')} style={{marginTop:'20px'}}>
              <input type="text" className="form-control" id="usr" ref="title" placeholder='Title'/>
            </div>
            <div className={this.getInputStyles('question')}>
              <textarea style={{resize:'None'}} className="form-control" rows="20" id="question" ref='question' placeholder='Question'></textarea>
            </div>
            <button type="submit" style={{marginBottom:'10px'}} onClick={this.onFormSubmit} className="btn btn-info">{this.displayLoadingButton()}</button>
          </div>
          </div>
        )
    }
});

module.exports = connect(state=>{
  return {
    status: state.postQuestionState.status,
    message: state.postQuestionState.message
  };
})(PostQuestion);