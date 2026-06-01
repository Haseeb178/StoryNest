(async function() {
  const yearEls = document.querySelectorAll('#year');
  yearEls.forEach(el => el && (el.textContent = new Date().getFullYear()));

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle) navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

  const back = document.getElementById('backToTop');
  if (back) back.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

  StoriesDB.initialize();
  renderStories();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.trim().toLowerCase();
      if (!query) {
        renderStories();
        return;
      }
      renderSearchResults(query);
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value.trim();
      if (!email) return;
      alert('Thanks for subscribing, ' + email + '!');
      newsletterForm.reset();
    });
  }

  window.addEventListener('storiesChanged', renderStories);

  function renderStories() {
    const stories = StoriesDB.getStories();
    renderSections(stories);
    const query = document.getElementById('searchInput')?.value.trim().toLowerCase();
    if (query) renderSearchResults(query);
  }

  function renderSections(stories) {
    renderCards('featuredCards', stories.filter(s => s.category === 'featured').slice(0, 5));
    renderCards('animalCards', stories.filter(s => s.category === 'animals').slice(0, 5));
    renderCards('factCards', stories.filter(s => s.category === 'facts').slice(0, 5));
    renderCards('trendingCards', stories.filter(s => s.category === 'trending').slice(0, 5));
    renderCategories(stories);
  }

  function renderCards(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = items.map(story => createCardHtml(story)).join('');
  }

  function createCardHtml(story) {
    return `
      <article class="card">
        <img src="${story.image}" alt="${escapeHtml(story.title)}">
        <div class="card-body">
          <span class="tag">${escapeHtml(story.category)}</span>
          <h3>${escapeHtml(story.title)}</h3>
          <p>${escapeHtml(story.shortDescription)}</p>
          <div class="meta">${escapeHtml(story.author)} • ${escapeHtml(story.date)}</div>
          <a class="btn read" href="story.html?id=${story.id}">Read More</a>
        </div>
      </article>
    `;
  }

  function renderCategories(stories) {
    const container = document.getElementById('categoryList');
    if (!container) return;
    const categories = ['featured', 'animals', 'facts', 'trending'];
    container.innerHTML = categories.map(category => {
      const count = stories.filter(s => s.category === category).length;
      return `
        <div class="category-item">
          <h4>${capitalize(category)}</h4>
          <p>${count} stories</p>
          <a class="btn outline" href="#${category === 'featured' ? 'featured' : category}">Browse</a>
        </div>
      `;
    }).join('');
  }

  function renderSearchResults(query) {
    const stories = StoriesDB.getStories().filter(story => {
      const target = `${story.title} ${story.shortDescription} ${story.content}`.toLowerCase();
      return target.includes(query);
    });
    renderCards('featuredCards', stories.slice(0, 12));
    ['animalCards', 'factCards', 'trendingCards'].forEach(id => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = '';
    });
  }

  function capitalize(value) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  }

  function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
