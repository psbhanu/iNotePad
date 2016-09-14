iNotePad.controller('iNotesCtrl', ['$scope', 'NOTES', 'NoteFactory', function($scope, NOTES, NoteFactory){
	// Initialize Note Components
	$scope.noteKey 		= 0;
	$scope.noteId 		= 0;
	$scope.noteContent 	= "";
	$scope.noteTitle	= "";
	
	// Initialize Notes Seed
	//NOTES.push(new NoteFactory.Note("Text Content Note 1", "Title of Note 1"));
	//NOTES.push(new NoteFactory.Note("Text Content Note 2", "Title of Note 2"));
	//NOTES.push(new NoteFactory.Note("Text Content Note 3", "Title of Note 3"));
	
	$scope.notes = NOTES;
	
	// Save/Update Note
	$scope.save = function(){
		var noteKey 	= $scope.noteKey;
		var noteId 		= $scope.noteId;
		var noteTitle 	= $scope.noteTitle;
		var noteContent = $scope.noteContent;
		
		console.log(noteKey);
		
		if(noteContent) {
			if( noteId == 0 ) {
				// Create New Note
				NOTES.push(new NoteFactory.Note(noteContent, noteTitle));				
			} else if( NOTES[noteKey] !== undefined){
				// Update Note
				NOTES[noteKey] = new NoteFactory.Note(noteContent, noteTitle, noteId);
			} else {
				// Push Anyways
				NOTES.push(new NoteFactory.Note(noteContent, noteTitle));				
			}
			$scope.clear();
		} else {
			angular.element('#noteContent').focus();
		}
	};	

	$scope.cancel = function(){ 
		$scope.clear();	
	};
	
	$scope.clear = function(){ 
		$scope.noteKey		= "";
		$scope.noteId 		= 0;
		$scope.noteTitle 	= "";
		$scope.noteContent 	= "";		
	};

	// Edit Note
	$scope.edit = function(key){
		var note = NOTES[key];
		
		$scope.noteKey		= key;
		$scope.noteId 		= note.id;
		$scope.noteTitle 	= note.title;
		$scope.noteContent 	= note.text;
	};

	// Delete Note
	$scope.delete = function(key){
		if( key > -1 ) {
			NOTES.splice(key, 1);
		}
	};

	// Download Note
	$scope.download = function(key){
		var note = NOTES[key];
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(note.text));
		element.setAttribute('download', note.title);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};	
}]);


