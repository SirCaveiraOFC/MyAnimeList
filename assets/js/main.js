// Coded
// BY
// https://t.me/SrCaveira

let animeQuantity = 0;
let lastAnimeBox;

// Eps and Progress-bar
var eps_quantity = [];
var eps_assistidos = [];
var eps_percentage_total = [];
var eps_vieweds_and_total = document.getElementsByClassName('eps_vieweds_and_total');
var progress_bar_container = document.getElementsByClassName('progress-bar');
var progress_bar = document.getElementsByClassName('bar');

const bg = document.getElementsByClassName('bg')[0];
const header_site = document.querySelector('header');
const search_container = document.getElementsByClassName('search-container')[0];
const searchAnime = document.getElementById('searchAnime');
const resultsFor = document.getElementById('resultsFor');
const resultsForAnimeName = document.getElementById('resultsForAnimeName');
const animes_container = document.getElementsByClassName('animes-container')[0];
const animes = document.getElementsByClassName('anime-box');
const imgs = document.getElementsByTagName('img');
const anime_name = document.getElementsByClassName('anime-name');
const removeAnime = document.getElementsByClassName('removeAnime');
const addAnimes = document.getElementById('addAnime');

// Export - Import - Delete - Download
const exportList = document.getElementById('exportList');
const importList = document.getElementById('importList');
const deleteList = document.getElementById('deleteList');
const downloadList = document.getElementById('downloadList');

function changeInfosAndPercentage(auto = true, viewed, total) {
  if (!auto) {
    if (viewed == 0) {
      return 0;
    } else if (viewed >= total) {
      return 100;
    } else if (viewed < total) {
  	  return Math.round(viewed * 99 / total);
    } else {
      return Math.round(viewed * 100 / total);
    }

    return;
  }

  for (let i = 0; i < eps_quantity.length; i++) {
    if (eps_assistidos[i] == 0) {
      eps_percentage_total.push(0);
    } else if (eps_assistidos[i] >= eps_quantity[i]) {
      eps_percentage_total.push(100);
    } else if (eps_assistidos[i] < eps_quantity[i]) {
  	  eps_percentage_total.push(Math.round(eps_assistidos[i] * 99 / eps_quantity[i]));
    } else {
      eps_percentage_total.push(Math.round(eps_assistidos[i] * 100 / eps_quantity[i]));
    }

    if (eps_percentage_total[i] >= 35) {
      progress_bar[i].style.justifyContent = 'center';
    }

    eps_vieweds_and_total[i].innerText = `${eps_assistidos[i]} / ${eps_quantity[i]}`;

    progress_bar[i].innerText = `${eps_percentage_total[i]}%`;
    
    if (eps_percentage_total[i] > 0) {
      progress_bar[i].style.width = `${eps_percentage_total[i]}%`;
    }

    if (eps_percentage_total[i] == 0) {
      progress_bar[i].style.backgroundImage = 'linear-gradient(315deg, #3f0d12 0%, #a71d31 74%)';
    }
    
    if (eps_percentage_total[i] <= 80 && eps_percentage_total[i] > 0) {
      progress_bar[i].style.backgroundImage = 'linear-gradient(315deg, #a40606 0%, #d98324 74%)';
    }
    
    if (eps_percentage_total[i] > 80 && eps_percentage_total[i] < 100) {
      progress_bar[i].style.backgroundImage = 'linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)';
    }

    if (eps_percentage_total[i] == 100) {
      progress_bar[i].style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
    }
  }
}

function hiddenHeaderWhenScrollDown() {
  let scrollY = window.scrollY;

  if (scrollY >= 50) {
    header_site.style.display = 'none';
  } else {
    header_site.style.display = 'flex';
  }
}

function searchAnimes() {
  if (!empty(searchAnime.value)) {
    resultsFor.style.display = 'block';
    resultsForAnimeName.style.display = 'unset';
    resultsForAnimeName.innerText = searchAnime.value;
  } else {
    resultsFor.style.display = 'none';
    resultsForAnimeName.style.display = 'none';
  }

  for (let i = 0; i < animes.length; i++) {
    if (empty(searchAnime.value)) {
      animes[i].removeAttribute('style');
    } else if (animes[i].dataset.animename.toUpperCase().indexOf(searchAnime.value.toUpperCase()) == -1) {
      animes[i].style.display = 'none';
    } else {
      animes[i].removeAttribute('style');
    }
  }
}

