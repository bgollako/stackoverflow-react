let axios = require('axios');
let {ORG_API_URL_V1,ORG_API_URL_V2,API_URL_V1,API_URL_V2} = require('constants');
let {Router} = require('react-router');

export let signup = (username, password, name, email, city) => {
    return axios.post(ORG_API_URL_V1 + 'users/'
    ,{
        username,
        name,
        password,
        city,
        email
    });
}

export let login = (username, password) => {
    return axios.post(API_URL_V1 + 'users/login/',{
        username,
        password
    });
}

export let postQuestion = (title,description,authValue) => {
    let header = { headers: { 'Authorization': authValue} }
    return axios.post(API_URL_V1 + 'questions/',{
        title,
        description
    },header);
}

export let postAnswer = (id,answer,authValue) => {
    let header = { headers: { 'Authorization': authValue} };
    return axios.put(API_URL_V1 + 'questions/'+id+'/answer/',{
        description: answer
    },header);
}

export let getAllQuestions = () =>{
    return axios.get(API_URL_V1 + 'questions/');
}

export let getQuestionDetails = (id) =>{
    return axios.get(API_URL_V1 + 'questions/' +id);
}

export let searchQuestion = (title) =>{
    return axios.get(API_URL_V1 + encodeURI('questions/results/?search_query=' + title))
}

export let editQuestion = (id,title,description,authValue) => {
    let header = { headers: { 'Authorization': authValue} };
    return axios.put(API_URL_V1 + 'questions/'+id+'/edit/',{
        title,
        description
    },header);
}

export let getAllActiveUsers = (authValue) => {
    let header = { headers: { 'Authorization': authValue} };
    return axios.get(API_URL_V2 + 'users/chat/',header);
}

export let saveUserToLocalStorage = (username, authValue) =>{
    if(window.localStorage){
        window.localStorage.setItem('stk_user',username);
        window.localStorage.setItem('stk_auth_value',authValue);
    }
}

export let clearUserFromLocalStorage = () => {
    if(window.localStorage){
        window.localStorage.removeItem('stk_user');
        window.localStorage.removeItem('stk_auth_value');
    }
}

export let getUserFromLocalStorage = () => {
    if(window.localStorage){
        return {
            user: window.localStorage.getItem('stk_user'),
            authValue: window.localStorage.getItem('stk_auth_value')
        };
    }
}
