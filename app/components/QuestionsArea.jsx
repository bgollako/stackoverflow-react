let React = require('react');
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
let {userLoggedIn} = require('actions');
let api = require('api');
let {beginQuestionsRefresh,endQuestionsRefresh} = require('actions');
let BasicQuestion = require('BasicQuestion');
let RecentQuestions = require('RecentQuestions');
let SearchQuestions = require('SearchQuestions');
let NewestQuestions = require('NewestQuestions');
let YourQuestions = require('YourQuestions');
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
        if(this.props.refreshStatus != nextProps.refreshStatus || this.props.searchStatus != nextProps.searchStatus || 
            this.props.latestQuestionsStatus != nextProps.latestQuestionsStatus){
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
        console.log(this.props);
        let userDetails = api.getUserFromLocalStorage();
        let prev = this.state.dispatch;
        let uri = this.props.searchUri?this.props.searchUri:'';
        if(this.props.searchStatus == 'BEGIN_SEARCH_QUESTION'){
            console.log('1');
            let state = this.getDummyState();
            state.uri = uri;
            state.dispatch = this.props.searchStatus;
            this.setState(state);
            return(
                    <div>
                        <ul className="nav nav-tabs" style={{marginTop:'10%'}}>
                            <li><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                            <li><a href='#/questions/newest'>Latest Questions</a></li>
                            {this.displayUserQuestions(userDetails,false)}
                            <li className='active'><a href={uri} onClick={this.showSearchResults}>Search Results</a></li>
                        </ul>
                        <SearchQuestions />
                    </div>
                );
        }else if(this.props.searchStatus == 'COMPLETE_SEARCH_QUESTION' || this.props.searchStatus == 'ERROR_ON_SEARCH_QUESTION'){
            console.log('2');
            // this.setStatus('prev_dispatch',this.props.searchStatus);
            let state = this.getDummyState();
            state.dispatch = this.props.searchStatus;
            state.uri = this.state.uri;
            this.setState(state);
            if(prev == 'BEGIN_SEARCH_QUESTION'){
                return(
                    <div>
                        <ul className="nav nav-tabs" style={{marginTop:'10%'}}>
                            <li><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                            <li><a href='#/questions/newest'>Latest Questions</a></li>
                            {this.displayUserQuestions(userDetails,false)}
                            <li className='active'><a href={uri} onClick={this.showSearchResults}>Search Results</a></li>
                        </ul>
                        <SearchQuestions />
                    </div>
                );
            }
        }else if(this.props.refreshStatus == 'BEGIN_REFRESH'){
            console.log('3');
            let state = this.getDummyState();
            state.dispatch = this.props.refreshStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            return (
                <div>
                    <ul className="nav nav-tabs" style={{marginTop:'10%'}}>
                        <li className='active'><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                        <li><a href='#/questions/newest'>Latest Questions</a></li>
                        {this.displayUserQuestions(userDetails,false)}
                        {this.showSearchResults()}
                    </ul>
                    <RecentQuestions />
                </div>
            );
        }else if(this.props.refreshStatus == 'END_REFRESH' || this.props.refreshStatus == 'ERROR_REFRESH'){
            console.log('4');
            let state = this.getDummyState();
            state.dispatch = this.props.refreshStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            if(prev == 'BEGIN_REFRESH'){
                return (
                    <div style={{marginTop:'10%'}}>
                        <ul className="nav nav-tabs">
                            <li className='active'><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                            <li><a href='#/questions/newest'>Latest Questions</a></li>
                            {this.displayUserQuestions(userDetails,false)}
                            {this.showSearchResults()}
                        </ul>
                        <RecentQuestions />
                    </div>
                );
            }
        }else if(this.props.latestQuestionsStatus == 'BEGIN_GET_LATEST_QUESTIONS'){
            console.log('5');
            let state = this.getDummyState();
            state.dispatch = this.props.latestQuestionsStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            return (
                <div>
                    <ul className="nav nav-tabs" style={{marginTop:'10%'}}>
                        <li><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                        <li className='active'><a href='#/questions/newest'>Latest Questions</a></li>
                        {this.displayUserQuestions(userDetails,false)}
                        {this.showSearchResults()}
                    </ul>
                    <NewestQuestions />
                </div>
            );
        }else if(this.props.latestQuestionsStatus == 'COMPLETE_GET_LATEST_QUESTIONS' || this.props.latestQuestionsStatus == 'ERROR_ON_GET_LATEST_QUESTIONS'){
            console.log('6');
            let state = this.getDummyState();
            state.dispatch = this.props.latestQuestionsStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            if(prev == 'BEGIN_GET_LATEST_QUESTIONS'){
                return (
                    <div style={{marginTop:'10%'}}>
                        <ul className="nav nav-tabs">
                            <li><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                            <li className='active'><a href='#/questions/newest'>Latest Questions</a></li>
                            {this.displayUserQuestions(userDetails,false)}
                            {this.showSearchResults()}
                        </ul>
                        <NewestQuestions />
                    </div>
                );
            }
        }else if(this.props.userQuestionsStatus == 'BEGIN_GET_USER_QUESTIONS'){
            console.log('7');
            let state = this.getDummyState();
            state.dispatch = this.props.userQuestionsStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            return (
                <div>
                    <ul className="nav nav-tabs" style={{marginTop:'10%'}}>
                        <li><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                        <li><a href='#/questions/newest'>Latest Questions</a></li>
                        {this.displayUserQuestions(userDetails,true)}
                        {this.showSearchResults()}
                    </ul>
                    <YourQuestions />
                </div>
            );
        }else if(this.props.userQuestionsStatus == 'COMPLETE_GET_USER_QUESTIONS' || this.props.userQuestionsStatus == 'ERROR_ON_GET_USER_QUESTIONS'){
            console.log('8');
            let state = this.getDummyState();
            state.dispatch = this.props.userQuestionsStatus;
            state.uri = this.state.uri;
            this.setState(state);
            uri = this.state.uri;
            if(prev == 'BEGIN_GET_USER_QUESTIONS'){
                return (
                    <div style={{marginTop:'10%'}}>
                        <ul className="nav nav-tabs">
                            <li><a href='#/' onClick={this.showRecentQuestions}>Questions</a></li>
                            <li><a href='#/questions/newest'>Latest Questions</a></li>
                            {this.displayUserQuestions(userDetails,true)}
                            {this.showSearchResults()}
                        </ul>
                        <YourQuestions />
                    </div>
                );
            }
        }
    },

    displayUserQuestions(userDetails, isActive){
        if(userDetails){
            if(userDetails.user && userDetails.user.length >0){
                if(isActive){
                    return (
                        <li className='active'><a href='#/questions/me'>Your Questions</a></li>
                    );
                }else{
                    return (
                        <li><a href='#/questions/me'>Your Questions</a></li>
                    );
                }
            }
        }
    },

    render(){
        return(
            <div className='container' style={{paddingLeft:'0px',fontFamily:'Open Sans'}}>
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
        refreshStatus: state.questionsState.status,
        latestQuestionsStatus:state.getLatestQuestionsState.status,
        userQuestionsStatus:state.getUserQuestionsState.status
    };
})(QuestionsArea);

// module.exports = connect()(QuestionsArea);
