let api = require('api');
export let userLoggingIn = () => {
    return {
        type: 'LOGGING_IN',
        message:''
    };
};

export let userLoggingOut = () =>{
    return {
        type: 'LOGGING_OUT',
        message:''
    };
};

export let userLoggedIn = () => {
    return {
        type: 'LOGGED_IN',
        message:''
    };
};

export let userLoggedOut = (message) => {
    return {
        type: 'LOGGED_OUT',
        message
    };
};

export let beginQuestionsRefresh =() => {
    return {
        type: 'BEGIN_REFRESH'
    };
};

export let endQuestionsRefresh =(questions) => {
    return {
        questions,
        type: 'END_REFRESH'
    };
};

export let errorQuestionsRefresh =() => {
    return {
        type: 'ERROR_REFRESH'
    };
};



export let postingQuestion =() => {
    return {
        message:'',
        type: 'POSTING_QUESTION'
    };
};

export let postedQuestion =() => {
    return {
        message:'',
        type: 'POSTED_QUESTION'
    };
};

export let errorOnPostQuestion =(message) => {
    return {
        type: 'ERROR_ON_POST',
        message:''
    };
};

export let beginGetQuestionDetails = () =>{
    return{
        type: 'BEGIN_GET_QUESTION_DETAILS',
        message:'',
        question:[]
    };
};

export let completeGetQuestionDetails = (question) =>{
    return {
        type: 'COMPLETE_GET_QUESTION_DETAILS',
        message:'',
        question: (question?question.map(q=>q):[])
    };
};

export let errorOnGetQuestionDetails =(message,question) =>{
    return {
        type: 'ERROR_ON_GET_QUESTION_DETAILS',
        message,
        question:[]
    };
};

export let beginSearchQuestion = () =>{
    return {
        type: 'BEGIN_SEARCH_QUESTION',
        message:'',
        questions:[]
    };
};

export let completeSearchQuestion = (questions) =>{
    return {
        type: 'COMPLETE_SEARCH_QUESTION',
        message:'',
        questions: (questions)?questions.map(q=>q):[]
    };
};

export let errorOnSearchQuestion = (message) =>{
    return {
        type: 'ERROR_ON_SEARCH_QUESTION',
        message,
        questions:[]
    };
};

export let beginPostAnswer = () =>{
    return {
        type: 'BEGIN_POST_ANSWER',
        message:'',
        question:[]
    };
};

export let completePostAnswer = (question) =>{
    return {
        type: 'COMPLETE_POST_ANSWER',
        message:'',
        question:question?question.map(t=>t):[]
    };
};

export let errorOnPostAnswer = (message) =>{
    return {
        type: 'ERROR_POST_ANSWER',
        message,
        question:[]
    };
};


export let beginEditQuestion = () =>{
    return {
        type: 'BEGIN_EDIT_QUESTION',
        message:'',
        question:[]
    };
};

export let completeEditQuestion = (question) =>{
    return {
        type: 'COMPLETE_EDIT_QUESTION',
        message:'',
        question:question?question.map(t=>t):[]
    };
};

export let errorOnEditQuestion = (message) =>{
    return {
        type: 'ERROR_ON_EDIT_QUESTION',
        message,
        question:[]
    };
};

export let beginGetActiveUsers = () =>{
    return {
        type: 'BEGIN_GET_ACTIVE_USERS',
        message:'',
        users:[]
    };
};

export let completeGetActiveUsers = (question) =>{
    return {
        type: 'COMPLETE_GET_ACTIVE_USERS',
        message:'',
        users:question?question.map(t=>t):[]
    };
};

export let errorOnGetActiveUsers = (message) =>{
    return {
        type: 'ERROR_ON_GET_ACTIVE_USERS',
        message,
        users:[]
    };
};

export let getAllActiveUserApi = () =>{
    return dispatch =>{
        dispatch(beginGetActiveUsers());
        let userDetails = api.getUserFromLocalStorage();
        let authValue = userDetails?userDetails.authValue:'';
        api.getAllActiveUsers(authValue).then(res=>{
            dispatch(completeGetActiveUsers(res.data));
        }).catch(err=>{
            console.log(err);
            if(err.response.status == 403){
                dispatch(errorOnGetActiveUsers('Unauthorized'));
            }else{
                dispatch(errorOnGetActiveUsers('Internal Error'));
            }
        });
    };
};


export function editQuestionApi(id,title,description){
    return dispatch =>{
        dispatch(beginEditQuestion());
        let userDetails = api.getUserFromLocalStorage();
        let authValue = userDetails?userDetails.authValue:'';
        api.editQuestion(id,title,description,authValue).then(res=>{
            dispatch(getQuestionDetailsApi(id));
        }).catch(err=>{
            console.log(err);
            if(err.response.status == 403){
                dispatch(errorOnEditQuestion('Unauthorized'));
            }else{
                dispatch(errorOnEditQuestion('Internal Error'));
            }
        });
    };
}

export function postAnswerApi(id,answer){
    return dispatch =>{
        dispatch(beginPostAnswer());
        let userDetails = api.getUserFromLocalStorage();
        let authValue = userDetails?userDetails.authValue:'';
        api.postAnswer(id,answer,authValue).then(res=>{
            api.getQuestionDetails(id).then(response=>{
                return dispatch(completePostAnswer(response.data));
            }).catch(error=>{
                console.error(error);
                return dispatch(errorOnPostAnswer('Internal Error'));
        });
        }).catch(err=>{
            console.log(err);
            if(err.response.status == 403){
                dispatch(errorOnPostAnswer('Unauthorized'));
            }else{
                dispatch(errorOnPostAnswer('Internal Error'));
            }
        });
    };
}

