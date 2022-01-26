window.addEventListener('load', () => {

    const span = document.querySelector('#numVisits');

    let numVisits = JSON.parse(localStorage.getItem('numVisits'));
    if (!numVisits) {
        numVisits = 0;
    }

    span.innerText = numVisits;

    numVisits++;
    localStorage.setItem('numVisits', JSON.stringify(numVisits));
});