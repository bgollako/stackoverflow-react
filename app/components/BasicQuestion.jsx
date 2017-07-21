let React = require('react');
let ReactDOM = require('react-dom');
let {Glyphicon} = require('react-bootstrap');
let BasicQuestion = React.createClass({
    render(){
        return(
            <div style={{marginTop:'10px'}}>
            <div className='media'style={{backgroundColor:'white',padding:'10px',borderStyle:'solid',borderWidth:'0.5px',borderColor:'#eee',borderRadius:'5px'}}>
                    <div className="media-body" >
                        <h4 className="media-heading"><a style={{cursor:'pointer'}} href={'#/questions/'+this.props.id}>{this.props.title}</a></h4>
                        {/* <p style={{marginTop:'12px',marginBottom:'1px'}}>{this.props.description}</p> */}
                            <small><i><a style={{cursor:'pointer'}}>{this.props.user}</a> {this.props.asked}</i></small>
                    </div>
                    <div className="btn-group btn-group-xs" role="group" style={{marginTop:'5px'}}>
                        {/* <button type="button" className="btn btn-info">Answers <span className="badge">{this.props.answerCount}</span></button> */}
                        {/* <button type="button" className="btn btn-info">Comments <span className="badge">{this.props.commentCount}</span></button> */}
                        {this.props.voteCount} <Glyphicon glyph="thumbs-up"/> 
                        {/* <button type="button" className="btn btn-info">Comments <span className="badge">2</span></button> */}
                    </div>
                </div>
                {/* <hr/> */}
            </div>
        );
    }
});

module.exports = BasicQuestion;