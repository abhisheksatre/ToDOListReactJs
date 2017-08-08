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
		this.props.deleteNoteText(this.props.index);
	}
	saveNote(){
		this.setState({isEdit: false});	
		this.props.editNoteText(this.props.index, this.refs.noteText.value);
	}

	render(){
		const noteMode = (<div className="item">
							<p>{this.props.text}</p>
							<button className="edit" onClick={this.editNote}>Edit</button>
							<button className="delete" onClick={this.deleteNote}>Delete</button>
					</div>);

		const editMode = (<div className="item">
							<textarea ref="noteText">{this.props.text}</textarea>
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
	constructor(props){
		super(props);
		this.state = {notes: ["Google","Woogle","Doogle"]};
		this.editBoardNote = this.editBoardNote.bind(this);
		this.deleteBoardNote = this.deleteBoardNote.bind(this);
	}

	editBoardNote(index, text){
		var array = this.state.notes;
		array[index] = text;
		this.setState({notes : array});
	}
	deleteBoardNote(index){
		var array = this.state.notes;
		array.splice(index, 1);
		this.setState({notes : array});
	}

	render(){
		const notesItems = this.state.notes.map((note, i) =>
			<Item key={i} index={i} text={note} editNoteText={this.editBoardNote} deleteNoteText={this.deleteBoardNote} />
		);

		return (
			<div className="board">
				{notesItems}
			</div>
		);
	}
}

ReactDOM.render(<Board/>, document.getElementById('root'));
