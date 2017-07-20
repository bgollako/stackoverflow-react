let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let actions = require('actions');
let QuestionDetails = require('QuestionDetails');
let {Panel,Form,FormGroup,ControlLabel,FormControl,Button,InputGroup,Glyphicon} = require('react-bootstrap');


let QuestionDetailsHolder = React.createClass({

    handlePostAnswer(answer){
        this.props.dispatch(actions.postAnswerApi(this.props.params.id,answer));
    },

    render(){
        this.props.dispatch(actions.getQuestionDetailsApi(this.props.params.id));
        return(
            <div className='container'>
                <ul className="nav nav-tabs">
                    <li className="active"><a href={'#/questions/'+this.props.params.id}><Glyphicon glyph="question-sign"/> Question</a></li>
                    {/* <li><a href="#/home">Your Questions</a></li> */}
                </ul>
                <QuestionDetails onPostAnswer={this.handlePostAnswer}/>
            </div>
        );
    }
});

QuestionDetailsHolder.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect()(QuestionDetailsHolder);