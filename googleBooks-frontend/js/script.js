/**
 * Objeto de estado global da aplicação
 *
 */
const globalState = {
  allBooks: [],
  allFovorites: [],
  loadingData: true,
  totalItens: 0,
};

/**
 * Variáveis globais que mapeiam elementos HTML
 */
const globaldivBooks = document.querySelector("#divBooks");
const globalInputName = document.querySelector("#inputName");
const globalFavorite = document.querySelector("#favorite");
const globalButton = document.querySelector("#btnPesquisa");

async function fetchAll(term) {
  const url = "http://localhost:5000/api/books/" + term;
  const resource = await fetch(url);
  const itemsFilter = globalState.allFovorites;
  const json = await resource.json();
  globalState.totalItens = json.totalItems;

  let jsonWithImprovedSearch = json.items.map((item) => {
    const { id, volumeInfo } = item;

    return {
      ...item,
      id,
      volumeInfo,
    };
  });

  /**
   * Atribuindo valores aos campos
   * através de cópia
   */
  globalState.allBooks = [...jsonWithImprovedSearch];
  globalState.loadingData = false;
}
//Inicio da aplicacao. start no final do codigo
async function start() {
  await fetchFavorites();
  console.log(globalState.allFovorites);
}
async function handleButtonClick() {
  /**
   * Obtendo todos os livros do backend
   * de forma assíncrona
   */

  if (globalInputName.value.trim() != "") {
    await fetchAll(globalInputName.value.trim());
    renderBooks();
  } else {
    alert("Campo pesquisa obrigatorio!");
    globalInputName.focus();
    return false;
  }
}

async function handleCheckedClick() {
  if (globalFavorite.checked == true) {
    globalInputName.disabled = true;
    globalButton.disabled = true;

    await fetchFavorites();
    renderFavorites();
  } else {
    globalInputName.disabled = false;
    globalButton.disabled = false;
    globaldivBooks.innerHTML = "";
  }
}

async function addFavorito(id) {
  const url = "http://localhost:5000/api/book/" + id + "/favorite";
  const resource = await fetch(url, {
    method: "POST",
  });
  const json = await resource.json();
  globalState.loadingData = false;

  M.toast({ html: "Cadastrado com Sucesso!", classes: "rounded" });
  document.querySelector("#" + id).parentElement.parentElement.style.display =
    "none";
}

async function deleteFavorite(id) {
  const url = "http://localhost:5000/api/book/" + id + "/favorite";
  console.log(url);
  const resource = await fetch(url);

  const json = await resource.json();
  globalState.loadingData = false;

  M.toast({ html: "Removido dos Favoritos!", classes: "rounded" });

  await fetchFavorites();
  renderFavorites();
}

async function fetchFavorites() {
  const url = "http://localhost:5000/api/book/favorites";
  const resource = await fetch(url);
  const json = await resource.json();

  const jsonWithImprovedSearch = json.map((item) => {
    return item;
  });

  globalState.allFovorites = [...jsonWithImprovedSearch];
  globalState.loadingData = false;
}
function renderFavorites() {
  const { allFovorites } = globalState;
  const booksToShow = allFovorites
    .map((book) => {
      return renderFavorite(book);
    })
    .join("");

  const renderedHTML = `
     <div>
       <h2>${allFovorites.length} favorito(s) encontrado(s)</h2>
       <div class='row'>
         ${booksToShow}
       </div>
     </div>
  `;

  globaldivBooks.innerHTML = renderedHTML;
}
async function renderBooks() {
  const { allBooks, totalItens, allFovorites } = globalState;

  for (let i = 0; i < allFovorites.length; i++) {
    const element = allFovorites[i].id;
    for (let j = 0; j < allBooks.length; j++) {
      if (allBooks[j].id == element) {
        allBooks.splice(j, 1);
      }
    }
  }

  const booksToShow = allBooks
    .map((book) => {
      return renderBook(book);
    })
    .join("");

  const renderedHTML = `
     <div>
       <h2>${totalItens} livro(os) encontrado(s)</h2>
       <div class='row'>
         ${booksToShow}
       </div>
     </div>
  `;

  globaldivBooks.innerHTML = renderedHTML;
}

/**
 * função para renderizar um livro */
function renderFavorite(book) {
  const { id, titulo, descricao, imagemThumbnail } = book;
  let flag = imagemThumbnail != undefined ? imagemThumbnail : "";
  let desc = descricao != undefined ? descricao : "Nao há descricao";
  desc = desc.substring(0, 150);
  return `
    <div class='col s12 m6 l4'>
      <div class='book-card'>     
        <img class='flag' src="${flag}" alt="${titulo}" />
        <div class='data'>          
          <input type="hidden" name="${id}" id="${id}" value="${id}"/> 
          <span class='language'>            
            <strong> ${desc}...</strong>
          </span>
        </div>
        <i class="iremove material-icons" onclick="deleteFavorite(document.querySelector('#${id}').value)">delete</i>
      </div>
    </div>
  `;
}
function renderBook(book) {
  const { id, volumeInfo } = book;
  let desc =
    volumeInfo.description != undefined
      ? volumeInfo.description
      : "Nao há descricao";
  desc = desc.substring(0, 150);
  let flag =
    volumeInfo.imageLinks != undefined
      ? volumeInfo.imageLinks.smallThumbnail
      : "";

  return `
    <div class='col s12 m6 l4'>
      <div class='book-card'>
        <img class='flag' src="${flag}" alt="${volumeInfo.title}" />
        <div class='data'>          
          <input type="hidden" name="${id}" id="${id}" value="${id}"/> 
          <span class='language'>            
            <strong> ${desc}..</strong>
          </span>
        </div>
        <div class='icon'>        
          <i class=" iadd material-icons" onclick="addFavorito(document.querySelector('#${id}').value)">add_circle</i>
        </div>  
      </div>
    </div>
  `;
}
start();
