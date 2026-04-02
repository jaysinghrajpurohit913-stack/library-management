const BASE_URL = 'http://localhost:3001/add/books';

// ── Toast Notification ─────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Add Book ───────────────────────────────────────────
async function addBook() {
  const title  = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const year   = document.getElementById('year').value;
  const price  = document.getElementById('price').value;

  if (!title || !author) {
    showToast('⚠ Please fill in at least Title and Author.');
    return;
  }

  const book = { title, author, publishedYear: year, price };

  try {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    // Clear inputs
    ['title', 'author', 'year', 'price'].forEach(id => {
      document.getElementById(id).value = '';
    });

    showToast('✓ Book added successfully!');
    fetchBooks();
  } catch (err) {
    showToast('✗ Failed to add book.');
  }
}

// ── Fetch & Render Books ───────────────────────────────
async function fetchBooks() {
  const list = document.getElementById('bookList');

  try {
    const response = await fetch(BASE_URL);
    const books = await response.json();

    document.getElementById('bookCount').textContent =
      books.length === 1 ? '1 title' : `${books.length} titles`;

    list.innerHTML = '';

    if (books.length === 0) {
      list.innerHTML = `
        <li class="empty-state">
          <span class="empty-icon">📚</span>
          <span>No books yet. Add one above.</span>
        </li>`;
      return;
    }

    books.forEach((book, index) => {
      const li = document.createElement('li');
      li.className = `book-item issued-${book.issued}`;
      li.style.animationDelay = `${index * 0.05}s`;

      const emoji = getBookEmoji(book.title);
      const metaParts = [];
      if (book.author) metaParts.push(book.author);
      if (book.publishedYear) metaParts.push(formatDate(book.publishedYear));
      if (book.price) metaParts.push(`₹${book.price}`);

      li.innerHTML = `
        <div class="book-spine">${emoji}</div>
        <div class="book-info">
          <div class="book-title">${escapeHTML(book.title)}</div>
          <div class="book-meta">${metaParts.map(escapeHTML).join(' · ')}</div>
        </div>
        <span class="book-status ${book.issued ? 'status-issued' : 'status-available'}">
          ${book.issued ? 'Issued' : 'Available'}
        </span>
        <div class="book-actions">
          <button class="btn-sm ${book.issued ? 'btn-return' : 'btn-issue'}"
            onclick="toggleIssued('${book._id}', ${!book.issued})">
            ${book.issued ? 'Return' : 'Issue'}
          </button>
          <button class="btn-sm btn-delete" onclick="deleteBook('${book._id}')">
            Delete
          </button>
        </div>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    list.innerHTML = `
      <li class="empty-state">
        <span class="empty-icon">⚠️</span>
        <span>Could not connect to server.</span>
      </li>`;
  }
}

// ── Delete Book ────────────────────────────────────────
async function deleteBook(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    showToast('🗑 Book removed.');
    fetchBooks();
  } catch (err) {
    showToast('✗ Failed to delete book.');
  }
}

// ── Toggle Issued ──────────────────────────────────────
async function toggleIssued(id, issuedStatus) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issued: issuedStatus }),
    });
    showToast(issuedStatus ? '📤 Book issued.' : '📥 Book returned.');
    fetchBooks();
  } catch (err) {
    showToast('✗ Failed to update book.');
  }
}

// ── Helpers ────────────────────────────────────────────
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

function getBookEmoji(title) {
  if (!title) return '📖';
  const t = title.toLowerCase();
  if (t.includes('science') || t.includes('physics') || t.includes('math')) return '🔬';
  if (t.includes('history') || t.includes('war'))  return '⚔️';
  if (t.includes('art') || t.includes('design'))   return '🎨';
  if (t.includes('cook') || t.includes('food'))    return '🍳';
  if (t.includes('code') || t.includes('program')) return '💻';
  if (t.includes('philosophy') || t.includes('mind')) return '🧠';
  return '📖';
}

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', fetchBooks);
