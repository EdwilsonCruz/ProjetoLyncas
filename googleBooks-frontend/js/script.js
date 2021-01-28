/**
 * Objeto de estado global da aplicação
 *
 */
const globalState = {
  allBooks: [],
  allFovorites: [],
  loadingData: true,
  totalItems: 0,
  page: 1,
  perPage: 40,
  totalPage: 1,
  start: 0, end: 9,
  perPageFavorites: 10
};

const globalPagination = `<div>
  <ul class='pagination'>
    <li class='waves-effect'><a class='voltar'><i class='material-icons'>chevron_left</i></a></li>
    <li class="active"><a id='page'>1</a></li>
    <li class="waves-effect"><a class='proxima'><i class="material-icons">chevron_right</i></a></li>
  </ul></div>`;

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

  globalState.totalItems = json.totalItems

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
async function initStart() {
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
    controls.createListeners();
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
  try {
    const url = "http://localhost:5000/api/book/favorites";
    const resource = await fetch(url);
    const json = await resource.json();

    const jsonWithImprovedSearch = json.map((item) => {
      return item;
    });

    globalState.allFovorites = [...jsonWithImprovedSearch];
    globalState.loadingData = false;
  } catch (error) {
    console.error(error);
  }
}

function renderFavorites() {
  const { allFovorites } = globalState;
  
  globalState.totalPage == 1 ? globalState.totalPage = Math.ceil(allFovorites.length / globalState.perPageFavorites) : console.log(false)

  const booksToShow = allFovorites
    .map((book, i) => {
      if (i >= globalState.start && i <= globalState.end) { return renderFavorite(book) };
    })
    .join("");

  

  console.log(globalState.totalPage);

  const renderedHTML = `
     <div>
       <h2>${allFovorites.length} favorito(s) encontrado(s)</h2>
       <div class='row'>
         ${booksToShow}
       </div>
       ${globalState.totalPage == 1 ? "" : globalPagination}
     </div>
  `;

  globaldivBooks.innerHTML = renderedHTML;

}

async function renderBooks() {
  const { allBooks, totalItems, allFovorites } = globalState;

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
       <h2>${totalItems} livro(os) encontrado(s)</h2>
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

/** Paginação , inicio do controle que vai
escrito em tela.
**/

const controls = {
  next(){
    globalState.page++
    const lastPage = globalState.page > globalState.totalPage;
    if (lastPage) {
      globalState.page--;
    }
    
    var pagina = globalState.page - 1;
    globalState.start = pagina * globalState.perPageFavorites;
    globalState.end = (globalState.start-1) + globalState.perPageFavorites;
  },
  prev(){
    globalState.page--

    if (globalState.page < 1) {
       globalState.page++
    }
      var pagina = globalState.page - 1;
      globalState.start = pagina * globalState.perPageFavorites;
      globalState.end = (globalState.start-1) + globalState.perPageFavorites; 
    
  },

  goTo(page) {
    if (page < 1) {
      page = 1;
    }
    globalState.page = page;
    if (page > globalState.totalPage) {
      globalState.page = globalState.totalPage
    }
    document.querySelector(".pagePrincipal").innerHTML = globalState.page;
  },
  createListeners() {
    document.querySelector(".proxima").addEventListener('click', () => {
      controls.next();
      renderFavorites();
      document.querySelector('#page').innerHTML =globalState.page;
      controls.createListeners();
    })
    document.querySelector(".voltar").addEventListener('click', () => {
      controls.prev();
      renderFavorites();
      document.querySelector('#page').innerHTML =globalState.page;
      controls.createListeners();
    })
  }
}

initStart();
