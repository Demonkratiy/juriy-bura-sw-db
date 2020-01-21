// fetch('https://swapi.co/api/people/1/')
//   .then((res) => {//res - response, Fetch работает через промиз, и когда он получит ответ res то выполнит функцию
//     console.log('Got response', res.status)//на данном этапе мы получаем какойто ответ но еще не тело ответа от сервера
//     return res.json();
//   })
//   .then((body) => {//каждый метод res работает через еще 1 promise, и здесь получив ответ через предыдущий метод, мы обрабатываем его, чтобы получить тело ответа
//     console.log('Got response', body)
//   })

/*const getResource = async(url) => {
  const res = await fetch(url); //fetch возвращает promise, await ждет пока результат этого промиса не станет доступным, после чего запишет этот результат в переменную res

  if (!res.ok) {
    throw new Error(`getResource(${url}) function recived an error with status ${res.status}`);
  }

  const body = await res.json();
  return body
};

getResource('https://swapi.co/api/people/1/')
  .then((body) => {
    console.log('Got response', body)
  })
  .catch((err) => {
    console.error(`getResource() function got an error: `, err);
  });*/


export default class SwapiService {
  _apiBase = 'https://swapi.co/api'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`getResource(${url}) function recived an error with status ${res.status}`);
    }

    return await res.json();
  }

  getAllPeople() {
    return this.getResource(`/people/`).then((res) => {
      return res.results;//здесь results это название метода в API самой SWAPI
    });
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`)
  }

  getAllPlanets() {
    return this.getResource(`/planets/`).then((res) => {
      return res.results.map(this._transformPlanet);//здесь results это название метода в API самой SWAPI
    });
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  getAllStarships() {
    return this.getResource(`/starships/`).then((res) => {//ждем пока получим результат функции getResource(`/starships/`), и после этого выполняем следущее
      return res.results;//здесь results это название метода в API самой SWAPI
    });
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`)
  }

}


_extractId(item) {
  const idRegExp = /\/([0-9]*)\/$/;//выделение id из url строки, которую мы получим в объекте item
  const id = item.url.match(idRegExp)[1];//делаем потому, что в SWAPI нет API для получения id, поэтому приходится выцеплять его из параметра item.url
}

_transformPlanet(planet) {

  return {
    id: this._extractId(planet),
    name: planet.name,
    population: planet.population.replace(/\B(?=(\d{3})+(?!\d))/g, " "),//здесь regExp использовал для отображения разрядов числа
    rotationPeriod: planet.rotation_period,
    diameter: planet.diameter.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }
};

_transformPerson(person) {

  return {
    id: this._extractId(person),
    name: person.name,
    gender: 
  }
};

_transformStarship(starship) {

  return {
    id: this._extractId(starship),
    name: starship.name,
    model: starship.model,
    manafacturer: starship.manafacturer,
    costInCredits: starship.costInCredits.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    length: starship.length.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    crew: starship.crew,
    passangers: starship.passangers,
    cargoCapacity: starship.cargoCapacity
  }
};

// const swapi = new SwapiService();
//
// swapi.getPerson(4).then((p) => {
//   console.log(p.name);
// })
//
// swapi.getAllStarships().then((p) => {
//   p.forEach((p) => {
//   console.log(p.name);
//   })
// })
