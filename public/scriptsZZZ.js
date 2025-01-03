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
      content.innerHTML = `
      <h1>Factions</h1>
      <p>Explore the different factions in New-Eridu.</p>
      <div class="factions">
      <button class="faction-btn" data-faction="Random Play"><img src="Random Play.png" class="faction-image"></button>          
      <button class="faction-btn" data-faction="Cunning Hares"><img src="Cunning Hares.png" class="faction-image"></button>
      <button class="faction-btn" data-faction="Belobog"><img src="Belobog.png" class="faction-image"></button>
      <button class="faction-btn" data-faction="Neps"><img src="Neps.png" class="faction-image"></button>
      <button class="faction-btn" data-faction="Obol Squad"><img src="Obol_Squad.png" class="faction-image"></button>
      <button class="faction-btn" data-faction="Section 6"><img src="Section 6.png" class="faction-image"></button>
      <button class="faction-btn" data-faction="Sons of Calydon"><img src="Sons_of_Calydon.png" class="faction-image"></button>
      <button class="faction-btn" data-faction="Victoria Housekeeping"><img src="Victoria.png" class="faction-image"></button>
      </div>
      <div id="faction-content" class="faction-content"></div>
    `;

      // Attach click event for each location button
      const factionButtons = document.querySelectorAll(".faction-btn");
      factionButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const faction = this.dataset.faction;

          let factionText = "";
          if (faction === "Random Play") {
            factionText =
              "<h3>Random Play</h3><p>Random Play is a District in Zenless Zone Zero. It is operated by the sibling duo of Wise and Belle, the main protagonists of Zenless Zone Zero, and serves as both their living accommodation and main base of operations.</p>";
          } else if (faction === "Cunning Hares") {
            factionText =
              "<h3>Cunning Hares</h3><p>The Cunning Hares, officially Gentle House, is a human resource dispatch agency and a faction in Zenless Zone Zero. It was founded by Nicole Demara.</p>";
          } else if (faction === "Belobog") {
            factionText =
              "<h3>Belobog Heavy Industries</h3><p>Belobog Heavy Industries is a faction in Zenless Zone Zero. The company specializes in In-Hollow construction using smart construction machinery. Before Koleda became president, her father, Khor Belobog was the president of the company. After his disappearance, Belobog's public image took a negative hit.</p>";
          } else if (faction === "Neps") {
            factionText =
              "<h3>Criminal Investigation Special Response Team</h3><p>The Criminal Investigation Special Response Team is a team within New Eridu Public Security.</p>";
          } else if (faction === "Obol Squad") {
            factionText =
              "<h3>Obol Squad</h3><p>Obol Squad is a faction in Zenless Zone Zero. It is tied to the New Eridu Defense Force Obsidian Division, and Defense Force Sergeant Soldier 11 is the head of the squad.</p>";
          } else if (faction === "Section 6") {
            factionText =
              "<h3>Hollow Special Operations Section 6</h3><p>Hollow Special Operations Section 6, abbreviated as H.S.O.S.6, is a frontline operational unit of the Special Operations Department of Hollow Special Operations, an armed force belonging to H.A.N.D.. It was single-handedly established by Hoshimi Miyabi.</p>";
          } else if (faction === "Sons of Calydon") {
            factionText =
              "<h3>Sons of Calydon</h3><p>Sons of Calydon is a faction in Zenless Zone Zero. <br> Sons of Calydon is a biker gang that lives on the Outer Ring of New Eridu, led by Caesar King.</p>";
          } else if (faction === "Victoria Housekeeping") {
            factionText =
              "<h3>Victoria Housekeeping</h3><p>Victoria Housekeeping Co. is a housekeeping agency and a faction in Zenless Zone Zero.</p>";
          }
          // Update the content of the location content area
          const factionContent = document.getElementById("faction-content");
          factionContent.innerHTML = factionText;

          // Slide the region content in or out
          $(factionContent).stop(true, true).slideToggle(); // stop any ongoing animations and toggle visibility
        });
      });
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
            <option value="">All Factions</option>
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
  }
}

function renderCharacterGridZZZ(data) {
  const grid = document.getElementById("character-grid");
  grid.innerHTML = "";

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
              <img src="/images/characters/${character.name}.png" alt="${character.name}" class="img-fluid" style="width: 120px; height: 170px; object-fit: cover;"><br>
                <img src="/images/stars/${character.stars}.png" alt="${character.stars}" class="img-fluid"><br>
                <img src="/images/elements/${character.element}.png" alt="${character.element}" class="img-fluid" style="width: 50px; height: 50px; object-fit: cover;">
                <img src="/images/specification/${character.specification}.png" alt="${character.specification}" class="img-fluid" style="width: 50px; height: 50px; object-fit: cover;">
                    </div>
                </div>`;
    })
    .join("");

  grid.innerHTML = characterHTML;

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
