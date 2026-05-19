const state = {
  money: 0,
  soldCount: 0,
  ingredients: {
    veggie: 0,
    rice: 0,
    sate: 0,
  },
};

const elements = {
  money: document.getElementById('money'),
  soldCount: document.getElementById('soldCount'),
  ingredientsVeggie: document.getElementById('ingredients-veggie'),
  ingredientsRice: document.getElementById('ingredients-rice'),
  ingredientsSate: document.getElementById('ingredients-sate'),
  statusText: document.getElementById('statusText'),
  messageLog: document.getElementById('messageLog'),
  btnCollect: document.getElementById('btnCollect'),
  btnCookRice: document.getElementById('btnCookRice'),
  btnCookSate: document.getElementById('btnCookSate'),
  btnSell: document.getElementById('btnSell'),
};

function updateUI(message) {
  elements.money.textContent = state.money;
  elements.soldCount.textContent = state.soldCount;
  elements.ingredientsVeggie.textContent = state.ingredients.veggie;
  elements.ingredientsRice.textContent = state.ingredients.rice;
  elements.ingredientsSate.textContent = state.ingredients.sate;
  if (message) {
    elements.messageLog.textContent = message;
  }
  elements.statusText.textContent = `Sedang menjaga toko`;
}

function logMessage(text) {
  elements.messageLog.textContent = text;
}

function collectIngredients() {
  const veggieGain = Math.floor(Math.random() * 2) + 1;
  const riceGain = Math.floor(Math.random() * 2) + 1;
  const sateGain = Math.floor(Math.random() * 2);
  state.ingredients.veggie += veggieGain;
  state.ingredients.rice += riceGain;
  state.ingredients.sate += sateGain;
  logMessage(`Baby Panda mengumpulkan bahan: +${veggieGain} sayur, +${riceGain} nasi, +${sateGain} sate.`);
  updateUI();
}

function cookRice() {
  if (state.ingredients.rice < 1 || state.ingredients.veggie < 1) {
    logMessage('Butuh minimal 1 nasi dan 1 sayur untuk membuat Nasi Goreng.');
    return;
  }
  state.ingredients.rice -= 1;
  state.ingredients.veggie -= 1;
  state.money += 5000;
  state.soldCount += 1;
  logMessage('Baby Panda membuat Nasi Goreng dan langsung terjual! +Rp 5000');
  updateUI();
}

function cookSate() {
  if (state.ingredients.sate < 2) {
    logMessage('Butuh 2 tusuk sate untuk membuat Sate Panda.');
    return;
  }
  state.ingredients.sate -= 2;
  state.money += 8000;
  state.soldCount += 1;
  logMessage('Baby Panda membuat Sate Panda dan menjualnya dengan laris! +Rp 8000');
  updateUI();
}

function sellAll() {
  const potential = state.ingredients.rice * 5000 + state.ingredients.veggie * 2500 + state.ingredients.sate * 3000;
  if (potential === 0) {
    logMessage('Belum ada menu siap jual. Kumpulkan bahan dan masak dulu.');
    return;
  }
  state.money += potential;
  state.soldCount += state.ingredients.rice + state.ingredients.veggie + state.ingredients.sate;
  logMessage(`Baby Panda menjual semua stok bahan sebagai makanan cepat saji dan mendapatkan Rp ${potential}.`);
  state.ingredients.rice = 0;
  state.ingredients.veggie = 0;
  state.ingredients.sate = 0;
  updateUI();
}

function setup() {
  elements.btnCollect.addEventListener('click', collectIngredients);
  elements.btnCookRice.addEventListener('click', cookRice);
  elements.btnCookSate.addEventListener('click', cookSate);
  elements.btnSell.addEventListener('click', sellAll);
  updateUI('Ayo mulai dengan kumpulkan bahan-bahan dulu.');
}

setup();
