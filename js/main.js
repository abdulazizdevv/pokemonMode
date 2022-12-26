let cartoonList = document.querySelector(".cartoonList");
let pokemonSelect = document.querySelector("#pokemonSelect");
let elInput = document.querySelector(".js-input");
let elSort = document.querySelector("#js-sort");
let elBody = document.querySelector("body");
let elBtns = document.querySelector(".btns");
let elHero = document.querySelector(".hero");

let newArray = [];
let BookMarkList = [];
elInput.addEventListener("input", function (evt) {
  evt.preventDefault();
  newArray = [];

  let inputVal = elInput.value;

  pokemons.forEach((el) => {
    if (el.name.toLowerCase().includes(inputVal)) {
      newArray.push(el);
    }
  });
  renderPokemon(newArray, cartoonList);
});

function renderPokemon(pokemons) {
  let res = "";

  for (i of pokemons) {
    // let bookMark =document.createElement("button")
    // let bookMarkimg =document.createElement("img")
    // bookMark.setAttribute("class", "")
    res += `
    <div class="card shadow p-2 mb-5  rounded rounded-4 ms-5 mt-2 mb-5 me-5" style="width: 15rem;  background-color: orange; ">
    <img src="${i.img}" class="card-img-top" alt="pokemons">
    
    <button class="w-25 bookmark" style="background-color: transparent; border: none;">
    <img class="w-100 bookmarkImg" src="./image/star.png" alt="mark">
    </button>
        <div class="card-body">
        <h4 style="font-family: 'Martian Mono', monospace; font-weight=300" class="card-text">${i.id}</h4>
        <h5 style="font-family: 'Martian Mono', monospace; font-weight=300" class="card-title">${i.name}</h5>
        <h6 style="font-family: 'Martian Mono', monospace; font-weight=300" class="card-title">${i.spawn_time}</h6>
        <p style="font-family: 'Martian Mono', monospace; font-weight=300" class="card-text">${i.height} ${i.weight}</p>
        <p style="font-family: 'Martian Mono', monospace; font-weight=300" class="card-text">${i.type}</p>

        </div>
        </div>
        `;
  }

  cartoonList.innerHTML = res;
  return res;
}

renderPokemon(pokemons);

let bookMark = document.querySelector(".bookmark");
let bookMarkImg = document.querySelector(".bookmarkImg");
cartoonList.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (evt.target.matches(".bookmarkImg")) {
    let findItem = pokemons.find((el) => el.id == evt.target);
    BookMarkList.push(pokemons.name)
  }
});

let uniqCat = [];

let uniqCategoryFunc = (arr) => {
  for (pokemon of arr) {
    for (category of pokemon.type) {
      if (!uniqCat.includes(category)) {
        uniqCat.push(category);
      }
    }
  }
  return uniqCat;
};

function renderCategory(type, el) {
  let optRes = "";

  for (category of type) {
    optRes += `
        <option value="${category}">${category}</option>
        `;
  }
  el.innerHTML += optRes;
}

renderCategory(uniqCategoryFunc(pokemons), pokemonSelect);

pokemonSelect.addEventListener("change", function (e) {
  let filteredArr = pokemons.filter((pok) => {
    let main = e.target.value;
    return pok.type.includes(main);
  });
  renderPokemon(filteredArr);
});

elSort.addEventListener("change", (evt) => {
  evt.preventDefault();

  let sortValue = elSort.value;

  let newArr = [];

  if (sortValue == "All") {
    pokemons.forEach((elemnt) => {
      newArr.push(elemnt);
    });
    renderPokemon(newArr, cartoonList);
  } else if (sortValue == "A-Z") {
    renderPokemon(
      pokemons.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))
    );
  } else if (sortValue == "Z-A") {
    renderPokemon(
      pokemons.sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0))
    );
  }
});

elBtns.addEventListener("click", (evt) => {
  evt.preventDefault();

  elBody.classList.toggle("dark");
});

let theme = false;

elBtns.addEventListener("click", () => {
  theme = !theme;
  const newBg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", newBg);
  newTheme();
});

let newTheme = () => {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

newTheme();
