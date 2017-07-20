let React = require('react');
let {connect} = require('react-redux');
let {Image,Nav,Navbar, NavItem, NavDropdown, MenuItem,Glyphicon,Button,ControlLabel,FieldGroup,} = require('react-bootstrap');
let {LinkContainer} = require('react-router-bootstrap');
let api = require('api');
let {userLoggedOut,searchQuestionDetailsApi} = require('actions');

let Navigator = React.createClass({

    getInitialState(){
        return {
            toggle:false
        };
    },

    getUserDetailsFromLocalStorage:function(){
        let userDetails = api.getUserFromLocalStorage();
        if(userDetails){
            return userDetails.user;
        }
    },

    handleLogoutSubmit: function(){
        api.clearUserFromLocalStorage();
        this.setState({toggle:!this.state.toggle});
        // this.context.router.push('/');
        this.props.dispatch(userLoggedOut(''));
        setTimeout(()=>{this.context.router.push('#/')},1000)
    },

    showUserButtons: function(){
        let user = this.getUserDetailsFromLocalStorage();
        if(user || this.props.isLoggedIn){
            return (
                <Nav pullRight>
                     <NavDropdown eventKey={4} title={
                         <span><Glyphicon glyph="user"/>Hi, {user}</span>
                     } id="basic-nav-dropdown">
                        <MenuItem eventKey={4.1}><Glyphicon glyph="pencil"/> My Profile</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={4.2} onClick={this.handleLogoutSubmit}><Glyphicon glyph="off"/> Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            );
        }else{
            return (
                <Nav pullRight>
                    <LinkContainer to = '/signup'>
                        <NavItem eventKey={2} href="#"><Glyphicon glyph="user" /> Sign up</NavItem>
                    </LinkContainer>
                    <LinkContainer to = '/login'>
                        <NavItem eventKey={3}><Glyphicon glyph="log-in" /> Login</NavItem>
                    </LinkContainer>
                </Nav>
            );
        }
    },

    showPostQuestion: function(){
        let user = this.getUserDetailsFromLocalStorage();
        if(user || this.props.isLoggedIn){
            return (
                <Nav pullLeft>
                <LinkContainer to = '/postquestion'>
                    <NavItem eventKey={1} href="#"><Glyphicon glyph="question-sign" /> Post Question</NavItem>
                </LinkContainer>
                <LinkContainer to = '/chatroom'>
                    <NavItem eventKey={1} href="#"><Glyphicon glyph="comment" /> Chat Room</NavItem>
                </LinkContainer>
                </Nav>
            );
        }
    },

    onSearchQuestion(e){
        e.preventDefault();
        let searchItem = this.refs.searchItem.value.trim();
        if(searchItem.length == 0)
            return;
        // this.props.dispatch(searchQuestionDetailsApi(searchItem));
        this.context.router.push('questions?query='+searchItem);
    },

    displaySearchButton(){
        if(this.props.searchState){
            if(this.props.searchState == 'BEGIN_SEARCH_QUESTION'){
                return (
                    <button className="btn btn-default" type="submit">
                                <i className="glyphicon glyphicon-refresh"></i>
                    </button>
                );
            }
        }
        return (
            <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search"></i>
            </button>
        );
    },

    render: function(){
        return (
                <Navbar  collapseOnSelect style={{borderRadius:'0%'}}>
                    <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Packet Overflow</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {/*<Nav pullLeft>*/}
                        {this.showPostQuestion()}
                        <form className="navbar-form navbar-left" onSubmit={this.onSearchQuestion}>
                            <div className="form-group">
                                <input type="text" className="form-control" size="60" ref='searchItem' placeholder="Search"/>
                            </div>
                            {this.displaySearchButton()}
                        </form>
                        {this.showUserButtons()}
                    </Navbar.Collapse>
                </Navbar>
        );
    }
});

module.exports = connect((state)=>{
    if(state.userState.status == 'loggedIn'){
        return {
            isLoggedIn: true,
            searchState: state.getSearchQuestionState.status
        };
    }else{
        return {
            isLoggedIn: false,
            searchState: state.getSearchQuestionState.status
        };
    }
})(Navigator);

Navigator.contextTypes = {
  router: React.PropTypes.object.isRequired
}

// module.exports = connect()(Navigator);