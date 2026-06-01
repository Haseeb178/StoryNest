(function() {
  // Simple admin auth check
  if (sessionStorage.getItem('storynest_admin') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  const storyCountNode = document.getElementById('storyCount');
  const yearNode = document.getElementById('year3');
  const logoutButton = document.getElementById('logoutButton');
  const clearFormButton = document.getElementById('clearFormButton');
  const form = document.getElementById('storyForm');
  const generateButton = document.getElementById('generateButton');
  const fillFormButton = document.getElementById('fillFormButton');
  const aiPrompt = document.getElementById('aiPrompt');
  const aiCategory = document.getElementById('aiCategory');
  const aiAuthor = document.getElementById('aiAuthor');
  const aiOutput = document.getElementById('aiOutput');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      sessionStorage.removeItem('storynest_admin');
      window.location.href = 'login.html';
    });
  }

  if (clearFormButton) {
    clearFormButton.addEventListener('click', (event) => {
      event.preventDefault();
      clearForm();
    });
  }

  if (yearNode) yearNode.textContent = new Date().getFullYear();

  StoriesDB.initialize();
  renderTable();
  renderStats();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('storyId').value;
    const storyData = {
      title: document.getElementById('title').value.trim(),
      shortDescription: document.getElementById('shortDescription').value.trim(),
      content: document.getElementById('fullContent').value.trim(),
      image: document.getElementById('image').value.trim() || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      category: document.getElementById('categorySelect').value,
      author: document.getElementById('author').value.trim() || 'StoryNest',
      date: document.getElementById('date').value || new Date().toISOString().slice(0, 10)
    };

    if (id) {
      StoriesDB.updateStory(Number(id), storyData);
      alert('Story updated successfully.');
    } else {
      StoriesDB.addStory(storyData);
      alert('Story added successfully.');
    }

    renderTable();
    renderStats();
    clearForm();
  });

  generateButton.addEventListener('click', () => {
    const prompt = aiPrompt.value.trim() || 'A curious animal journey';
    const category = aiCategory.value;
    const author = aiAuthor.value.trim() || 'StoryNest AI';
    const draft = generateMockStory(prompt, category, author);
    StoriesDB.addStory(draft);

    aiOutput.innerHTML = `
      <h3>${escapeHtml(draft.title)}</h3>
      <p>${escapeHtml(draft.shortDescription)}</p>
      <pre>${escapeHtml(draft.content)}</pre>
    `;
    window.latestAIDraft = draft;
    renderTable();
    renderStats();
    alert('AI-generated story saved and available immediately.');
  });

  fillFormButton.addEventListener('click', () => {
    const draft = window.latestAIDraft || generateMockStory('An inspiring story draft', aiCategory.value, aiAuthor.value.trim() || 'StoryNest AI');
    populateForm(draft);
    alert('The form has been filled with a draft story.');
  });

  window.addEventListener('storiesChanged', () => {
    renderTable();
    renderStats();
  });

  function generateMockStory(prompt, category, author) {
    const title = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${prompt}`;
    const shortDescription = `A ${category} story about ${prompt.toLowerCase()}`;
    const content = `Once upon a time, there was an intriguing ${category} tale waiting to be told. This story centers around the theme of ${prompt.toLowerCase()}.

The narrative unfolds with mystery and wonder. In a world where ${prompt.toLowerCase()} takes center stage, characters must navigate through challenges and revelations. 

The first challenge emerges swiftly. Our protagonist discovers something unexpected about ${prompt.toLowerCase()}, forcing them to reconsider everything they knew. This moment of realization becomes the turning point of the entire journey.

As the story progresses, new companions appear along the way. Each brings unique perspectives and skills that prove invaluable. Together, they uncover deeper truths about the world around them and the meaning of ${prompt.toLowerCase()}.

The climax arrives with unexpected intensity. Stakes are raised higher than ever before. Every decision matters now. The characters must use all their combined wisdom and courage to face what lies ahead.

In the end, transformation occurs. Not just for the characters, but for the world itself. The journey through ${prompt.toLowerCase()} has changed everything. Lessons learned echo far and wide, inspiring others to embark on their own adventures.

This is more than just a story—it's a testament to the power of discovery, resilience, and the bonds formed through shared experience. The tale of ${prompt.toLowerCase()} will be remembered for generations to come, reminding all who hear it that within every challenge lies an opportunity for growth and wonder.`;
    
    return {
      title,
      shortDescription,
      content,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
      category,
      author,
      date: new Date().toISOString().slice(0, 10)
    };
  }

  function renderTable() {
    const tbody = document.querySelector('#storiesTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const stories = StoriesDB.getStories();
    stories.forEach((story) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${story.id}</td>
        <td>${escapeHtml(story.title)}</td>
        <td>${escapeHtml(story.category)}</td>
        <td>${escapeHtml(story.author)}</td>
        <td>${escapeHtml(story.date)}</td>
        <td class="actions-cell">
          <button class="btn small" data-action="edit" data-id="${story.id}">Edit</button>
          <button class="btn small danger" data-action="delete" data-id="${story.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button[data-action="edit"]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        const story = StoriesDB.getStoryById(id);
        if (story) populateForm(story);
      });
    });

    tbody.querySelectorAll('button[data-action="delete"]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        if (!confirm('Delete this story?')) return;
        StoriesDB.deleteStory(id);
        renderTable();
        renderStats();
      });
    });
  }

  function populateForm(story) {
    document.getElementById('storyId').value = story.id || '';
    document.getElementById('title').value = story.title || '';
    document.getElementById('shortDescription').value = story.shortDescription || '';
    document.getElementById('fullContent').value = story.content || '';
    document.getElementById('image').value = story.image || '';
    document.getElementById('categorySelect').value = story.category || 'featured';
    document.getElementById('author').value = story.author || 'StoryNest';
    document.getElementById('date').value = story.date || new Date().toISOString().slice(0, 10);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearForm() {
    form.reset();
    document.getElementById('storyId').value = '';
  }

  function renderStats() {
    const stories = StoriesDB.getStories();
    if (storyCountNode) storyCountNode.textContent = stories.length;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
