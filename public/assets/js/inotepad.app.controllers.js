iNotePad.controller('iNotesCtrl', ['$scope', '$cookies', 'NOTES', 'NoteFactory', 'MessageFactory', function($scope, $cookies, NOTES, NoteFactory, MessageFactory){
	// Initialize Note Components
	$scope.noteKey 		= 0;
	$scope.noteId 		= 0;
	$scope.noteContent 	= "";
	$scope.noteTitle	= "";
	
	// Initialize Notes Seed
	//NOTES.push(new NoteFactory.Note("Text Content Note 1", "Title of Note 1"));
	//NOTES.push(new NoteFactory.Note("Text Content Note 2", "Title of Note 2"));
	//NOTES.push(new NoteFactory.Note("Text Content Note 3", "Title of Note 3"));
	
	// Cookies Support Methods
	$scope.getCookies = function(){
		return $cookies.getObject('iNotes');
	};	
	$scope.getCookie = function(key){
		return $cookies.getObject(key);
	};
	$scope.updateCookies = function(){
		return $cookies.putObject('iNotes', { NOTES : NOTES });
	};
	$scope.removeCookies = function(){
		return $cookies.remove('NOTES');
	};

	// Retrieving Notes 
	var iNotes = $scope.getCookies();
	if(iNotes) {
		NOTES = iNotes.NOTES;
	} 
	$scope.notes = NOTES;
	
	// Save/Update Note
	$scope.save = function(){
		var noteKey 	= $scope.noteKey;
		var noteId 		= $scope.noteId;
		var noteTitle 	= $scope.noteTitle;
		var noteContent = $scope.noteContent;
		
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

			// Validating Size
			if(noteContent.length > 4096) { 
				MessageFactory.warning(); 
			} else {
				MessageFactory.success(); 
			}
			
			$scope.clear();
		} else {
			angular.element('#noteContent').focus();
		}
		$scope.updateCookies();
	};	

	// Clone Note
	$scope.clone = function(){
		var noteId 		= $scope.noteId;
		var noteTitle 	= $scope.noteTitle;
		var noteContent = $scope.noteContent;
		
		if(noteContent) {
			// Create New Note
			NOTES.push(new NoteFactory.Note(noteContent, noteTitle));
			
			// Validating Size
			if(noteContent.length > 4096) { 
				MessageFactory.warning(); 
			} else {
				MessageFactory.success(); 
			}

			$scope.clear();
		} else {
			angular.element('#noteContent').focus();
		}
		$scope.updateCookies();
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
		$scope.updateCookies();
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


