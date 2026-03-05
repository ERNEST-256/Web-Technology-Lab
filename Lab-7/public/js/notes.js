const notesApiBase = '/notes';

const noteForm = document.getElementById('noteForm');
const noteIdInput = document.getElementById('noteId');
const titleInput = document.getElementById('title');
const subjectInput = document.getElementById('subject');
const descriptionInput = document.getElementById('description');
const submitButton = document.getElementById('submitButton');
const cancelEditButton = document.getElementById('cancelEditButton');
const notesContainer = document.getElementById('notesContainer');
const noteCountPill = document.getElementById('noteCountPill');
const statusMessage = document.getElementById('statusMessage');

function setStatus(message, isError = false) {
  if (!statusMessage) return;
  statusMessage.textContent = message || '';
  statusMessage.style.color = isError ? '#b91c1c' : '#4b5563';
}

async function loadNotes() {
  try {
    const res = await fetch(notesApiBase);
    if (!res.ok) {
      throw new Error('Failed to load notes');
    }
    const notes = await res.json();
    renderNotes(notes);
    setStatus(`Loaded ${notes.length} note(s).`);
  } catch (err) {
    console.error(err);
    setStatus('Could not load notes from server.', true);
  }
}

function renderNotes(notes) {
  notesContainer.innerHTML = '';
  noteCountPill.textContent = `${notes.length} note${notes.length === 1 ? '' : 's'}`;

  if (notes.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No notes yet. Add your first study note above.';
    empty.style.color = '#6b7280';
    notesContainer.appendChild(empty);
    return;
  }

  notes.forEach((note) => {
    const noteEl = document.createElement('article');
    noteEl.className = 'note';

    const header = document.createElement('div');
    header.className = 'note-header';

    const titleEl = document.createElement('div');
    titleEl.className = 'note-title';
    titleEl.textContent = note.title;

    const subjectEl = document.createElement('div');
    subjectEl.className = 'note-subject';
    subjectEl.textContent = note.subject;

    header.appendChild(titleEl);
    header.appendChild(subjectEl);

    const descriptionEl = document.createElement('div');
    descriptionEl.className = 'note-description';
    descriptionEl.textContent = note.description;

    const dateEl = document.createElement('div');
    dateEl.className = 'note-date';
    if (note.created_date) {
      const date = new Date(note.created_date);
      dateEl.textContent = `Created on ${date.toLocaleString()}`;
    }

    const actions = document.createElement('div');
    actions.className = 'note-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'secondary';
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEditNote(note));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'danger';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => handleDeleteNote(note._id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    noteEl.appendChild(header);
    noteEl.appendChild(descriptionEl);
    noteEl.appendChild(dateEl);
    noteEl.appendChild(actions);

    notesContainer.appendChild(noteEl);
  });
}

function resetForm() {
  noteIdInput.value = '';
  titleInput.value = '';
  subjectInput.value = '';
  descriptionInput.value = '';
  submitButton.textContent = 'Add Note';
  cancelEditButton.style.display = 'none';
}

function startEditNote(note) {
  noteIdInput.value = note._id;
  titleInput.value = note.title;
  subjectInput.value = note.subject;
  descriptionInput.value = note.description;
  submitButton.textContent = 'Update Note';
  cancelEditButton.style.display = 'inline-flex';
  setStatus(`Editing note "${note.title}".`);
}

cancelEditButton.addEventListener('click', () => {
  resetForm();
  setStatus('Edit cancelled.');
});

noteForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = noteIdInput.value.trim();
  const title = titleInput.value.trim();
  const subject = subjectInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title || !subject || !description) {
    setStatus('Please fill in title, subject and description.', true);
    return;
  }

  try {
    if (id) {
      // Update
      const res = await fetch(`${notesApiBase}/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) {
        throw new Error('Failed to update note');
      }
      setStatus('Note updated successfully.');
    } else {
      // Create
      const res = await fetch(notesApiBase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subject, description }),
      });
      if (!res.ok) {
        throw new Error('Failed to add note');
      }
      setStatus('Note added successfully.');
    }

    resetForm();
    await loadNotes();
  } catch (err) {
    console.error(err);
    setStatus('There was a problem saving the note.', true);
  }
});

async function handleDeleteNote(id) {
  const confirmed = window.confirm('Delete this note permanently?');
  if (!confirmed) return;

  try {
    const res = await fetch(`${notesApiBase}/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete note');
    }
    setStatus('Note deleted.');
    await loadNotes();
  } catch (err) {
    console.error(err);
    setStatus('Could not delete note.', true);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadNotes();
});

