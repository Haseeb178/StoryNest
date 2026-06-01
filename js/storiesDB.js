window.StoriesDB = (function () {
  const STORAGE_KEY = 'storynest_stories';

  const defaultStories = [
    { "id": 1, "title": "The Lion and the Mouse", "shortDescription": "A timeless fable about kindness and unexpected friendships.", "content": "Once upon a time, a mighty lion spared a small mouse. Later, the mouse repaid the favor by freeing the lion from a hunter's net, teaching that true strength includes mercy.", "image": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d", "category": "animals", "author": "Aesop", "date": "2020-01-05" },
    { "id": 2, "title": "Five Facts About Space", "shortDescription": "Surprising truths from the far reaches of the universe.", "content": "Space is vast and full of wonders. There are more stars than grains of sand on every beach. Black holes warp time. Planets have storm systems larger than entire countries. Light from distant galaxies can take millions of years to reach our eyes.", "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa", "category": "facts", "author": "Nova", "date": "2021-07-10" },
    { "id": 3, "title": "Why Dolphins Are So Smart", "shortDescription": "A graceful look at remarkable dolphin intelligence.", "content": "Dolphins are playful, social animals with rich communication skills. They solve puzzles, use tools, and cooperate to hunt. Their brains have large complex folds, and they show behavior that hints at self-awareness. In coastal waters and ocean habitats, dolphins surprise scientists by learning quickly and supporting their pod mates.", "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", "category": "animals", "author": "Marin", "date": "2022-02-22" },
    { "id": 4, "title": "A Peacock's Brilliant Display", "shortDescription": "How nature creates dazzling color without pigments.", "content": "A peacock's tail feathers shimmer with blue, green, and gold. The effect comes from tiny structures that reflect light, not from ordinary pigments. When a peacock fans its magnificent tail, it makes a bold signal to potential mates while telling a story about survival, beauty, and the science behind color.", "image": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", "category": "animals", "author": "Ezra", "date": "2020-11-11" },
    { "id": 5, "title": "The Secret Life of Ants", "shortDescription": "Tiny farmers shaping their own underground world.", "content": "Ants build complex networks beneath our feet. Some grow fungus gardens. Others herd aphids like cattle. Their colonies work together with division of labor, and each tiny individual plays a powerful role in the insect kingdom.", "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98", "category": "facts", "author": "Ento", "date": "2019-05-01" },
    { "id": 6, "title": "Hidden Wonders of the Ocean", "shortDescription": "A deep dive into mysterious sea life and glowing currents.", "content": "The ocean hides glowing creatures, towering coral forests, and thermal vents that sustain life in endless darkness. With every dive, explorers discover strange ecosystems full of stunning adaptation and surprising resilience.", "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836", "category": "featured", "author": "Coral", "date": "2023-06-16" },
    { "id": 7, "title": "How Penguins Survive", "shortDescription": "Adaptations that keep penguins warm in icy worlds.", "content": "Penguins thrive on cold shores because they huddle for warmth and keep moisture out with dense feathers. Their bodies store energy for long swims, and their group behavior protects them against harsh storms.", "image": "https://images.unsplash.com/photo-1543782429-8b6b6b0d9eab", "category": "animals", "author": "Polar", "date": "2022-12-08" },
    { "id": 8, "title": "Ten Tiny Truths", "shortDescription": "Short facts that spark curiosity and wonder.", "content": "Water can boil and freeze at the same time under special conditions. Honey never spoils. Octopuses have three hearts. Bananas are berries, but strawberries are not. The sound of waves is shaped by both wind and shore.", "image": "https://images.unsplash.com/photo-1526378728256-3f3c6f5f5b57", "category": "facts", "author": "Factoid", "date": "2021-03-03" },
    { "id": 9, "title": "Urban Foxes and Their Lives", "shortDescription": "A city tale of clever foxes and nightly adaptation.", "content": "Foxes slip through alleys and green patches inside urban jungles. They learn the rhythm of city life, hunt around streetlights, and use trash bins as easy food sources. Their stories reveal how wildlife can adapt to human-made landscapes.", "image": "https://images.unsplash.com/photo-1504198458649-3128b932f49b", "category": "trending", "author": "CityWild", "date": "2024-01-20" },
    { "id": 10, "title": "Stars That Shouldn't Exist", "shortDescription": "Mysteries that stretch the limits of astronomy.", "content": "Astronomers occasionally find stars that do not fit our models. Some are too massive, others spin too fast, and a few seem to have formed from unusual debris. These odd stars inspire new theories and fresh wonder.", "image": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", "category": "featured", "author": "Stellar", "date": "2020-09-09" },
    { "id": 11, "title": "The Tiny Elephant Story", "shortDescription": "A small elephant's journey toward the herd.", "content": "A baby elephant wandered away from its herd and discovered rugged terrain, new friends, and a surprising courage. Along the way, it learned how family and memory can guide even the smallest travelers.", "image": "https://images.unsplash.com/photo-1518837695005-2083093ee35b", "category": "trending", "author": "Safari", "date": "2024-02-18" },
    { "id": 12, "title": "How Bees Communicate", "shortDescription": "The waggle dance explained in simple terms.", "content": "Bees tell one another where the best flowers are by dancing inside the hive. The faster the dance, the closer the food. This elegant communication helps them navigate the world without words.", "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6", "category": "facts", "author": "Apian", "date": "2018-08-08" },
    { "id": 13, "title": "The Courageous Sparrow", "shortDescription": "A small bird with a big heart and clever tricks.", "content": "A sparrow outwits predators by weaving through branches and using its speed. Its courage reminds readers that size is not the measure of bravery.", "image": "https://images.unsplash.com/photo-1501706362039-c6e8090b6f6f", "category": "animals", "author": "Wing", "date": "2019-09-12" },
    { "id": 14, "title": "Glass Flowers and Their Origins", "shortDescription": "The surprising story behind transparent plant evolution.", "content": "Some plants have evolved nearly invisible leaves and petals to hide from hungry insects. Their glass-like surfaces help them survive in bright, dangerous environments.", "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6", "category": "featured", "author": "Bloom", "date": "2021-10-04" },
    { "id": 15, "title": "Rivers That Flow Backwards", "shortDescription": "A look at nature's strange hydrology.", "content": "Under certain conditions, strong tides and local landscape can cause rivers to reverse direction. These backward flows appear in coastal estuaries and make scientists marvel at water's power.", "image": "https://images.unsplash.com/photo-1501785888041-af3ef285b470", "category": "facts", "author": "Hydra", "date": "2019-04-22" },
    { "id": 16, "title": "Falcon's Flight", "shortDescription": "Speed, focus, and the art of a hunt from above.", "content": "A falcon drops from the sky in perfect silence and reaches incredible speeds. Every motion is precise, and every dive tells a story of predator and prey in the world above.", "image": "https://images.unsplash.com/photo-1516876901458-6c3f8cfa3f4b", "category": "trending", "author": "Sky", "date": "2024-03-12" },
    { "id": 17, "title": "The Lost Kitten", "shortDescription": "A heartwarming rescue that finds a new home.", "content": "A tiny kitten wanders into a neighborhood and touches the lives of everyone it meets. Through a series of kind strangers, the cat finds the safety and love it needs.", "image": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", "category": "featured", "author": "Neighbor", "date": "2022-06-06" },
    { "id": 18, "title": "The Old Oak's Secrets", "shortDescription": "What tree rings reveal about time and weather.", "content": "Tree rings are nature's diary. Each band records a year of rain, drought, and growth. The oldest oaks hold secrets that span centuries.", "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", "category": "featured", "author": "Arbor", "date": "2017-05-30" },
    { "id": 19, "title": "Octopus Architects", "shortDescription": "Clever cephalopods building shelter from shells.", "content": "Octopuses carry coconut shells and rocks to build cozy dens. Their intelligence is visible in every clever move they make, and their creativity surprises ocean researchers.", "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", "category": "animals", "author": "Deep", "date": "2020-10-10" },
    { "id": 20, "title": "The Midnight Meteor Shower", "shortDescription": "A night when the sky becomes a glowing river.", "content": "In a quiet town, meteors streak through the sky like falling stars. People gather on blankets to watch the rare meteor shower blaze across the dark, cold night.", "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa", "category": "trending", "author": "Night", "date": "2023-12-01" }
  ];

  let stories = [];
  let initialized = false;

  function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  function loadFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn('StoriesDB: invalid localStorage data', error);
      return null;
    }
  }

  function generateNextId() {
    if (!stories.length) return 1;
    return Math.max(...stories.map(s => Number(s.id) || 0)) + 1;
  }

  function initialize() {
    if (initialized) return;
    initialized = true;

    const stored = loadFromLocalStorage();
    if (Array.isArray(stored) && stored.length) {
      stories = stored;
    } else {
      stories = JSON.parse(JSON.stringify(defaultStories));
      saveToLocalStorage();
    }
  }

  function getStories() {
    if (!initialized) initialize();
    return stories.slice();
  }

  function getStoryById(id) {
    if (!initialized) initialize();
    return stories.find(s => String(s.id) === String(id)) || null;
  }

  function addStory(data) {
    if (!initialized) initialize();
    const story = Object.assign({}, data, { id: generateNextId() });
    stories.unshift(story);
    saveToLocalStorage();
    window.dispatchEvent(new Event('storiesChanged'));
    return story;
  }

  function updateStory(id, data) {
    if (!initialized) initialize();
    const index = stories.findIndex(s => String(s.id) === String(id));
    if (index === -1) return null;
    stories[index] = Object.assign({}, stories[index], data);
    saveToLocalStorage();
    window.dispatchEvent(new Event('storiesChanged'));
    return stories[index];
  }

  function deleteStory(id) {
    if (!initialized) initialize();
    const initialLength = stories.length;
    stories = stories.filter(s => String(s.id) !== String(id));
    if (stories.length < initialLength) {
      saveToLocalStorage();
      window.dispatchEvent(new Event('storiesChanged'));
      return true;
    }
    return false;
  }

  function seedStories() {
    if (!initialized) initialize();
    if (stories.length) return;
    stories = JSON.parse(JSON.stringify(defaultStories));
    saveToLocalStorage();
    window.dispatchEvent(new Event('storiesChanged'));
  }

  return {
    initialize,
    getStories,
    getStoryById,
    addStory,
    updateStory,
    deleteStory,
    seedStories
  };
})();

StoriesDB.initialize();