export function postQuestionApi(title,question,authValue){
    return dispatch =>{
        dispatch(postingQuestion());
        let userDetails = api.getUserFromLocalStorage();
        let authValue = userDetails?userDetails.authValue:'';
        api.postQuestion(title,question,authValue).then(res=>{
            if(res.status == 200){
                return dispatch(postedQuestion());
            }
        }).catch(err=>{
            console.log(err);
            if(err.response.status == 403){
                dispatch(errorOnPostQuestion('Unauthorized'));
            }else{
                dispatch(errorOnPostQuestion('Internal Error'));
            }
        });
    };
};

export function searchQuestionDetailsApi(title){
    return dispatch => {
        dispatch(beginSearchQuestion());
        api.searchQuestion(title).then(res=>{
            if(res.status == 200){
                return dispatch(completeSearchQuestion(res.data));
            }
        }).catch(err=>{
            console.error(log);
            return dispatch(errorOnSearchQuestion('Internal Error'))
        });
    };
}

export function getQuestionDetailsApi(id){
    return dispatch =>{
        dispatch(beginGetQuestionDetails());
        api.getQuestionDetails(id).then(res=>{
            if(res.status == 200){
                return dispatch(completeGetQuestionDetails(res.data));
            }
        }).catch(err=>{
            console.error(err);
            return dispatch(errorOnGetQuestionDetails('Internal Error'));
        });
    };
}

export let beginSignUp = () =>{
    return {
        type: 'BEGIN_SIGN_UP',
        message:''
    };
};

export let completeSignUp =() =>{
    return {
        type: 'COMPLETE_SIGN_UP',
        message:''
    };
};

export let errorOnSignUp =(message) =>{
    return {
        type: 'ERROR_ON_SIGN_UP',
        message
    };
};

export function signUpApi(name,email,username,password,city){
    return dispatch =>{
        dispatch(beginSignUp());
        api.signup(username, password,name,email,city).then(res=>{
            return dispatch(completeSignUp());
        }).catch(err=>{
            console.log(err);
            return dispatch(errorOnSignUp('Internal Error'));
        });
    };
};

export  function userLogInApi(username, password){
    return dispatch =>{
        api.login(username, password).then(res=>{
            if(res.status == 200){
                api.saveUserToLocalStorage(username,res.headers.authorization);
                return dispatch(userLoggedIn());
            }
        }).catch(err=>{
            console.log(err);
            if(err.response.status == 403){
                return dispatch(userLoggedOut('Invalid username/password'));
            }else{
                return dispatch(userLoggedOut('Internal Error'));
            }
        });
    };
};

export let beginGetLatestQuestions = () =>{
    return {
        type: 'BEGIN_GET_LATEST_QUESTIONS',
        message:'',
        questions:[]
    };
};

export let completeGetLatestQuestions =(questions) =>{
    return {
        type: 'COMPLETE_GET_LATEST_QUESTIONS',
        message:'',
        questions
    };
};

export let errorOnGetLatestQuestions =(message) =>{
    return {
        type: 'ERROR_ON_GET_LATEST_QUESTIONS',
        message,
        questions:[]
    };
};

export function getLatestQuestions(){
    return dispatch=>{
        dispatch(beginGetLatestQuestions());
        api.getLatestQuestions().then(res=>{
            if(res.status == 200){
                return dispatch(completeGetLatestQuestions(res.data));
            }            
        }).catch(err=>{
            console.log(err);
            return dispatch(errorOnGetLatestQuestions());
        });
    };
};

export let beginGetUserQuestions = () =>{
    return {
        type: 'BEGIN_GET_USER_QUESTIONS',
        message:'',
        questions:[]
    };
};

export let completeGetUserQuestions =(questions) =>{
    return {
        type: 'COMPLETE_GET_USER_QUESTIONS',
        message:'',
        questions
    };
};

export let errorOnGetUserQuestions =(message) =>{
    return {
        type: 'ERROR_ON_GET_USER_QUESTIONS',
        message,
        questions:[]
    };
};

export function getUserQuestionsApi(){
    return dispatch=>{
        dispatch(beginGetUserQuestions());
        let userDetails = api.getUserFromLocalStorage();
        let authValue = userDetails?userDetails.authValue:'';
        api.getUserQuestions(authValue).then(res=>{
            if(res.status == 200){
                return dispatch(completeGetUserQuestions(res.data));
            }            
        }).catch(err=>{
            console.log(err);
            return dispatch(errorOnGetUserQuestions());
        });
    };
};

export function getAllQuestions(){
    return dispatch=>{
        dispatch(beginQuestionsRefresh());
        api.getAllQuestions().then(res=>{
            if(res.status == 200){
                return dispatch(endQuestionsRefresh(res.data));
            }            
        }).catch(err=>{
            console.log(err);
            return dispatch(errorQuestionsRefresh());
        });
    };
};

export let beginVoteUp = () =>{
    return {
        type: 'BEGIN_VOTE_UP',
        message:'',
    };
};

export let completeVoteUp =() =>{
    return {
        type: 'COMPLETE_VOTE_UP',
        message:'',
    };
};

export let errorOnVoteUp =(message) =>{
    return {
        type: 'ERROR_ON_VOTE_UP',
        message,
    };
};

export function voteQuestionApi(id){
    return dispatch=>{
        let userDetails = api.getUserFromLocalStorage();
        let authValue = userDetails?userDetails.authValue:'';
        dispatch(beginVoteUp());
        api.voteUpQuestion(id,authValue).then(res=>{
            return dispatch(completeVoteUp());
        }).catch(err=>{
            console.log(err);
            return dispatch(errorOnVoteUp());
        });
    };
};

export function increment() {
  return {
    type: 'INCREMENT_COUNTER'
  };
}

export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}