// Test if script is loading
console.log("Script loaded successfully!");

// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded - Initializing event listeners");

  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".content-section");

  console.log("Found nav buttons:", navButtons.length);
  console.log("Found content sections:", sections.length);

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Nav button clicked:", button);
      const targetSection = button.getAttribute("data-section");
      console.log("Target section:", targetSection);

      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      // Show target section
      document.getElementById(targetSection).classList.add("active");

      // Update active nav button
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Pet interaction functionality
  const petCards = document.querySelectorAll(".pet-card");
  console.log("Found pet cards:", petCards.length);

  // Debug: Let's also try to find buttons directly
  const allFeedBtns = document.querySelectorAll(".feed-btn");
  const allPlayBtns = document.querySelectorAll(".play-btn");
  const allSleepBtns = document.querySelectorAll(".sleep-btn");
  console.log(
    "Direct button search - Feed:",
    allFeedBtns.length,
    "Play:",
    allPlayBtns.length,
    "Sleep:",
    allSleepBtns.length
  );

  petCards.forEach((card, index) => {
    console.log(`Processing pet card ${index + 1}:`, card);

    const feedBtn = card.querySelector(".feed-btn");
    const playBtn = card.querySelector(".play-btn");
    const sleepBtn = card.querySelector(".sleep-btn");
    const petAvatar = card.querySelector(".pet-avatar");

    console.log(`Card ${index + 1} elements:`, {
      feedBtn: !!feedBtn,
      playBtn: !!playBtn,
      sleepBtn: !!sleepBtn,
      petAvatar: !!petAvatar,
    });

    // Check if all required elements exist
    if (!feedBtn || !playBtn || !sleepBtn || !petAvatar) {
      console.error("Missing required elements in pet card:", card);
      return;
    }

    console.log(`Adding event listeners to card ${index + 1}`);

    // Remove the test onclick handlers since buttons are working now

    feedBtn.addEventListener("click", () => {
      console.log("Feed button clicked for:", card);
      petAvatar.style.transform = "scale(1.2)";
      setTimeout(() => {
        petAvatar.style.transform = "scale(1)";
      }, 300);

      showMessage("Yummy! 🍖");
      updateHappiness(card, 10);
    });

    playBtn.addEventListener("click", () => {
      console.log("Play button clicked for:", card);
      petAvatar.style.animation = "none";
      setTimeout(() => {
        petAvatar.style.animation = "bounce 0.5s ease-in-out 3";
      }, 10);

      showMessage("Woof! So fun! 🎾");
      updateHappiness(card, 15);
      updateEnergy(card, -10); // Playing uses energy
    });

    sleepBtn.addEventListener("click", () => {
      console.log("Sleep button clicked for:", card);
      petAvatar.style.opacity = "0.5";
      setTimeout(() => {
        petAvatar.style.opacity = "1";
      }, 2000);

      showMessage("Zzz... 😴");
      updateEnergy(card, 20); // Sleep should restore energy
    });
  });

  // Shop functionality
  const buyButtons = document.querySelectorAll(".buy-btn");
  console.log("Found buy buttons:", buyButtons.length);

  buyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Buy button clicked:", button);
      const item = e.target.closest(".shop-item");

      if (!item) {
        console.error("Could not find shop item for button:", button);
        return;
      }

      const itemNameElement = item.querySelector(".item-name");
      if (!itemNameElement) {
        console.error("Could not find item name element:", item);
        return;
      }

      const itemName = itemNameElement.textContent;

      button.textContent = "Purchased!";
      button.style.background = "rgba(72, 187, 120, 0.8)";

      setTimeout(() => {
        button.textContent = "Buy Now";
        button.style.background = "rgba(255,255,255,0.2)";
      }, 2000);

      showMessage(`You bought ${itemName}! 🛍️`);
    });
  });

  // Add new pet functionality
  const addPetBtn = document.querySelector(".add-pet-btn");
  const petGrid = document.querySelector(".pet-grid");

  console.log("Add pet button found:", !!addPetBtn);
  console.log("Pet grid found:", !!petGrid);

  if (!addPetBtn || !petGrid) {
    console.error("Missing add pet button or pet grid elements");
    return;
  }

  addPetBtn.addEventListener("click", () => {
    console.log("Add pet button clicked");
    const petEmojis = ["🐰", "🐹", "🐦", "🐠", "🐢", "🦔"];
    const petNames = [
      "Whiskers",
      "Nibbles",
      "Chirpy",
      "Bubbles",
      "Shelly",
      "Spike",
    ];

    const randomEmoji = petEmojis[Math.floor(Math.random() * petEmojis.length)];
    const randomName = petNames[Math.floor(Math.random() * petNames.length)];

    const newPetCard = createPetCard(randomEmoji, randomName);
    petGrid.appendChild(newPetCard);

    showMessage(`Welcome ${randomName}! 🎉`);

    // Add event listeners to new pet
    addPetEventListeners(newPetCard);
  });

  function createPetCard(emoji, name) {
    const petCard = document.createElement("div");
    petCard.className = "pet-card";
    petCard.innerHTML = `
            <div class="pet-avatar">${emoji}</div>
            <h3 class="pet-name">${name}</h3>
            <div class="pet-stats">
                <div class="stat">
                    <span class="stat-label">Happiness:</span>
                    <div class="stat-bar"><div class="stat-fill" style="width: 50%"></div></div>
                </div>
                <div class="stat">
                    <span class="stat-label">Energy:</span>
                    <div class="stat-bar"><div class="stat-fill" style="width: 70%"></div></div>
                </div>
            </div>
            <div class="pet-actions">
                <button class="action-btn feed-btn">Feed</button>
                <button class="action-btn play-btn">Play</button>
                <button class="action-btn sleep-btn">Sleep</button>
            </div>
        `;
    return petCard;
  }

  function addPetEventListeners(card) {
    const feedBtn = card.querySelector(".feed-btn");
    const playBtn = card.querySelector(".play-btn");
    const sleepBtn = card.querySelector(".sleep-btn");
    const petAvatar = card.querySelector(".pet-avatar");

    feedBtn.addEventListener("click", () => {
      petAvatar.style.transform = "scale(1.2)";
      setTimeout(() => (petAvatar.style.transform = "scale(1)"), 300);
      showMessage("Nom nom! 🍖");
      updateHappiness(card, 10);
    });

    playBtn.addEventListener("click", () => {
      petAvatar.style.animation = "bounce 0.5s ease-in-out 3";
      showMessage("Wheee! 🎾");
      updateHappiness(card, 15);
      updateEnergy(card, -10); // Playing uses energy
    });

    sleepBtn.addEventListener("click", () => {
      petAvatar.style.opacity = "0.5";
      setTimeout(() => (petAvatar.style.opacity = "1"), 2000);
      showMessage("Sweet dreams! 😴");
      updateEnergy(card, 20); // Sleep should restore energy
    });
  }

  function updateHappiness(card, amount) {
    // Find the happiness stat specifically (first stat in the pet stats)
    const stats = card.querySelectorAll(".stat");
    const happinessStat = stats[0]; // First stat is happiness

    if (!happinessStat) {
      console.error("Could not find happiness stat in card:", card);
      return;
    }

    const happinessFill = happinessStat.querySelector(".stat-fill");

    if (!happinessFill) {
      console.error("Could not find happiness fill element in card:", card);
      return;
    }

    const currentWidth = parseInt(happinessFill.style.width) || 50;
    const newWidth = Math.min(100, currentWidth + amount);
    happinessFill.style.width = newWidth + "%";

    console.log(`Updated happiness from ${currentWidth}% to ${newWidth}%`);
  }

  function updateEnergy(card, amount) {
    // Find the energy stat specifically (second stat in the pet stats)
    const stats = card.querySelectorAll(".stat");
    const energyStat = stats[1]; // Second stat is energy

    if (!energyStat) {
      console.error("Could not find energy stat in card:", card);
      return;
    }

    const energyFill = energyStat.querySelector(".stat-fill");

    if (!energyFill) {
      console.error("Could not find energy fill element in card:", card);
      return;
    }

    const currentWidth = parseInt(energyFill.style.width) || 50;
    const newWidth = Math.max(0, Math.min(100, currentWidth + amount)); // Ensure it stays between 0 and 100
    energyFill.style.width = newWidth + "%";

    console.log(`Updated energy from ${currentWidth}% to ${newWidth}%`);
  }

  function showMessage(text) {
    const message = document.createElement("div");
    message.textContent = text;
    message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1.2rem;
            z-index: 1000;
            animation: messagePopup 2s ease-in-out forwards;
        `;

    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 2000);
  }

  // Add CSS animation for message popup
  const style = document.createElement("style");
  style.textContent = `
        @keyframes messagePopup {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
    `;
  document.head.appendChild(style);
});
