const lista = document.querySelector('ul');
const liElements = new Array();
let doneFirstClick = true;
let undoneFirstClick = true;

function dodajZadanie(e) {
    e.preventDefault();

    const li = document.createElement('li');
    const pTitle = document.createElement('p');
    pTitle.contentEditable = 'true';
    const spanOpis = document.createElement('p');
    spanOpis.contentEditable = 'true';
    const buttonRemove = document.createElement('button');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    const dataDodania = document.createElement('span')
    const dataUkonczenia = document.createElement('span')

    pTitle.classList.add('title');
    spanOpis.classList.add('content');

    const titleValue = document.querySelector('form .tytul').value;
    const opisValue = document.querySelector('form .opis').value;

    if (!titleValue || !opisValue) return alert('Podaj tytuł oraz opis zadania');
    pTitle.textContent = titleValue;
    spanOpis.textContent = opisValue;
    let today = new Date();
    dataDodania.textContent = `Data dodania zadania: ${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
    document.querySelector('form .tytul').value = '';
    document.querySelector('form .opis').value = '';
    buttonRemove.innerHTML = 'Usuń';

    li.append(pTitle, " ", spanOpis, " ", "Zadanie ukończone:", checkBox, " ", buttonRemove, dataDodania);
    liElements.push(li);
    liElements.forEach( (li, index) => {
        li.dataset.index = index;
        li.dataset.finished = false;
    })
    lista.appendChild(li);
    this.tytul.focus();

    checkBox.onclick = function() {
        if (this.checked) {
            this.parentNode.querySelector('.title').classList.add('finished');
            this.parentNode.querySelector('.content').classList.add('finished');
            this.parentNode.dataset.finished = true;

            let today = new Date();
            dataUkonczenia.textContent = ` Data ukończenia zadania: ${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
            li.append(dataUkonczenia);
            return
        }
        this.parentNode.querySelector('.title').classList.remove('finished');
        this.parentNode.querySelector('.content').classList.remove('finished');
        this.parentNode.dataset.finished = false;
        dataUkonczenia.textContent = '';
    }

    buttonRemove.onclick = function() {
        const confirmRemove = confirm(`Czy na pewno chcesz usunąć ${pTitle.textContent}?`);
        if (!confirmRemove) return;
        liElements.forEach( li => {
            if (li.dataset.index == this.parentNode.dataset.index) {
                liElements.splice(this.parentNode.dataset.index, 1);
            }
        })
        liElements.forEach( (li, index) => {
            li.dataset.index = index;
        })
        this.parentNode.remove();
    }
}

function showDone() {
    lista.textContent = '';
    liElements.forEach( el => {
        lista.appendChild(el)
    })
    let lis = [...lista.querySelectorAll('li')];
    lista.textContent = '';
    let arDone = lis.filter( li => {
        if (li.dataset.finished == 'true' && this.id == 'filterDone') {
            return li;
        } else if (this.id == 'filterUndone' && li.dataset.finished == 'false') {
            return li;
        }
    })
    arDone.forEach( el => {
        lista.appendChild(el);
    })
}

function showAll() {
    lista.textContent = '';
    liElements.forEach( el => {
        lista.appendChild(el)
    })
}

function searchTask(e) {
    e.preventDefault();
    lista.textContent = '';
    liElements.forEach( el => {
        lista.appendChild(el)
    })
    let lis = [...lista.querySelectorAll('li')];
    lista.textContent = '';
    let arSearched = lis.filter( el => {
        if (el.querySelector('.content').textContent.includes(e.target.value)) {
            return el;
        }
    })
    arSearched.forEach( el => {
        lista.appendChild(el);
    })
}

document.querySelector('form').onsubmit = dodajZadanie;
document.querySelector('#filterDone').addEventListener('click', showDone);
document.querySelector('#filterUndone').addEventListener('click', showDone);
document.querySelector('#showAll').addEventListener('click', showAll);
document.querySelector('#searchTask').addEventListener('input', searchTask);