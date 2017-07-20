var React=require('react');
var ReactDOM=require('react-dom');
var Greet = require('Greeter');


let name = 'Squirtle';
let message = "Squirtle's nested components";
ReactDOM.render(
    <Greet name={name} message={message}/>,
    document.getElementById('app')
);