function setQuantityAnime() {
  animeQuantity = animes.length;
  let animeQuantityText;

  animeQuantityText = (animeQuantity > 1 ? `Procure ${animeQuantity} Animes...` : `Procure ${animeQuantity} Anime...`);

  searchAnime.placeholder = animeQuantityText;
}

function empty(haystack) {
  return (haystack == '' ? true : false);
}

function generateTxtFile(text) {
  let textFile = null;
  let data = new Blob([text], {type: 'text/plain'});

  if (textFile !== null) {  
    window.URL.revokeObjectURL(textFile);  
  }

  textFile = window.URL.createObjectURL(data);

  return textFile; 
}

function readTxtFile(file) {
  const reader = new FileReader();

  reader.onload = (event) => {
    let data = event.target.result;

    window.localStorage.setItem('animeList', data);
  };

  reader.readAsText(file[0]);

  window.location.reload();
}

function blurAndUnblurAllHtml(type = true) {
  header_site.style.borderBottom = '0px';

  let elementsToBlur = [
    bg,
    search_container,
    animes_container,
    exportList,
    importList,
    deleteList,
    addAnimes,
    document.querySelectorAll('header h1')[0],
    document.querySelectorAll('header h1')[1]
  ];

  elementsToBlur.forEach((item) => {
    if (type) {
      if (item == bg) {
        item.style.filter = 'grayscale(100%) brightness(20%) blur(20px)';
      } else {
        item.style.filter = 'blur(20px)';
      }
    } else {
      if (item == bg) {
        item.style.filter = 'grayscale(100%) brightness(20%)';
      } else {
        item.style.filter = 'unset';
      }
    }
  });
}

function exportYourList() {
  var lastList = window.localStorage.getItem('animeList');

  downloadList.href = generateTxtFile(lastList);
  downloadList.removeAttribute('style');

  blurAndUnblurAllHtml(); // Borrar todo o html, exceto o botão de download da lista
  downloadList.setAttribute('class', 'animate__animated animate__shakeY animate__slower animate__infinite infinite');
}

function importYourList() {
  document.querySelector('#listFile').click();
}

function hiddenDownloadList() {
  downloadList.style.display = 'none';

  blurAndUnblurAllHtml(false);
  header_site.style.borderBottom = '5px solid #ddd';
}

