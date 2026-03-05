const express = require('express');
const path = require('path');
const { ObjectId } = require('mongodb');
const {
  connectToDb,
  getNotesCollection,
  getBooksCollection,
} = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend files
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Health check
app.get('/health', async (req, res) => {
  try {
    await connectToDb();
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// ------------------------ Notes Routes (CRUD) ------------------------ //

// Create Note
app.post('/notes', async (req, res) => {
  try {
    const { title, subject, description } = req.body || {};

    if (!title || !subject || !description) {
      return res
        .status(400)
        .json({ error: 'title, subject and description are required' });
    }

    const notesCol = await getNotesCollection();

    const createdDate = new Date();
    const noteDoc = {
      title,
      subject,
      description,
      created_date: createdDate,
    };

    const result = await notesCol.insertOne(noteDoc);
    const inserted = { _id: result.insertedId, ...noteDoc };

    res.status(201).json(inserted);
  } catch (err) {
    console.error('Error creating note', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Read Notes
app.get('/notes', async (req, res) => {
  try {
    const notesCol = await getNotesCollection();
    const notes = await notesCol
      .find({})
      .sort({ created_date: -1 })
      .toArray();
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Update Note
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body || {};

  if (!title && !description) {
    return res
      .status(400)
      .json({ error: 'At least one of title or description is required' });
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid note id' });
  }

  try {
    const notesCol = await getNotesCollection();
    const update = {};
    if (title) update.title = title;
    if (description) update.description = description;

    const result = await notesCol.updateOne(
      { _id: objectId },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ updatedCount: result.modifiedCount });
  } catch (err) {
    console.error('Error updating note', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete Note
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid note id' });
  }

  try {
    const notesCol = await getNotesCollection();
    const result = await notesCol.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error deleting note', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// ------------------------ Books Routes ------------------------ //

// Search Books by Title
app.get('/books/search', async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'title query parameter is required' });
  }

  try {
    const booksCol = await getBooksCollection();
    const books = await booksCol
      .find({ title: { $regex: title, $options: 'i' } })
      .toArray();
    res.json(books);
  } catch (err) {
    console.error('Error searching books', err);
    res.status(500).json({ error: 'Failed to search books' });
  }
});

// Filter Books by Category
app.get('/books/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const booksCol = await getBooksCollection();
    const books = await booksCol.find({ category }).toArray();
    res.json(books);
  } catch (err) {
    console.error('Error filtering books by category', err);
    res.status(500).json({ error: 'Failed to filter books' });
  }
});

// Sort Books by Price
app.get('/books/sort/price', async (req, res) => {
  try {
    const booksCol = await getBooksCollection();
    const books = await booksCol.find({}).sort({ price: 1 }).toArray();
    res.json(books);
  } catch (err) {
    console.error('Error sorting books by price', err);
    res.status(500).json({ error: 'Failed to sort books by price' });
  }
});

// Sort Books by Rating
app.get('/books/sort/rating', async (req, res) => {
  try {
    const booksCol = await getBooksCollection();
    const books = await booksCol.find({}).sort({ rating: -1 }).toArray();
    res.json(books);
  } catch (err) {
    console.error('Error sorting books by rating', err);
    res.status(500).json({ error: 'Failed to sort books by rating' });
  }
});

// Top Rated Books
app.get('/books/top', async (req, res) => {
  try {
    const booksCol = await getBooksCollection();
    const books = await booksCol
      .find({ rating: { $gte: 4 } })
      .limit(5)
      .toArray();
    res.json(books);
  } catch (err) {
    console.error('Error fetching top rated books', err);
    res.status(500).json({ error: 'Failed to fetch top rated books' });
  }
});

// Pagination
app.get('/books', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  try {
    const booksCol = await getBooksCollection();
    const books = await booksCol
      .find({})
      .skip(skip)
      .limit(pageSize)
      .toArray();
    res.json({ page, pageSize, books });
  } catch (err) {
    console.error('Error fetching paginated books', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Fallback root route: redirect to notes page for convenience
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'notes.html'));
});

// Start server after ensuring DB connection is possible
connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

