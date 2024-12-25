function changeContent(section) {
  const content = document.getElementById("main-content");

  switch (section) {
    case "Plot":
      content.innerHTML = /*html*/ `
        <h1>Plot</h1>
        <p>
          Aether and Lumine, a pair of twins who travel across different
          worlds, land in Teyvat. Witnessing the destruction of Khaenri'ah
          upon their arrival, the two attempt to flee, but they soon find
          their path blocked by a mysterious god who calls herself the
          "Sustainer of Heavenly Principles". She separates the twins, sealing
          the playable character away for five hundred years. When the sealed
          sibling, now called "The Traveler", wakes up, they meet a small
          fairy-like being named Paimon, who becomes their companion and
          travel guide. The two set off on a journey across Teyvat to gather
          information about their lost twin from each nation's ruling Archon.
        </p>
      `;
      break;

    case "Regions":
      content.innerHTML = "<h1>Teyvat</h1><p>Explore the different regions of Teyvat, each with its unique culture and mysteries.</p>";
      break;

    case "Characters":
      // Добавляем фильтры
      content.innerHTML = /*html*/ `
        <div>
          <div class="filters">
            <select id="filter-element" onchange="applyFilters()">
              <option value="">All Elements</option>
              <option value="Anemo">Anemo</option>
              <option value="Geo">Geo</option>
              <option value="Pyro">Pyro</option>
              <option value="Hydro">Hydro</option>
              <option value="Cryo">Cryo</option>
              <option value="Electro">Electro</option>
              <option value="Dendro">Dendro</option>
            </select>
            <select id="filter-stars" onchange="applyFilters()">
              <option value="">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
            </select>
            <select id="filter-weapon" onchange="applyFilters()">
              <option value="">All Weapons</option>
              <option value="Sword">Sword</option>
              <option value="Claymore">Claymore</option>
              <option value="Polearm">Polearm</option>
              <option value="Bow">Bow</option>
              <option value="Catalyst">Catalyst</option>
            </select>
            <select id="filter-region" onchange="applyFilters()">
              <option value="">All Regions</option>
              <option value="Mondstadt">Mondstadt</option>
              <option value="Liyue">Liyue</option>
              <option value="Inazuma">Inazuma</option>
              <option value="Sumeru">Sumeru</option>
              <option value="Fontaine">Fontaine</option>
              <option value="Natlan">Natlan</option>
              <option value="Snezhnaya">Snezhnaya</option>
            </select>
          </div>
          <div id="character-grid" class="row"></div>
        </div>
      `;

      // Загружаем персонажей
      fetch("/characters")
        .then((response) => response.json())
        .then((data) => {
          // Сохраняем данные для фильтрации
          window.characterData = data;
          renderCharacters(data);
        })
        .catch((error) => {
          console.error("Error loading characters:", error);
          content.innerHTML = "<p>Failed to load characters. Please try again later.</p>";
        });
      break;

    default:
      content.innerHTML = "<h1>Welcome</h1><p>This is the default content.</p>";
  }
}

// Функция для рендеринга персонажей
const IMAGE_WIDTH = 100; // Ширина изображения
const IMAGE_HEIGHT = 50; // Высота изображения

function renderCharacters(data) {
  const grid = document.getElementById("character-grid");
  grid.innerHTML = ""; // Очищаем сетку

  const characterHTML = data
    .map((character) => {
      return /*html*/ `
        <div class="col-6 col-md-3 mb-4"                 
              data-bs-toggle="popover" 
              data-bs-placement="top" 
              title="${character.name}"
              data-bs-content="<img src='/images/guides/${character.name}.png' class='guide' >">
          <img src="/images/characters/${character.name}.png" alt="${character.name}" class="img-fluid">
          <div class="character-info">
            <img src="/images/stars/${character.stars}.png" alt="${character.stars}" class="img-fluid" style="align-items: center;"><br>
            <img src="/images/elements/${character.element}.png" alt="${character.element}" class="img-fluid">
            <img src="/images/weapons/${character.weapon}.png" alt="${character.weapon}" class="img-fluid" style="width: 50px; height: 50px; object-fit: cover;">
          </div>
        </div>
      `;
    })
    .join("");

  grid.innerHTML = characterHTML;

  // Инициализация popovers после добавления контента
  var popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverTriggerList.forEach((popoverTrigger) => {
    new bootstrap.Popover(popoverTrigger, {
      html: true,
    });
  });
}


// Применение фильтров
function applyFilters() {
  const element = document.getElementById("filter-element").value;
  const stars = document.getElementById("filter-stars").value;
  const weapon = document.getElementById("filter-weapon").value;
  const region = document.getElementById("filter-region").value;

  // Проверяем наличие данных перед фильтрацией
  const filteredData = (window.characterData || []).filter((character) => {
    return (
      (!element || character.element === element) &&
      (!stars || character.stars == stars) &&
      (!weapon || character.weapon === weapon) &&
      (!region || character.region === region)
    );
  });

  // Рендерим отфильтрованных персонажей
  renderCharacters(filteredData);
}
