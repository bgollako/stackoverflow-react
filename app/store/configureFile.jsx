import { createStore, applyMiddleware,combineReducers,compose } from 'redux';
import thunk from 'redux-thunk'
let {getSignUpStateReducers,getActiveUsersStateReducer,getEditAnswerStateReducer,getPostAnswerStateReducer,getSearchQuestionStateReducer,getQuestionDetailsReducer,userStateReducer,questionsRefreshReducer,questionPostReducer} = require('reducers');
    export let configure =() => {
        let reducer = combineReducers({
            userState: userStateReducer,
            questionsState: questionsRefreshReducer,
            postQuestionState:questionPostReducer,
            getQuestionDetailsState:getQuestionDetailsReducer,
            getSearchQuestionState:getSearchQuestionStateReducer,
            getPostAnswerState:getPostAnswerStateReducer,
            getEditAnswerState:getEditAnswerStateReducer,
            getActiveUsersState:getActiveUsersStateReducer,
            getSignUpState:getSignUpStateReducers
        });

        let store = createStore(reducer,{},
            compose(applyMiddleware(thunk))
            );
        return store;
};