var iNotePad = angular.module("iNotePad", []);

// Constants
iNotePad.constant('iNotePad', {
	APP_ENV : "development",
	debug : true,
});

// Values
iNotePad.value('AUTO_INCREMENT', 0);
iNotePad.value('DEFAULT_TITLE', '(Untitled)');
iNotePad.value('NOTES', []);

// Note Factory
iNotePad.factory('NoteFactory',['AUTO_INCREMENT', 'DEFAULT_TITLE', function(AUTO_INCREMENT, DEFAULT_TITLE){
	var NoteFactory = {};
	NoteFactory.Note = function (text, title, id) {
		AUTO_INCREMENT++;
		this.id 		= id || AUTO_INCREMENT;
		this.title 		= title || DEFAULT_TITLE;
		this.text 		= text;
		
		this.getNote 	= function(){
			return {
				id 		: this.id,
				title 	: this.title,
				text 	: this.text
			};
		};
	};
	return NoteFactory;
}]);


