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
      content.innerHTML = /*html*/ `
          <h1>Teyvat</h1>
          <p>Explore the different regions of Teyvat, each with its unique culture and mysteries.</p>
          <div class="regions">
          <button class="region-btn" data-region="Mondstadt"><img src="Mondstadt.png" class="region-image"></button>          
          <button class="region-btn" data-region="Liyue"><img src="Liyue.png" class="region-image"></button>
          <button class="region-btn" data-region="Inazuma"><img src="Inazuma.png" class="region-image"></button>
          <button class="region-btn" data-region="Sumeru"><img src="Sumeru.png" class="region-image"></button>
          <button class="region-btn" data-region="Fontaine"><img src="Fontaine.png" class="region-image"></button>
          <button class="region-btn" data-region="Natlan"><img src="Natlan.png" class="region-image"></button>
          </div>
          <div id="region-content" class="region-content"></div>
        `;

      // Attach click event for each region button
      const regionButtons = document.querySelectorAll(".region-btn");
      regionButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const region = this.dataset.region;

          let regionText = "";
          if (region === "Mondstadt") {
            regionText =
              "<h3>Mondstadt</h3><p>Mondstadt is one of the seven regions of Teyvat, and the first in which the Traveler starts to look for their lost sibling. It is the nation that worships Lord Barbatos, the Anemo Archon and God of Freedom.</p>";
          } else if (region === "Liyue") {
            regionText =
              "<h3>Liyue</h3><p>Liyue is one of the seven regions of Teyvat. It is the nation that worships Rex Lapis, the Geo Archon and God of Contracts.</p>";
          } else if (region === "Inazuma") {
            regionText =
              "<h3>Inazuma</h3><p>Inazuma is one of the seven regions of Teyvat. It is an archipelagic region that worships Raiden Shogun, the Electro Archon and God of Eternity — who is also the leader of its governing body, the Inazuma Shogunate.</p>";
          } else if (region === "Sumeru") {
            regionText =
              "<h3>Sumeru</h3><p>Sumeru is one of the seven regions of Teyvat. It is the nation that worships Lesser Lord Kusanali, the Dendro Archon and God of Wisdom. It is renowned as Teyvat's center of learning for housing the Sumeru Akademiya.</p>";
          } else if (region === "Fontaine") {
            regionText =
              "<h3>Fontaine</h3><p>Fontaine is one of the seven regions of Teyvat. It is the nation that worshipped Focalors, the Hydro Archon and God of Justice.</p>";
          } else if (region === "Natlan") {
            regionText =
              "<h3>Natlan</h3><p>Natlan is one of the seven regions of Teyvat. It is the nation that worships Mavuika, the Pyro Archon and God of War.</p>";
          }

          // Update the content of the region content area
          const regionContent = document.getElementById("region-content");
          regionContent.innerHTML = regionText;

          // Slide the region content in or out
          $(regionContent).stop(true, true).slideToggle(); // stop any ongoing animations and toggle visibility
        });
      });

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
          content.innerHTML =
            "<p>Failed to load characters. Please try again later.</p>";
        });
      break;
  }
}

// Функция для рендеринга персонажей
function renderCharacters(data) {
  const grid = document.getElementById("character-grid");
  grid.innerHTML = ""; // Очищаем сетку

  const characterHTML = data
    .map((character) => {
      return /*html*/ `
        <div class="col-6 col-md-3 mb-4"                 
              data-bs-toggle="popover"
              data-bs-placement="auto" 
              data-bs-boundary="window" 
              data-bs-trigger="hover focus"
              title="${character.name}"
              data-bs-content="<img src='/images/guides/${character.name}.png' >">
                        <div class="character-info">
          <img src="/images/characters/${character.name}.png" alt="${character.name}" class="img-fluid">
            <img src="/images/stars/${character.stars}.png" alt="${character.stars}" class="img-fluid"><br>
            <img src="/images/elements/${character.element}.png" alt="${character.element}" class="img-fluid" style="width: 50px; height: 50px; object-fit: cover;">
            <img src="/images/weapons/${character.weapon}.png" alt="${character.weapon}" class="img-fluid" style="width: 50px; height: 50px; object-fit: cover;">
          </div>
        </div>`;
    })
    .join("");

  grid.innerHTML = characterHTML;

  // Инициализация popovers после добавления контента
  var popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  popoverTriggerList.forEach((popoverTrigger) => {
    new bootstrap.Popover(popoverTrigger, {
      html: true,
      fallbackPlacements: ["top", "left", "right", "bottom"],
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
