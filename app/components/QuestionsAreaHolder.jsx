let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let {userLoggedIn} = require('actions');
let api = require('api');
let {beginQuestionsRefresh,endQuestionsRefresh} = require('actions');
let BasicQuestion = require('BasicQuestion');
let RecentQuestions = require('RecentQuestions');
let actions = require('actions');
let QuestionsArea = require('QuestionsArea');

let QuestionsAreaHolder = React.createClass({

    handleRefreshQuestions(e){
        // this.props.dispatch(actions.getAllQuestions());
        this.context.router.push('#/')
    },

    handleSearchQuestion(e){
        if(this.props.location.query.query && this.props.location.query.query.trim().length > 0){
                // this.props.dispatch(actions.searchQuestionDetailsApi(this.props.location.query.query.trim()));
                this.context.router.push('#/questions'+this.props.location.search);
        }
    },

    render(){
        let searchUri = '';
        if(this.props.location.query.query){
            if(this.props.location.query.query.trim().length > 0){
                searchUri = '#/questions' + this.props.location.search;
                this.props.dispatch(actions.searchQuestionDetailsApi(this.props.location.query.query.trim()));
            }else{
                this.props.dispatch(actions.getAllQuestions());
            }
        }else{
            this.props.dispatch(actions.getAllQuestions());
        }
        return(
            <QuestionsArea searchUri={searchUri} onSelectRefreshQuestions={this.handleRefreshQuestions} onSelectSearchQuestions={this.handleSearchQuestion}/>
        );
    }
});

QuestionsAreaHolder.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect()(QuestionsAreaHolder);
