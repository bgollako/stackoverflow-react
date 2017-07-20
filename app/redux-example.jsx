let actions = require('./actions/index');
let store = require('./store/configureFile').configure();

let currentState = store.getState();
console.log(currentState);

var unsubscribe = store.subscribe(()=>{
    let state = store.getState();
    console.log('Modified state ' + state);
});


let logCurrentState = ()=>{ console.log("Current State " + JSON.stringify(store.getState())) };



store.dispatch(actions.modifySearchText('Sai Baba'));
logCurrentState()

store.dispatch(actions.addTodo(1,'Do HomeWork'));
logCurrentState()

store.dispatch(actions.removeTodo(1));
logCurrentState()



