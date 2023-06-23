import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data)[0]);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUserLogin = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (Object.values(data).length) {
        resolve(Object.values(data)[0]);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getEngineer = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="isEngineer"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const byEngineer = Object.values(data).filter((engineer) => engineer.isEngineer);
      resolve(byEngineer);
    })
    .catch(reject);
});

const getArtist = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="isEngineer"&equalTo=false`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const byArtist = Object.values(data).filter((artist) => !artist.isEngineer && artist.uid === uid);
      resolve(byArtist);
      // console.log(byArtist);
    })
    .catch(reject);
});

export {
  createUser,
  getUser,
  getUserLogin,
  updateUser,
  deleteUser,
  getSingleUser,
  getEngineer,
  getArtist,
};
