function changeContent(section) {
  const content = document.getElementById("main-content");

  switch (section) {
    case "Plot":
      content.innerHTML = /*html*/ `
        <h1>Plot</h1>
        <p>The game takes place in a post-apocalyptic futuristic haven known as New Eridu. 
        Large pocket dimensions called Hollows plague the world, engulfing the land and spawning hostile 
        monsters called Ethereals, who have wreaked havoc on humanity. After the fall of Eridu, a group 
        of survivors established a bastion against the invaders known as New Eridu. The group survived 
        the oncoming onslaught by extracting a substance called Ether from the Hollows, which is used as 
        a potent energy source. <br> Several factions are present in the game. The Cunning Hares, formally 
         as Gentle House, is an “odd jobs” agency from which the player obtains their first four agents. 
         Belobog Heavy Industries and Victoria Housing Co specialize in construction and housekeeping, respectively. 
         Hollow Special Operations Section 6 is a frontline unit of Hollow Special Operations, which is based in 
         the original Eridu location. The Criminal Investigation Special Response Team is a branch of New Eridu 
         Public Security. Lastly, the Sons of Calydon is a biker gang. <br> The story follows Phaethon, 
         two siblings who work as Proxies on Sixth Street in New Eridu. The siblings possess a special technology 
         known as the Hollow Deep Dive System, which allows them to remotely monitor and navigate Agents within 
         Hollows through the use of a Bangboo.</p>`;
      break;

    case "Fractions":
      content.innerHTML = "<h1>Fractions</h1><p></p>";
      break;

    case "Characters":
      content.innerHTML = /*html*/ `
        <div class="filters">
          <select id="filter-element" onchange="applyFilters()">
            <option value="">All Elements</option>
            <option value="Ether">Ether</option>
            <option value="FireZ">Fire</option>
            <option value="IceZ">Ice</option>
            <option value="Electric">Electric</option>
            <option value="PhysicalZ">Physical</option>
            <option value="Imaginary">Imaginary</option>
          </select>
          <select id="filter-specification" onchange="applyFilters()">
            <option value="">All Specifications</option>
            <option value="Anomaly">Anomaly</option>
            <option value="Attack">Attack</option>
            <option value="Defence">Defence</option>
            <option value="Stun">Stun</option>
            <option value="Support">Support</option>
          </select>
          <select id="filter-stars" onchange="applyFilters()">
            <option value="">All Stars</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
          </select>
            <select id="filter-fraction" onchange="applyFilters()">
            <option value="">All Fractions</option>
            <option value="Belobog Heavy Industries">Belobog Heavy Industries</option>
            <option value="Criminal Investigation Team">Criminal Investigation Team</option>
            <option value="Cunning Hares">Cunning Hares</option>
            <option value="Obol Squad">Obol Squad</option>
            <option value="Section 6">Section 6</option>
            <option value="Sons of Calydon">Sons of Calydon</option>
            <option value="Victoria Housekeeping">Victoria Housekeeping</option>
          </select>

        </div>
        <div id="character-grid" class="row"></div>
      `;

      fetch("/charactersZZZ")
        .then((response) => response.json())
        .then((data) => {
          // Сохраняем данные для фильтрации
          window.characterDataZZZ = data;
          renderCharacterGridZZZ(data);
        })
        .catch((error) => {
          console.error("Error loading characters:", error);
        });
      break;

    default:
      content.innerHTML = "<h1>Welcome</h1><p>This is the default content.</p>";
  }
}

function renderCharacterGridZZZ(data) {
  const grid = document.getElementById("character-grid");
  let characterGrid = "";

  data.forEach((character) => {
    characterGrid += `
      


          <div class="col-6 col-md-3 mb-4">
                    <div class="character-card">
                      
                      <img src="/images/characters/${character.name}.png" alt="${character.name}" class="img-fluid" style="width: 200px; height: 200px; object-fit: cover;">
                      <div class="character-info">
                        <img src="/images/elements/${character.element}.png" alt="${character.element}" class="img-fluid">
                        <img src="/images/specification/${character.specification}.png" alt="${character.specification}" class="img-fluid">
                        <img src="/images/stars/${character.stars}.png" alt="${character.stars}" class="img-fluid">
                      </div>
                    </div>
                </div>`;





  });

  grid.innerHTML = characterGrid;
}

function applyFilters() {
  const element = document.getElementById("filter-element").value;
  const specification = document.getElementById("filter-specification").value;
  const stars = document.getElementById("filter-stars").value;
  const fraction = document.getElementById("filter-fraction").value;

  const filteredData = window.characterDataZZZ.filter((character) => {
    return (
      (!element || character.element === element) &&
      (!specification || character.specification === specification) &&
      (!stars || character.stars.toString() === stars) &&
      (!fraction || character.fraction === fraction)
    );
  });

  renderCharacterGridZZZ(filteredData);
}
