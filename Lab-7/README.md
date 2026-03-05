# Lab 7 – MongoDB Web Applications

This lab implements two simple web applications backed by MongoDB:

- **Student Notes Manager** – full CRUD operations on a `notes` collection.
- **Online Book Finder** – search, filter, sort, top-rated, and paginated queries on a `books` collection.

Both applications share a single Node.js + Express backend and use plain HTML/CSS/JavaScript on the frontend with AJAX (`fetch`) calls.

---

## 1. Prerequisites

- Node.js (v18+ recommended).
- MongoDB running locally or in the cloud.

Set the following environment variables if you are not using the defaults:

- `MONGODB_URI` – MongoDB connection string.  
  Default: `mongodb://localhost:27017`
- `MONGODB_DB_NAME` – Database name.  
  Default: `lab7_mongodb`

---

## 2. Install Dependencies

From the `Lab-7` directory:

```bash
npm install
```

(`express`, `mongodb`, and `nodemon` are already listed in `package.json`.)

---

## 3. Start the Server

From the `Lab-7` directory:

```bash
# Development (with auto‑reload)
npm run dev

# or production
npm start
```

The server starts on `http://localhost:3000` (configurable via `PORT`).

Static frontend files are served from the `public` folder:

- `http://localhost:3000/` → `notes.html` (Student Notes Manager)
- `http://localhost:3000/books.html` → Online Book Finder

Health check:

- `GET /health` – verifies that the server and MongoDB connection are working.

---

## 4. MongoDB Structure

### Notes collection (`notes`)

Example document:

```json
{
  "_id": "ObjectId",
  "title": "MongoDB Basics",
  "subject": "Database",
  "description": "Introduction to MongoDB concepts",
  "created_date": "2026-03-05T10:00:00.000Z"
}
```

### Books collection (`books`)

Example document:

```json
{
  "_id": "ObjectId",
  "title": "JavaScript Essentials",
  "author": "John Smith",
  "category": "Programming",
  "price": 450,
  "rating": 4.5,
  "year": 2023
}
```

---

## 5. API Endpoints – Student Notes Manager

Base path: `/notes`

- **Create Note** – `POST /notes`  
  Request JSON (AJAX):

  ```json
  {
    "title": "MongoDB Basics",
    "subject": "Database",
    "description": "Introduction to MongoDB concepts"
  }
  ```

  MongoDB operation:

  ```js
  db.notes.insertOne({
    title,
    subject,
    description,
    created_date: new Date()
  });
  ```

- **View Notes** – `GET /notes`  
  MongoDB query:

  ```js
  db.notes.find().sort({ created_date: -1 });
  ```

- **Update Note** – `PUT /notes/:id`  
  Request JSON:

  ```json
  {
    "title": "MongoDB Advanced",
    "description": "Aggregation and indexing"
  }
  ```

  MongoDB operation:

  ```js
  db.notes.updateOne(
    { _id: ObjectId(id) },
    { $set: { title: 'MongoDB Advanced', description: 'Aggregation and indexing' } }
  );
  ```

- **Delete Note** – `DELETE /notes/:id`  
  MongoDB operation:

  ```js
  db.notes.deleteOne({ _id: ObjectId(id) });
  ```

The frontend page `notes.html` uses `fetch` to call these endpoints and dynamically renders the notes list, allowing edit/delete operations.

---

## 6. API Endpoints – Online Book Finder

Base paths: `/books`, `/books/search`, `/books/category`, etc.

- **Search Books by Title** – `GET /books/search?title=javascript`

  ```js
  db.books.find({ title: { $regex: 'javascript', $options: 'i' } });
  ```

- **Filter Books by Category** – `GET /books/category/:category`

  ```js
  db.books.find({ category: 'Programming' });
  ```

- **Sort Books by Price** – `GET /books/sort/price`

  ```js
  db.books.find().sort({ price: 1 });
  ```

- **Sort Books by Rating** – `GET /books/sort/rating`

  ```js
  db.books.find().sort({ rating: -1 });
  ```

- **Top Rated Books** – `GET /books/top`

  ```js
  db.books.find({ rating: { $gte: 4 } }).limit(5);
  ```

- **Pagination (Load More)** – `GET /books?page=2`

  ```js
  const page = 2;
  const pageSize = 5;
  db.books
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  ```

The frontend page `books.html` calls these endpoints using `fetch` and renders book cards with title, author, category, price, rating, and year. UI controls trigger the corresponding queries (search, category filter, sort, top rated, pagination).

---

## 7. Seeding Sample Books

To insert some sample data into the `books` collection, run:

```bash
node seedBooks.js
```

- If the collection is empty, it inserts several example books.
- If documents already exist, it leaves them unchanged.

---

## 8. Manual Testing Checklist

### Student Notes Manager

- Open `http://localhost:3000/` in the browser.
- Add a few notes (title, subject, description) and verify they appear in the list.
- Refresh the page – notes should still be loaded from MongoDB.
- Edit a note:
  - Click **Edit**, change the title/description, and save.
  - Confirm the change is visible and stored in the database.
- Delete a note and confirm it disappears from the UI and from MongoDB.

### Online Book Finder

- Visit `http://localhost:3000/books.html`.
- Use **Search by title** (e.g., “javascript”) and verify matching books.
- Use **Filter by category** (e.g., “Programming”) and check results.
- Use **Sort by price** and **Sort by rating** and verify the order.
- Click **Top rated** to show only books with `rating >= 4`.
- Use the pagination controls (Page 1, Page 2, Next page) and confirm:
  - Each page shows at most 5 books.
  - The skip/limit logic corresponds to the example in the lab.

If everything above works, the lab requirements for both Question 1 and Question 2 are satisfied.

