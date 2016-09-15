var iNotePad = angular.module("iNotePad", ['ngCookies']);

// Constants
iNotePad.constant('iNotePad', {
	APP_ENV : "development",
	debug : true,
});

// Values
iNotePad.value('AUTO_INCREMENT', 0);
iNotePad.value('DEFAULT_TITLE', '(Untitled)');
iNotePad.value('DEFAULT_WARNING', "Your note has been saved but we detected that your note has size more than <strong>4096 bytes</strong>. Your browser doesn't allow us saving such size note. Hence, This note would not be available after page refresh. <code>Either reduce size of the note or download it before refresing the page to avoid lossing the note contents.</code>");
iNotePad.value('DEFAULT_SUCCESS', "Your note has been saved successfully! You can access it using the saved iNotes list.");
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

// Message Factory
iNotePad.factory('MessageFactory',['DEFAULT_SUCCESS', 'DEFAULT_WARNING', '$timeout', function(DEFAULT_SUCCESS, DEFAULT_WARNING, $timeout){
	var MessageFactory = {};
	MessageFactory.warning = function () {
		var element = document.createElement('div');
		element.setAttribute('class', 'alert alert-info');
		element.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong><i class="fa fa-warning"></i> Warning!</strong> ' + DEFAULT_WARNING;
		document.body.appendChild(element);
		$timeout(function(){
			document.body.removeChild(element);
		}, 30000);
	};
	MessageFactory.success = function () {
		var element = document.createElement('div');
		element.setAttribute('class', 'alert alert-success');
		element.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong><i class="fa fa-warning"></i> Success!</strong> ' + DEFAULT_SUCCESS;
		document.body.appendChild(element);
		$timeout(function(){
			document.body.removeChild(element);
		}, 5000);
	};
	return MessageFactory;
}]);