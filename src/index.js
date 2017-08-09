import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from "jquery";
class Item extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {isEdit : false};
		this.editNote = this.editNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.saveNote = this.saveNote.bind(this);
		console.log($(".board div").length);
	}

	editNote(){
		this.setState({isEdit: true});
		// this.refs.noteText.focus();
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
							<textarea ref="noteText" autoFocus>{this.props.text}</textarea>
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
		var noteArray = [];
		if (typeof(Storage) !== "undefined") {
			var storedData = localStorage.getItem("noteDb").trim();
			if(storedData !== null && storedData !== ""){
				noteArray = storedData.split(",");
			}
		}
		this.state = {notes: noteArray};
		this.editBoardNote = this.editBoardNote.bind(this);
		this.deleteBoardNote = this.deleteBoardNote.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	addNote(){
		var array = this.state.notes;
		array.push("New Note");
		this.setState({notes : array});
		this.setDb(array);
	}

	editBoardNote(index, text){
		var array = this.state.notes;
		array[index] = text;
		this.setState({notes : array});
		this.setDb(array);
	}
	deleteBoardNote(index){
		var array = this.state.notes;
		array.splice(index, 1);
		this.setState({notes : array});
		this.setDb(array);
	}

	setDb(array){
		localStorage.setItem("noteDb", array.toString());
	}

	render(){
		const notesItems = this.state.notes.map((note, i) =>
			<Item key={i} index={i} text={note} editNoteText={this.editBoardNote} deleteNoteText={this.deleteBoardNote} />
		);

		return (
			<div className="board">
				<button className="addNote" onClick={this.addNote}>Add Note</button>
				{notesItems}
			</div>
		);
	}
}

ReactDOM.render(<Board/>, document.getElementById('root'));
