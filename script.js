function saveNote() {
	let note = document.getElementById('note').value;
	localStorage.setItem('note', note);
	alert('Nota salvata con successo!                                                                  Questa nota rimarrà qua anche se chiudi e riapri la scheda/ricarichi la pagina.');
}

function saveNoteAs() {
	let name = prompt('Inserisci il nome della nota:');
	if(name == null || name == '') {
		return;
	}
	let note = document.getElementById('note').value;
	localStorage.setItem(name, note);
	alert('Nota salvata con successo!');
	displaySavedNotes();
}

function clearNote() {
	if(confirm('Sei sicuro di voler cancellare la nota?')) {
		localStorage.removeItem('note');
		document.getElementById('note').value = '';
		alert('Nota cancellata con successo!');
	}
}

function clearSavedNote(name) {
	if(confirm('Sei sicuro di voler cancellare questa nota?')) {
		localStorage.removeItem(name);
		displaySavedNotes();
		alert('Nota cancellata con successo!');
	}
}

function displaySavedNotes() {
	let list = document.getElementById('saved-notes');
	list.innerHTML = '';
	for(let i = 0; i < localStorage.length; i++) {
		let name = localStorage.key(i);
		if(name == 'note') {
			continue;
		}
		let li = document.createElement('li');
		li.innerHTML = name + ' <button id="btn" onclick="loadSavedNote(\'' + name + '\')">Carica</button> <button id="btn" onclick="clearSavedNote(\'' + name + '\')">Cancella</button>';
		list.appendChild(li);
	}
}

function loadSavedNote(name) {
	document.getElementById('note').value = localStorage.getItem(name);
	alert('Nota caricata con successo!');
}

window.onload = function() {
	if(localStorage.getItem('note')) {
		document.getElementById('note').value = localStorage.getItem('note');
	}
	displaySavedNotes();
}


const shareBtn = document.getElementById('shareBtn')

shareBtn.addEventListener('click', event => {

  // Check for Web Share api support
  if (navigator.share) {
    // Browser supports native share api
    navigator.share({
      text: 'Condividi questa pagina',
      url: 'https://epleboy.github.io/bolck-notes-alpha/'
    }).then(() => {
      console.log('Grazie per la condivisione!');
    })
      .catch((err) => console.error(err));
  } else {
    // Fallback
    alert("Cambia Browser! Questa funzione non è disponibile, per condividere copia il link")
  }
});