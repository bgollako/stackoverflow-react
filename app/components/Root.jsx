let React = require('react');
let Nav = require('Nav');
let {connect,Provider} = require('react-redux');
let {Route, Router, IndexRoute, hashHistory} = require('react-router');
let Main = require('Main');
let Login = require('Login');
let Signup = require('Signup');
let PostQuestion = require('PostQuestion');
let QuestionDetailsHolder = require('QuestionDetailsHolder');
let ChatRoomHolder = require('ChatRoomHolder');
let actions = require('actions');
let api = require('api');
let QuestionsAreaHolder = require('QuestionsAreaHolder');


let Root = React.createClass({

    handleLoginSubmit: function(username,password){
        this.props.dispatch(actions.userLogInApi(username,password));
        //transition to new /
    },

    render:function(){
        return (
            // <Provider store={store}>
                <Router history={hashHistory}>
                    {/* <Route path='/' components={()=><Main isLoggedIn={isLoggedIn()} />}> */}
                    <Route path='/' component={Main}>
                        <IndexRoute component={QuestionsAreaHolder} /> 
                        <Route path='login' component={()=><Login onLoginSubmit={this.handleLoginSubmit}/>} />
                        <Route path='signup' component={()=><Signup/>} />
                        <Route path='postquestion' component={()=><PostQuestion/>} />
                        <Route path='questions/:id' component={QuestionDetailsHolder} />
                        <Route path='questions' component={QuestionsAreaHolder} />
                        <Route path='chatroom' component={ChatRoomHolder} />
                    </Route>
                </Router>
    // </Provider>
        );
    }
});

// Root.contextTypes = {
//   router: React.PropTypes.object.isRequired
// }

module.exports =connect()(Root);