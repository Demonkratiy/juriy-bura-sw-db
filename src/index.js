import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';

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


class SwapiService {
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
      return res.results;//здесь results это название метода в API самой SWAPI
    });
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}/`)
  }

  getAllStarships() {
    return this.getResource(`/starships/`).then((res) => {
      return res.results;//здесь results это название метода в API самой SWAPI
    });
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`)
  }

}

const swapi = new SwapiService();

swapi.getPerson(4).then((p) => {
  console.log(p.name);
})

swapi.getAllStarships().then((p) => {
  p.forEach((p) => {
  console.log(p.name);
  })
})

//ReactDOM.render(<App />, document.getElementById('root'));
