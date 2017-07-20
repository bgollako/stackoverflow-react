let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let {userLoggedIn} = require('actions');
let api = require('api');
let {beginQuestionsRefresh,endQuestionsRefresh} = require('actions');
let BasicQuestion = require('BasicQuestion');
let RecentQuestions = require('RecentQuestions');
let SearchQuestions = require('SearchQuestions');
let actions = require('actions');

let QuestionsArea = React.createClass({

    getInitialState(){
        return {
            uri:'',
            dispatch:''
        };
    },

    getDummyState(){
        return {
            uri:'',
            dispatch:''
        };
    },

    showRecentQuestions(e){
        // e.preventDefault();
        // this.context.router.push('#/')
    },

    showSearchResults(e){
        // e.preventDefault();
        // this.context.router.push(this.state.uri);
    },
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.refreshStatus != nextProps.refreshStatus || this.props.searchStatus != nextProps.searchStatus){
            return true;
        }else{
            return false;
        }
    },

    showSearchResults(){
        if(this.state.uri.length != 0){
            return(
                <li><a href={this.state.uri} onClick={this.showSearchResults}>Search Results</a></li>
            );
        }
    },

    showUI(){
        let prev = this.state.dispatch;
        let uri = this.props.searchUri?this.props.searchUri:'';
        if(this.props.searchStatus == 'BEGIN_SEARCH_QUESTION'){
            let state = this.getDummyState();
            state.uri = uri;
            state.dispatch = this.props.searchStatus;
            this.setState(state);
            return(
                    <div>
                        <ul className="nav nav-tabs">
                            <li><a href='#/' onClick={this.showRecentQuestions}>Recent Questions</a></li>
                            <li className='active'><a href={uri} onClick={this.showSearchResults}>Search Results</a></li>
                        </ul>
                        <SearchQuestions />
                    </div>
                );
        }else if(this.props.searchStatus == 'COMPLETE_SEARCH_QUESTION' || this.props.searchStatus == 'ERROR_ON_SEARCH_QUESTION'){
            // this.setStatus('prev_dispatch',this.props.searchStatus);
            let state = this.getDummyState();
            state.dispatch = this.props.searchStatus;
            state.uri = this.state.uri;
            this.setState(state);
            if(prev == 'BEGIN_SEARCH_QUESTION'){
                return(
                    <div>
                        <ul className="nav nav-tabs">
                            <li><a href='#/' onClick={this.showRecentQuestions}>Recent Questions</a></li>
                            <li className='active'><a href={uri} onClick={this.showSearchResults}>Search Results</a></li>
                        </ul>
                        <SearchQuestions />
                    </div>
                );
            }
        }else if(this.props.refreshStatus == 'BEGIN_REFRESH'){
            let state = this.getDummyState();
            state.dispatch = this.props.refreshStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            return (
                <div>
                    <ul className="nav nav-tabs">
                        <li className='active'><a href='#/' onClick={this.showRecentQuestions}>Recent Questions</a></li>
                        {this.showSearchResults()}
                    </ul>
                    <RecentQuestions />
                </div>
            );
        }else if(this.props.refreshStatus == 'END_REFRESH' || this.props.refreshStatus == 'ERROR_REFRESH'){
            let state = this.getDummyState();
            state.dispatch = this.props.refreshStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            return (
                <div>
                    <ul className="nav nav-tabs">
                        <li className='active'><a href='#/' onClick={this.showRecentQuestions}>Recent Questions</a></li>
                        {this.showSearchResults()}
                    </ul>
                    <RecentQuestions />
                </div>
            );
        }
    },

    render(){
        return(
            <div className='container'>
                {this.showUI()}
            </div>
        );
    }
});


QuestionsArea.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect(state=>{
    return {
        searchStatus: state.getSearchQuestionState.status,
        refreshStatus: state.questionsState.status
    };
})(QuestionsArea);

// module.exports = connect()(QuestionsArea);
