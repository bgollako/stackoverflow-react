let React = require('react');
let Nav = require('Nav');
let {connect} = require('react-redux');
let api = require('api');
let actions = require('actions');
let Main = React.createClass({

    

    render:function(){
        return (
            <div>
                <Nav store={this.props.store}/> 
                {this.props.children}
            </div>
        );
    }
});

Main.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect()(Main);