let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let actions = require('actions');
let api = require('api');
let {Panel,Form,FormGroup,ControlLabel,FormControl,Button,InputGroup,Glyphicon} = require('react-bootstrap');
let Answers = require('Answers');

let QuestionDetails = React.createClass({

    getInitialState(){
        return {
            showQuestionEditForm:false,
            hasEditQuestionTitleError:false,
            hasEditQuestionDescriptionError:false,
            showAnswerBox:false,
            hasPostError:false,
            question:[]
        };
    },

    getDummyState(){
        return {
            showQuestionEditForm:false,
            hasEditQuestionTitleError:false,
            hasEditQuestionDescriptionError:false,
            showAnswerBox:false,
            hasPostError:false,
            question:[]
        };
    },

    toggleAnswerBox(e){
        e.preventDefault();
        if(!this.state.showAnswerBox){
            let state = this.getDummyState();
            state.showAnswerBox = true;
            state.showQuestionEditForm = false;
            state.hasEditQuestionTitleError=false;
            state.hasEditQuestionDescriptionError=false;
            if(this.props.status == '')
                state.question = this.state.question.map(t=>t); 
            else
                state.question = this.props.question.map(t=>t);
            this.setState(state);
        }
    },

   
    
    getInputStyles(item){
        if(this.state.hasPostError){
            return 'form-group has-error';
        }else
            return 'form-group';
    },

    

    shouldComponentUpdate(nextProps, nextState){
        return true;
    },

    onCancel(e){
        e.preventDefault();
        let state = this.getDummyState();
        if(this.props.status == '')
            state.question = this.state.question.map(t=>t); 
        else
            state.question = this.props.question.map(t=>t);
        state.showAnswerBox = false;
        state.hasPostError = false;
        state.hasEditQuestionTitleError=false;
        state.hasEditQuestionDescriptionError=false;
        this.setState(state);
    },

    showAnsweringBox(){
        if(this.state.showAnswerBox){
            return (
                <div style={{marginTop:'20px',borderWidth:'1px'}} className={this.getInputStyles('answer')}>
                    <textarea style={{resize:'None'}} className="form-control" rows="10" id="question" ref='answer' placeholder='Answer'></textarea>
                    <button onClick={this.onPost}style={{marginTop:'10px'}} className='btn btn-info'>Post</button>
                    <button onClick={this.onCancel} style={{marginTop:'10px',marginLeft:'10px'}} className='btn btn-info'>Cancel</button>
                </div>
            );
        }
    },

    displayAnswerButton(){
        let userDetails = api.getUserFromLocalStorage();
        if(userDetails && userDetails.user && userDetails.user.length >0){
            return (
                <span style={{float:'right'}} className="btn-group btn-group-sm">
                    {/* <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-thumbs-up"></span></button> */}
                    {this.displayEditQuestionButton()}
                    <button type="button" onClick={this.toggleAnswerBox} className="btn btn-default"><span className="glyphicon glyphicon-comment"></span></button>
                </span>
                    // <button onClick={this.toggleAnswerBox} style={{float:'right'}} type="button" className="btn btn-link btn-md"><Glyphicon glyph="comment"/></button>
                    // <button onClick={this.toggleAnswerBox} style={{float:'right'}} type="button" className="btn btn-link btn-md"><Glyphicon glyph="edit"/></button>
            );
        }
    },

    displayEditQuestionButton(){
        let user_id = '';
        if(this.props.status == '')
            user_id = this.state.question[0].user.username;
        else
            user_id = this.props.question[0].user.username;
        let userDetails = api.getUserFromLocalStorage();
        if(userDetails && userDetails.user && userDetails.user.length >0 && userDetails.user == user_id){
            return (
                <button type="button" onClick={this.toggleEditUserForm} className="btn btn-default"><span className="glyphicon glyphicon-edit"></span></button>
            );
        }
    },

    toggleEditUserForm(e){
        e.preventDefault();
        if(!this.state.showQuestionEditForm){
            let state = this.getDummyState();
            state.showAnswerBox = false;
            state.showQuestionEditForm = true;
            state.hasEditQuestionTitleError=false;
            state.hasEditQuestionDescriptionError=false;
            if(this.props.status == '')
                state.question = this.state.question.map(t=>t); 
            else
                state.question = this.props.question.map(t=>t);
            this.setState(state);
        }
    },

  

    displayLoadingButton(){
    //   let currentState = this.state;
    //   if(currentState.isSubmitted && this.props.status == 'POSTING_QUESTION'){
    //     return (<span><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Posting</span>);
    //   }else{
    //     return (<span>Post</span>);
    //   }
        return (<span>Edit</span>);
    },

    getCurrentQuestion(){
        let question = undefined;
        if(this.props.status == '')
            question = this.state.question[0];
        else
            question = this.props.question[0];
        return question;
    },

    onCancelEditQuestionForm(e){
        e.preventDefault();
        let state = this.getDummyState();
        if(this.props.status == '')
            state.question = this.state.question.map(t=>t); 
        else
            state.question = this.props.question.map(t=>t);
        state.showAnswerBox = false;
        state.hasPostError = false;
        state.hasEditQuestionTitleError=false;
        state.hasEditQuestionDescriptionError=false;
        if(this.props.status == '')
            state.question = this.state.question.map(t=>t); 
        else
            state.question = this.props.question.map(t=>t);
        this.setState(state);
    },

    onPost(e){
        e.preventDefault();
        let answer = this.refs.answer.value.trim();
        if(answer.length == 0){
            let state = this.getDummyState();
            state.showQuestionEditForm = this.state.showQuestionEditForm;
            state.showAnswerBox = this.state.showAnswerBox;
            state.question = this.state.question.map(t=>t);
            state.hasPostError = true;
            state.hasEditQuestionTitleError=false;
            state.hasEditQuestionDescriptionError=false;
            this.setState(state);
            return;
        }else{
            let questionId = '';
            let state = this.getDummyState();
            if(this.props.status == '')
                state.question = this.state.question.map(t=>t); 
            else
                state.question = this.props.question.map(t=>t);
            state.showAnswerBox = false;
            state.hasPostError = false;
            state.hasEditQuestionTitleError=false;
            state.hasEditQuestionDescriptionError=false;
            this.setState(state);
            // this.props.onPostAnswer(answer);
            if(this.props.status == '')
                questionId = this.state.question[0]._id;
            else
                questionId = this.props.question[0]._id;
            this.props.dispatch(actions.postAnswerApi(questionId,answer));
        }
    },

    onFormEditQuestion(e){
        e.preventDefault();
        let questionId = '';
        let state = this.getDummyState();
        let editTitle = this.refs.editTitle.value.trim();
        let editDescription = this.refs.editQuestion.value.trim();
        if(this.props.status == '')
            state.question = this.state.question.map(t=>t); 
        else
            state.question = this.props.question.map(t=>t);
        if(editTitle.length == 0){
            state.hasEditQuestionTitleError = true;
            state.showQuestionEditForm = true;
        }
        if(editDescription.length == 0){
            state.hasEditQuestionDescriptionError = true;
            state.showQuestionEditForm = true;
        }
        if(state.hasEditQuestionTitleError || state.hasEditQuestionDescriptionError){
            this.setState(state);
            return;
        }else{
            state.showQuestionEditForm = true;
            this.setState(state);
            if(this.props.status == '')
                questionId = this.state.question[0]._id;
            else
                questionId = this.props.question[0]._id;
            this.props.dispatch(actions.editQuestionApi(questionId,editTitle,editDescription));
        }
    },

    getInputStylesForEditQuestion(refId){
        let currentState = this.state;
        if(refId == 'editTitle'){
            if(currentState.hasEditQuestionTitleError){
                return 'form-group has-error';
            }else{
                return 'form-group';
            }
        }else if(refId == 'editQuestion'){
            if(currentState.hasEditQuestionDescriptionError){
                return 'form-group has-error';
            }else{
                return 'form-group';
            }
        }
    },

    showQuestion(question){
        if(this.state.showQuestionEditForm){
            return(
                <div className='container' style={{backgroundColor:'white',height:'100%'}}>
                    {/* {this.displayMainMessage()} */}
                    <div className={this.getInputStylesForEditQuestion('editTitle')} style={{marginTop:'20px'}}>
                        <input type="text" className="form-control" id="usr" ref="editTitle" placeholder='Title' defaultValue={this.getCurrentQuestion().title}/>
                    </div>
                    <div className={this.getInputStylesForEditQuestion('editQuestion')}>
                        <textarea style={{resize:'None'}} className="form-control" rows="10" id="question" defaultValue={this.getCurrentQuestion().description} ref='editQuestion' placeholder='Question'></textarea>
                    </div>
                    <button type="submit" style={{marginBottom:'10px'}} onClick={this.onFormEditQuestion} className="btn btn-info">{this.displayLoadingButton()}</button>
                    <button type="Cancel" style={{marginLeft:'10px',marginBottom:'10px'}} onClick={this.onCancelEditQuestionForm} className="btn btn-info">Cancel</button>
                </div>
            );
        }else{
            return(
                <div>
                    <div className="media" style={{marginTop:'20px'}}>
                        <div className="media-body">
                            <div className="media-heading" style={{fontSize:'20px'}}><strong>{question.title}</strong>
                                {this.displayAnswerButton()}
                            </div><br/>
                            <p>{question.description}</p>
                            <small><i>Posted by <a style={{cursor:'pointer'}}>{question.user.name}</a>, {question.asked}</i></small>
                        </div>
                    </div>
                    {this.showAnsweringBox()}
                    {/* <div style={{textAlign:'right',marginRight:'5px'}}>
                        <i><strong><a style={{cursor:'pointer'}}>Edit Question</a></strong></i>
                    </div> */}

                    <hr/>
                </div>
            );
        }
    },

    render(){
        if(this.props.status == 'COMPLETE_GET_QUESTION_DETAILS'){
            if(this.props.question.length > 0){
                return(
                    <div className='container' style={{backgroundColor:'white',height:'100%'}}>
                        {this.showQuestion(this.props.question[0])}
                        <Answers value={this.props.question[0].answers}/>
                    </div>
            );
            }else{
                return(
                    <div className ='container'>
                        <div className="alert alert-danger" style={{marginTop:'20px'}}>
                            <strong>Question details not found</strong>
                        </div>
                    </div>
                );
            }
            
        }else if(this.props.status == 'ERROR_ON_GET_QUESTION_DETAILS'){
            return(
                <div className ='container'>
                    <div className="alert alert-danger" style={{marginTop:'20px'}}>
                        <strong>Internal Error, Please check error logs</strong>
                    </div>
                </div>
            );
        }else if(this.props.status == 'BEGIN_GET_QUESTION_DETAILS'){
            return (
                <img src='images/loading3.gif' style={{marginLeft:'37%',marginTop:'15%',marginBottom:'30%'}}/>
            );
        }else if(this.props.status == ''){
                return(
                    <div className='container' style={{backgroundColor:'white',height:'100%'}}>
                        {this.showQuestion(this.state.question[0])}
                        <Answers value={this.state.question[0].answers}/>
                    </div>
            );
        }
    }
});

module.exports = connect(state=>{
    return {
        status: state.getQuestionDetailsState.status,
        message: state.getQuestionDetailsState.message,
        question: (state.getQuestionDetailsState.question)?state.getQuestionDetailsState.question.map(t=>t):[],
    };
})(QuestionDetails);