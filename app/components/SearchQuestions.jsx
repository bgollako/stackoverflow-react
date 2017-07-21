let React = require('react');
let ReactDOM = require('react-dom');
let BasicQuestion = require('BasicQuestion');
let {connect} = require('react-redux');
// let loadGif = require('loadGif');
let SearchQuestions = React.createClass({
    
    renderQuestions(){
        let questionsArray=[];
        if(this.props.questions){
            for(let i=0;i<this.props.questions.length;i++){
                questionsArray.push(
                    <BasicQuestion asked={this.props.questions[i].asked} id={this.props.questions[i]._id} key={this.props.questions[i]._id} title={this.props.questions[i].title} description={this.props.questions[i].description}
                    user={this.props.questions[i].user.name} answerCount={4} voteCount={this.props.questions[i].vote?this.props.questions[i].vote.length:0}/>
                );
            }
        }
        if(questionsArray.length!=0)
            return questionsArray;
        else{
            return (
                <div className="alert alert-info" style={{marginTop:'10px'}}>
                    No Questions found with the given search criteria.
                </div>
            );
        }
    },

    displayUi(){
        if(this.props.status){
            if(this.props.status == 'BEGIN_SEARCH_QUESTION'){
                return (
                    <img src='images/loading3.gif' style={{marginLeft:'37%',marginTop:'15%',marginBottom:'30%'}}/>
                );
            }else if(this.props.status == 'COMPLETE_SEARCH_QUESTION'){
                return this.renderQuestions();
            }else if(this.props.status == 'ERROR_ON_SEARCH_QUESTION'){
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
            //  style={{backgroundColor:'white',height:'100%'}}
            <div className='container' style={{paddingLeft:'0px'}}>
                 {this.displayUi()} 
            </div>
        );
    }
});

module.exports = connect(state=>{
    return {
        status: state.getSearchQuestionState.status,
        questions: state.getSearchQuestionState.questions
    };
})(SearchQuestions);

// module.exports = connect()(SearchQuestions);