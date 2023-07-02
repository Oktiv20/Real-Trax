import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// CREATE USER
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

// GET USER
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

// GET USER'S LOGIN INFO
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

// UPDATE USER
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

// DELETE USER
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

// GET SINGLE USER
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

// GET ENGINEER
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

// GET ARTIST
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
