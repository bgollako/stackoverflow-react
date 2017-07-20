let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let actions = require('actions');
let api = require('api');
let {Panel,Form,FormGroup,ControlLabel,FormControl,Button,InputGroup,Glyphicon} = require('react-bootstrap');

let Answers = React.createClass({
    getFormattedText(text){
        let temp = text.replace(/\n/g,'<br/>');
        let temp2 = temp.replace(' ','&nbsp');
        return temp2;
    },

     showAnswer(answers){
        let array =[];
        if(answers){
            if(answers.length>0){
                for(let i=0;i<answers.length;i++){
                    let answer = answers[i];
                    array.push(
                        <div key={answer._id}>
                            <div className="media" style={{marginLeft:'10%',marginTop:'10px',backgroundColor:'white',padding:'10px',borderStyle:'solid',borderWidth:'0.5px',borderColor:'#eee',borderRadius:'5px'}}>
                                <div className="media-body">
                                    {/* <p>{answer.description}</p> */}
                                    <p dangerouslySetInnerHTML={{__html:this.getFormattedText(answer.description)}}></p>
                                    <small><i>Posted by <a style={{cursor:'pointer'}}>{answer.user.name}</a>, {answer.answered}</i></small>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }
        return array;
    },

    showAnswers(){
        if(this.props.status == 'BEGIN_POST_ANSWER'){
            return (
                <img src='images/loading3.gif' style={{marginLeft:'37%',marginTop:'15%',marginBottom:'30%'}}/>
            );
        }else if(this.props.status == 'COMPLETE_POST_ANSWER'){
            return (
                // <div className="well" style={{marginLeft:'15%',backgroundColor:'#f2f5f9'}}><h4 className="media-heading">Answers</h4>
                    // <hr/>
                <div>
                    {this.showAnswer(this.props.question[0].answers)}
                </div>
            );
        }else if(this.props.status == 'ERROR_POST_ANSWER'){

        } else if(this.props.value && this.props.value.length >0){
            return(
                // <div className="well" style={{marginLeft:'15%',backgroundColor:'#f2f5f9'}}><h4 className="media-heading">Answers</h4>
                    // <hr/>
                <div>
                    {this.showAnswer(this.props.value)}
                </div>
            );
        }
    },

    render(){
        return (
            <div>
                {this.showAnswers()}
            </div>
        );
    }
});



module.exports = connect(state=>{
    return {
        status: state.getPostAnswerState.status,
        message: state.getPostAnswerState.message,
        question: (state.getPostAnswerState.question)?state.getPostAnswerState.question.map(t=>t):[]
    };
})(Answers);