function deleteAllAnimesInList() {
  Swal.fire({
    icon: 'warning',
    title: `Você realmente quer deletar toda a sua lista? (não é possível reverter, a menos que você tenha exportado a lista)`,
    showDenyButton: true,
    confirmButtonText: 'Sim, quero.',
    confirmButtonColor: '#212121',
    denyButtonText: `Não, não quero.`,
    background: '#0f0f0f',
  }).then((result) => {
    if (result.isConfirmed) {
      window.localStorage.removeItem('animeList');

      Swal.fire({
        icon: 'success',
        text: `Toda a sua lista foi deletada com sucesso!`,
        background: '#0f0f0f',
        confirmButtonColor: '#212121',
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    } else if (result.isDenied) {
      Swal.fire({
        icon: 'info',
        text: `Exclusão cancelada!`,
        background: '#0f0f0f',
        confirmButtonColor: '#212121',
      });
    }
  });
}

async function addAnime() {
  const { value: formValues } = await Swal.fire({
    title: 'Adicionar Anime',
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="Nome do Anime">
      <input id="swal-input2" class="swal2-input" placeholder="Link da Capa">
      <input id="swal-input3" type="number" class="swal2-input" placeholder="Quantia de Episódios">
      `,
    focusConfirm: false,
    background: '#0f0f0f',
    confirmButtonText: 'Adicionar',
    confirmButtonColor: '#212121',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
        document.getElementById('swal-input3').value
      ]
    }
  })

  if (formValues) {
    var lastList = window.localStorage.getItem('animeList');

    if (lastList == null) {
      var firstAnime = {
        anime1: [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          1,
          0,
          parseInt(document.getElementById('swal-input3').value),
          0
        ]
      };

      var animeToAdd = document.getElementById('swal-input1').value;

      Swal.fire({
        icon: 'warning',
        title: `Você realmente quer adicionar ${animeToAdd} a sua lista?`,
        showDenyButton: true,
        confirmButtonText: 'Sim, quero.',
        confirmButtonColor: '#212121',
        denyButtonText: `Não, não quero.`,
        background: '#0f0f0f',
      }).then((result) => {
        if (result.isConfirmed) {
          window.localStorage.setItem('animeList', JSON.stringify(firstAnime));
    
          Swal.fire({
            icon: 'success',
            text: `O Anime (${animeToAdd}) foi adicionado a lista!`,
            background: '#0f0f0f',
            confirmButtonColor: '#212121',
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 200);
          });
        } else if (result.isDenied) {
          Swal.fire({
            icon: 'info',
            text: `Adição cancelada!`,
            background: '#0f0f0f',
            confirmButtonColor: '#212121',
          });
        }
      });

      return;
    }

    var lastObjList = JSON.parse(lastList);
    var nextAnimeString;

    Object.keys(lastObjList).forEach(function(item) {
      var temporaryArrayToSetNextAnime = [lastObjList[item][2]];

      nextAnimeString = String(temporaryArrayToSetNextAnime[temporaryArrayToSetNextAnime.length - 1]);
    });

    var nextAnimeInt = parseInt(nextAnimeString) + 1;

    if (!empty(document.getElementById('swal-input1').value)
    && !empty(document.getElementById('swal-input2').value)
    && !empty(document.getElementById('swal-input3').value)) {
      lastObjList[`anime${String(nextAnimeInt)}`] = [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
        nextAnimeInt,
        0,
        parseInt(document.getElementById('swal-input3').value),
        0
      ];

      var animeToAdd = document.getElementById('swal-input1').value;

      Swal.fire({
        icon: 'warning',
        title: `Você realmente quer adicionar ${animeToAdd} a sua lista?`,
        showDenyButton: true,
        confirmButtonText: 'Sim, quero.',
        confirmButtonColor: '#212121',
        denyButtonText: `Não, não quero.`,
        background: '#0f0f0f',
      }).then((result) => {
        if (result.isConfirmed) {
          window.localStorage.setItem('animeList', JSON.stringify(lastObjList));
    
          Swal.fire({
            icon: 'success',
            text: `O Anime (${animeToAdd}) foi adicionado a lista!`,
            background: '#0f0f0f',
            confirmButtonColor: '#212121',
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 200);
          });
        } else if (result.isDenied) {
          Swal.fire({
            icon: 'info',
            text: `Adição cancelada!`,
            background: '#0f0f0f',
            confirmButtonColor: '#212121',
          });
        }
      });
    }
  }
}

async function removeAnimes(e) {
  var animeToRemove = e.target.dataset.animecount;
  var animeNameToRemove = e.target.nextElementSibling.getAttribute('alt');
  var lastList = window.localStorage.getItem('animeList');
  var lastObjList = JSON.parse(lastList);
  
  Swal.fire({
    icon: 'warning',
    title: `Você realmente quer remover ${animeNameToRemove} da sua lista?`,
    showDenyButton: true,
    confirmButtonText: 'Sim, quero.',
    confirmButtonColor: '#212121',
    denyButtonText: `Não, não quero.`,
    background: '#0f0f0f',
  }).then((result) => {
    if (result.isConfirmed) {
      delete lastObjList[animeToRemove];
      
      window.localStorage.setItem('animeList', JSON.stringify(lastObjList));

      Swal.fire({
        icon: 'success',
        text: `O Anime (${animeNameToRemove}) foi removido da lista!`,
        background: '#0f0f0f',
        confirmButtonColor: '#212121',
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    } else if (result.isDenied) {
      Swal.fire({
        icon: 'info',
        text: `Remoção cancelada!`,
        background: '#0f0f0f',
        confirmButtonColor: '#212121',
      });
    }
  });
}

function updateAnimes() {
  var lastList = window.localStorage.getItem('animeList');

  if (lastList !== null) {
    var lastObjList = JSON.parse(lastList);
    var content = '';

    Object.keys(lastObjList).forEach(function(item) {
      eps_quantity.push(lastObjList[item][4]);
      eps_assistidos.push(lastObjList[item][3]);
      // eps_percentage_total.push(lastObjList[item][5]);

      content += `<div class="anime-box" data-animename="${lastObjList[item][0]}">
      <i class="fa-solid fa-circle-xmark fa-2x removeAnime"></i>
      <img src="${lastObjList[item][1]}" alt="${lastObjList[item][0]}" />`;

      if (lastObjList[item][0].length >= 20) {
        if (lastObjList[item][5] == 0) {
          content += `<span class="anime-name" style="font-size: 12px;">${lastObjList[item][0]}</span>
        <span class="eps_vieweds_and_total" ${myTippy("Clique para alterar a quantia de episódios assistidos", "bottom")}>${lastObjList[item][3]} / ${lastObjList[item][4]}</span>
        <div class="progress-bar">
          <div class="bar" style="width: 100%; background: transparent; justify-content: center;">${lastObjList[item][5]}</div>
        </div></div>`;
        } else {
          content += `<span class="anime-name" style="font-size: 12px;">${lastObjList[item][0]}</span>
        <span class="eps_vieweds_and_total" ${myTippy("Clique para alterar a quantia de episódios assistidos", "bottom")}>${lastObjList[item][3]} / ${lastObjList[item][4]}</span>
        <div class="progress-bar">
          <div class="bar">${lastObjList[item][5]}</div>
        </div></div>`;
        }
      } else {
        if (lastObjList[item][5] == 0) {
          content += `<span class="anime-name">${lastObjList[item][0]}</span>
        <span class="eps_vieweds_and_total" ${myTippy("Clique para alterar a quantia de episódios assistidos", "bottom")}>${lastObjList[item][3]} / ${lastObjList[item][4]}</span>
        <div class="progress-bar">
          <div class="bar" style="width: 100%; background: transparent; justify-content: center;">${lastObjList[item][5]}</div>
        </div></div>`;
        } else {
          content += `<span class="anime-name">${lastObjList[item][0]}</span>
        <span class="eps_vieweds_and_total" ${myTippy("Clique para alterar a quantia de episódios assistidos", "bottom")}>${lastObjList[item][3]} / ${lastObjList[item][4]}</span>
        <div class="progress-bar">
          <div class="bar">${lastObjList[item][5]}</div>
        </div></div>`;
        }
      }
  
      animes_container.innerHTML = content;
    });
  }
}

async function changeEpisodiesViewedQuantity(e) {
  var animeToEdit = e.target.dataset.editeps;
  var animeNameToEdit = e.target.previousElementSibling.innerText; 
  var lastList = window.localStorage.getItem('animeList');
  var lastObjList = JSON.parse(lastList);
  var animeEpisodiesQuantitySplit = e.target.innerText.split(' / ');
  var animeEpisodiesTotalQuantity = parseInt(animeEpisodiesQuantitySplit[1]);
  
  const { value: formValues } = await Swal.fire({
    title: `Editar Quantia de Episódios assistidos de ${animeNameToEdit}`,
    html: `<input id="swal-input1" type="number" class="swal2-input" placeholder="Quantia de Episódios assistidos">`,
    focusConfirm: false,
    background: '#0f0f0f',
    confirmButtonText: 'Editar',
    confirmButtonColor: '#212121',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value
      ]
    }
  })

  var newQuantityEps = parseInt(document.getElementById('swal-input1').value);
    
  if (formValues) {
    if (newQuantityEps != lastObjList[animeToEdit][3]) {
      lastObjList[animeToEdit][3] = newQuantityEps;
      lastObjList[animeToEdit][5] = changeInfosAndPercentage(false, newQuantityEps, animeEpisodiesTotalQuantity);
      
      window.localStorage.setItem('animeList', JSON.stringify(lastObjList));

      Swal.fire({
        icon: 'success',
        text: `A quantia de episódios assistidos do Anime (${animeNameToEdit}) foi editada para ${newQuantityEps}!`,
        background: '#0f0f0f',
        confirmButtonColor: '#212121',
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    }
  }
}

function setDataCountAnime() {
  for (let i = 0; i < imgs.length; i++) {
    removeAnime[i].setAttribute('data-count', i);
    imgs[i].setAttribute('data-count', i);
    animes[i].setAttribute('data-count', i);
    anime_name[i].setAttribute('data-count', i);
    eps_vieweds_and_total[i].setAttribute('data-count', i);
    progress_bar_container[i].setAttribute('data-count', i);
    progress_bar[i].setAttribute('data-count', i);
  }
}

function setDataCountAnimeToRemove() {
  var lastList = window.localStorage.getItem('animeList');

  if (lastList !== null) {
    var lastObjList = JSON.parse(lastList);
    var lastCounts = [];
  
    Object.keys(lastObjList).forEach(function(item) {
      lastCounts.push(lastObjList[item][2]);
    });
  
    for (let i = 0; i < removeAnime.length; i++) {
      removeAnime[i].setAttribute('data-animecount', `anime${lastCounts[i]}`);
      eps_vieweds_and_total[i].setAttribute('data-editeps', `anime${lastCounts[i]}`);
    }
  }
}

function blurAnimesBox(e) {  
  for (let i = 0; i < animes.length; i++) {
    lastAnimeBox = e.target.dataset.count;

    if (i != lastAnimeBox) {
      animes[i].style.filter = 'blur(4px)';
    }
  }
}

function removeBlurAnimesBox() {
  for (let i = 0; i < animes.length; i++) {
    animes[i].style.filter = 'unset';
  }
}

function myTippy(text, placement) {
  return `onmouseover="tippy(this, { content: '${text}', placement: '${placement}' });"`;
}

searchAnime.addEventListener('keyup', searchAnimes);

window.addEventListener('DOMContentLoaded', () => {
  if (!empty(window.localStorage.getItem('animeList'))) {
    updateAnimes(); // Atualizar os animes
    setDataCountAnime(); // Setar a index de cada anime [0, 1, 2, 3]
    setDataCountAnimeToRemove(); // Setar a index de cada anime [anime0, anime1, anime2, anime3]
    setQuantityAnime(); // Setar a quantidade total de animes
    changeInfosAndPercentage(); // Setar a porcentagem e informações dos eps/animes
  }

  if (animeQuantity == 0) {
    searchAnime.placeholder = `:( Oops! Você ainda não tem nenhum anime... Adicione já!`;
  }

  // Desborrar e Borrar box de animes
  for (let i = 0; i < animes.length; i++) {
    //animes[i].addEventListener('mouseover', blurAnimesBox);
    //animes[i].addEventListener('mouseout', removeBlurAnimesBox);
  }

  // Remover Animes ao clicar no botão de remover
  for (let i = 0; i < removeAnime.length; i++) {
    removeAnime[i].addEventListener('click', removeAnimes);
  }

  // Editar a quantia de episódios de um anime ao clicar no botão de editar
  for (let i = 0; i < eps_vieweds_and_total.length; i++) {
    eps_vieweds_and_total[i].addEventListener('click', changeEpisodiesViewedQuantity);
  }

  if (window.localStorage.getItem('animeList') === null
  || window.localStorage.getItem('animeList') === '{}') {
    //window.localStorage.setItem('animeList', '');
    exportList.disabled = true;
    exportList.style.opacity = '0.5';
  }
});

// Adicionar Animes ao clicar no botão de adicionar
addAnimes.addEventListener('click', addAnime);

// Exportar lista de Animes ao clicar no botão de exportar
exportList.addEventListener('click', exportYourList);

// Importar lista de Animes ao clicar no botão de importar
importList.addEventListener('click', importYourList);

// Baixar lista de Animes ao clicar no botão de download
downloadList.addEventListener('click', hiddenDownloadList);

// Deletar toda a lista de animes ao clicar no botão de deletar
deleteList.addEventListener('click', deleteAllAnimesInList);

// Ocultar a header quando rolar a pagina (mobile)
window.addEventListener('scroll', hiddenHeaderWhenScrollDown);
