// modal windows controls
var btnContact = document.querySelector('.button__contact');
var modalWriteUs = document.querySelector('.modal__write-us');

var mapLink = document.querySelector('.map-link');
var modalMap = document.querySelector('.modal__map');

var modalClose = document.querySelectorAll('.modal-close');
var modalOverlay = document.querySelector('.modal-overlay');

// form
var formWriteUs = document.querySelector('.write-us');
var nameField = document.querySelector('[name="name"]');
var emailField = document.querySelector('[name="email"]');
var textField = document.querySelector('[name="text"]');

var modalCloseAct = function (evt) {
	evt.preventDefault();

	if (modalWriteUs.classList.contains('modal-show')) {
		modalWriteUs.classList.remove('modal-show');
	} else {
		modalMap.classList.remove('modal-show');
	}

	if (modalWriteUs.classList.contains('modal-error')) {
		modalWriteUs.classList.remove('modal-error');
	}
	
	modalOverlay.classList.remove('overlay-show');
}

// localStorage
var isStorageSupport = true;
var storageName, storageEmail;

try {
	storageName = localStorage.getItem('name');
	storageEmail = localStorage.getItem('email');
} catch (err) {
	isStorageSupport = false;
}


// modal windows actions
// modal write-us show
btnContact.addEventListener('click', function(evt) {
	evt.preventDefault();
	modalWriteUs.classList.add('modal-show');
	modalOverlay.classList.add('overlay-show');


	if (isStorageSupport) {

		if (!storageName) {
			nameField.focus();
		} else {
			nameField.value = storageName;

			if (!storageEmail) {
				emailField.focus();
			} else {
				emailField.value = storageEmail;
				textField.focus();
			}
		}
	}
	
});

// modal map show
mapLink.addEventListener('click', function(evt) {
	evt.preventDefault();
	modalMap.classList.add('modal-show');
	modalOverlay.classList.add('overlay-show');
});

// all modal windows close (close-button, overlay, escape key)
for (i = 0, max = modalClose.length; i < max; i += 1) {
	modalClose[i].addEventListener('click', modalCloseAct);
};

modalOverlay.addEventListener('click', modalCloseAct);

window.addEventListener('keydown', function (evt) {

	if (evt.keyCode === 27) {

		if (modalWriteUs.classList.contains('modal-show')) {
			evt.preventDefault();
			modalWriteUs.classList.remove('modal-show');
		} else {
			evt.preventDefault();
			modalMap.classList.remove('modal-show');
		}

		if (modalWriteUs.classList.contains('modal-error')) {
			modalWriteUs.classList.remove('modal-error');
		}

		modalOverlay.classList.remove('overlay-show');
	}

});


// form actions
formWriteUs.addEventListener('submit', function(evt) {
	evt.preventDefault();

	if ( !nameField.value || !emailField.value ||  !textField.value) {
		modalWriteUs.classList.add('modal-error');
		console.log('Ну ты чё, мужик? Форму заполни! Все поля!)');
	} else {

		if (isStorageSupport) {
			localStorage.setItem('name', nameField.value);
			localStorage.setItem('email', emailField.value);
		}

		console.log('Ну наконец-то...');

	}

});