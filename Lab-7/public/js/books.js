const booksStatus = document.getElementById('booksStatus');
const resultsBadge = document.getElementById('resultsBadge');
const booksContainer = document.getElementById('booksContainer');
const paginationInfo = document.getElementById('paginationInfo');

const searchTitleInput = document.getElementById('searchTitle');
const searchTitleButton = document.getElementById('searchTitleButton');
const categorySelect = document.getElementById('categorySelect');
const filterCategoryButton = document.getElementById('filterCategoryButton');
const sortPriceButton = document.getElementById('sortPriceButton');
const sortRatingButton = document.getElementById('sortRatingButton');
const topRatedButton = document.getElementById('topRatedButton');
const loadPage1Button = document.getElementById('loadPage1Button');
const loadPage2Button = document.getElementById('loadPage2Button');
const loadNextPageButton = document.getElementById('loadNextPageButton');

let currentPage = 1;
const PAGE_SIZE = 5;

function setBooksStatus(message, isError = false) {
  if (!booksStatus) return;
  booksStatus.textContent = message || '';
  booksStatus.style.color = isError ? '#b91c1c' : '#4b5563';
}

function renderBooks(list) {
  booksContainer.innerHTML = '';

  resultsBadge.textContent = `${list.length} book${list.length === 1 ? '' : 's'}`;

  if (list.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No books found for this query.';
    empty.style.color = '#6b7280';
    booksContainer.appendChild(empty);
    return;
  }

  list.forEach((book) => {
    const bookEl = document.createElement('article');
    bookEl.className = 'book';

    const titleEl = document.createElement('div');
    titleEl.className = 'book-title';
    titleEl.textContent = book.title;

    const metaEl = document.createElement('div');
    metaEl.className = 'book-meta';
    metaEl.textContent = `${book.author || 'Unknown author'} · ${
      book.category || 'Unknown category'
    } · ${book.year || 'year ?'}`;

    const footerEl = document.createElement('div');
    footerEl.className = 'book-footer';

    const ratingEl = document.createElement('span');
    ratingEl.className = 'rating';
    ratingEl.textContent =
      book.rating != null ? `★ ${book.rating.toFixed(1)}` : 'No rating';

    const priceEl = document.createElement('span');
    priceEl.className = 'price';
    priceEl.textContent =
      book.price != null ? `₹${book.price.toFixed(2)}` : 'Price N/A';

    footerEl.appendChild(ratingEl);
    footerEl.appendChild(priceEl);

    bookEl.appendChild(titleEl);
    bookEl.appendChild(metaEl);
    bookEl.appendChild(footerEl);

    booksContainer.appendChild(bookEl);
  });
}

async function searchBooksByTitle() {
  const title = searchTitleInput.value.trim();
  if (!title) {
    setBooksStatus('Enter a title to search.', true);
    return;
  }
  try {
    const res = await fetch(`/books/search?title=${encodeURIComponent(title)}`);
    if (!res.ok) {
      throw new Error('Failed to search books');
    }
    const books = await res.json();
    renderBooks(books);
    paginationInfo.textContent = '';
    setBooksStatus(`Search for "${title}" returned ${books.length} book(s).`);
  } catch (err) {
    console.error(err);
    setBooksStatus('Could not search books.', true);
  }
}

async function filterByCategory() {
  const category = categorySelect.value;
  if (!category) {
    setBooksStatus('Choose a category first.', true);
    return;
  }
  try {
    const res = await fetch(`/books/category/${encodeURIComponent(category)}`);
    if (!res.ok) {
      throw new Error('Failed to filter books');
    }
    const books = await res.json();
    renderBooks(books);
    paginationInfo.textContent = '';
    setBooksStatus(`Showing category "${category}" (${books.length} book(s)).`);
  } catch (err) {
    console.error(err);
    setBooksStatus('Could not filter books.', true);
  }
}

async function sortByPrice() {
  try {
    const res = await fetch('/books/sort/price');
    if (!res.ok) {
      throw new Error('Failed to sort books by price');
    }
    const books = await res.json();
    renderBooks(books);
    paginationInfo.textContent = '';
    setBooksStatus('Books sorted by price (ascending).');
  } catch (err) {
    console.error(err);
    setBooksStatus('Could not sort by price.', true);
  }
}

async function sortByRating() {
  try {
    const res = await fetch('/books/sort/rating');
    if (!res.ok) {
      throw new Error('Failed to sort books by rating');
    }
    const books = await res.json();
    renderBooks(books);
    paginationInfo.textContent = '';
    setBooksStatus('Books sorted by rating (highest first).');
  } catch (err) {
    console.error(err);
    setBooksStatus('Could not sort by rating.', true);
  }
}

async function loadTopBooks() {
  try {
    const res = await fetch('/books/top');
    if (!res.ok) {
      throw new Error('Failed to fetch top rated books');
    }
    const books = await res.json();
    renderBooks(books);
    paginationInfo.textContent = '';
    setBooksStatus('Top rated books (rating ≥ 4).');
  } catch (err) {
    console.error(err);
    setBooksStatus('Could not load top rated books.', true);
  }
}

async function loadPage(page) {
  currentPage = page;
  try {
    const res = await fetch(`/books?page=${page}`);
    if (!res.ok) {
      throw new Error('Failed to fetch page');
    }
    const data = await res.json();
    const books = data.books || [];
    renderBooks(books);
    paginationInfo.textContent = `Page ${data.page} (page size ${data.pageSize})`;
    setBooksStatus(`Loaded page ${data.page}.`);
  } catch (err) {
    console.error(err);
    setBooksStatus('Could not load page.', true);
  }
}

searchTitleButton.addEventListener('click', searchBooksByTitle);
filterCategoryButton.addEventListener('click', filterByCategory);
sortPriceButton.addEventListener('click', sortByPrice);
sortRatingButton.addEventListener('click', sortByRating);
topRatedButton.addEventListener('click', loadTopBooks);

loadPage1Button.addEventListener('click', () => loadPage(1));
loadPage2Button.addEventListener('click', () => loadPage(2));
loadNextPageButton.addEventListener('click', () => loadPage(currentPage + 1));

window.addEventListener('DOMContentLoaded', () => {
  loadPage(1);
});

