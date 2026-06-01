(function() {
  const yearEl = document.getElementById('year2');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  StoriesDB.initialize();
  renderStory();

  window.addEventListener('storiesChanged', renderStory);

  function renderStory() {
    const params = new URLSearchParams(window.location.search);
    const storyId = params.get('id');
    const contentContainer = document.getElementById('storyContent');
    const relatedSection = document.getElementById('relatedSection');

    if (!contentContainer) return;

    const story = StoriesDB.getStoryById(storyId);
    if (!story) {
      contentContainer.innerHTML = '<div class="empty-state"><h2>Story not found</h2><p>Please return to the homepage and choose another story.</p></div>';
      if (relatedSection) relatedSection.innerHTML = '';
      return;
    }

    contentContainer.innerHTML = `
      <article class="story-card detail-card">
        <span class="tag">${escapeHtml(story.category)}</span>
        <h1>${escapeHtml(story.title)}</h1>
        <div class="story-meta">${escapeHtml(story.author)} • ${escapeHtml(story.date)}</div>
        <img src="${escapeHtml(story.image)}" alt="${escapeHtml(story.title)}">
        <div class="story-body">${nl2br(escapeHtml(story.content))}</div>
      </article>
    `;

    renderRelated(story);
  }

  function renderRelated(story) {
    const relatedSection = document.getElementById('relatedSection');
    if (!relatedSection) return;

    const stories = StoriesDB.getStories();
    const relatedStories = stories.filter(item => item.category === story.category && String(item.id) !== String(story.id)).slice(0, 4);
    const currentIndex = stories.findIndex(item => String(item.id) === String(story.id));
    const prev = currentIndex > 0 ? stories[currentIndex - 1] : null;
    const next = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null;

    let html = '<div class="related-card card"><h3>Related Stories</h3>';
    if (relatedStories.length) {
      html += '<ul>' + relatedStories.map(item => `<li><a href="story.html?id=${item.id}">${escapeHtml(item.title)}</a></li>`).join('') + '</ul>';
    } else {
      html += '<p>No related stories available.</p>';
    }
    html += '</div>';

    html += '<div class="detail-nav">';
    if (prev) html += `<a class="btn outline" href="story.html?id=${prev.id}">← ${escapeHtml(prev.title)}</a>`;
    if (next) html += `<a class="btn outline" href="story.html?id=${next.id}">${escapeHtml(next.title)} →</a>`;
    html += '</div>';

    relatedSection.innerHTML = html;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function nl2br(value) {
    return String(value || '').replace(/\n/g, '<br>');
  }
})();
