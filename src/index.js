import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Item extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {isEdit : false};
		this.editNote = this.editNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.saveNote = this.saveNote.bind(this);
	}

	editNote(){
		this.setState({isEdit: true});
	}
	deleteNote(){
		alert("delete it");
	}
	saveNote(){
		this.setState({isEdit: false});	
	}

	render(){
		const noteMode = (<div className="item">
							<p>{this.props.text}</p>
							<button className="edit" onClick={this.editNote}>Edit</button>
							<button className="delete" onClick={this.deleteNote}>Delete</button>
					</div>);

		const editMode = (<div className="item">
							<textarea>{this.props.text}</textarea>
							<button className="save" onClick={this.saveNote}>save</button>
					</div>); 
		
		if(this.state.isEdit){
			return editMode;
		}else{
			return noteMode;
		}
	}
}

class Board extends React.Component{
	render(){

		const notes = ["Google Now","Siri","Alexa"];
		const notesItems = notes.map((note) =>
			<Item text={note}/>
		);

		return (
			<div className="board">
				{notesItems}
			</div>
		);
	}
}

ReactDOM.render(<Board/>, document.getElementById('root'));
