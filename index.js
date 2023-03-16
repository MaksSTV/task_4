function foundLinks(links) {
  const searchResults = document.querySelector('.add_ref');

  var newElem = '<div class="ref">';

  links.forEach(item => {
    const url = `${item.html_url}`;

    newElem += '<div class="ref__item"><a target="_blank" href="' + `${url}` + '">' + `${item.name}` + `</a><p>Author: ${item.owner.login}</p><p>${item.description}</p></div>`;
  });

  newElem += '</div>';
  searchResults.insertAdjacentHTML('beforeend', newElem);
}

async function search(string) {

  let endpoint = `https://api.github.com/search/repositories?q=${string}&sort=stars&order=desc&per_page=10`;
  /*https://api.github.com/search/repositories?${string}&sort=stars&order=desc&per_page=10*/
  /*q=${string}&sort=stars&order=desc&per_page=10*/
  let response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  let json = await response.json();

  return json;
}

async function getString() {

  let string = document.querySelector('.input_search').value;
  let response = string.trim();

  let searchResults = document.querySelector('.add_ref');
  searchResults.innerHTML = '';

  let results = await search(response);
  console.log(results);
  if (results.total_count === 0) {
    alert('Ничего не найдено');
    return;
  }
  foundLinks(results.items);

}

const form = document.querySelector('.form_search');
form.addEventListener('submit', getString);