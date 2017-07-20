let React = require('react');
let ReactDOM = require('react-dom');
let BasicQuestion = require('BasicQuestion');
let {connect} = require('react-redux');
// let loadGif = require('loadGif');
let YourQuestions = React.createClass({
    
    renderQuestions(){
        let questionsArray=[];
        if(this.props.questions){
            for(let i=0;i<this.props.questions.length;i++){
                questionsArray.push(
                    <BasicQuestion  key={this.props.questions[i]._id} title={this.props.questions[i].title} description={this.props.questions[i].description}
                    user={this.props.questions[i].user.name} answerCount={4} commentCount={this.props.questions[i].comments?this.props.questions[i].comments.length:0}/>
                );
            }
        }
        return questionsArray;
    },

    displayUi(){
        if(this.props.status){
            if(this.props.status == 'BEGIN_REFRESH'){
                return (
                    <img src='images/loading3.gif' style={{marginLeft:'37%',marginTop:'15%',marginBottom:'30%'}}/>
                );
            }else if(this.props.status == 'END_REFRESH'){
                return this.renderQuestions();
            }else if(this.props.status == 'ERROR_REFRESH'){
                return (
                    <div className="alert alert-danger" style={{marginTop:'10px'}}>
                        <strong>Error!</strong> Please check console logs.
                    </div>
                );
            }
        }
    },

    render(){
        return(
            <div className='container' style={{backgroundColor:'white',height:'100%'}}>
                 {this.displayUi()} 
            </div>
        );
    }
});

module.exports = connect(state=>{
    return {
        status: state.questionsState.status,
        questions: state.questionsState.questions
    };
})(YourQuestions);