import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// CREATE PROJECTS
const createProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${endpoint}/projects/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

// GET ALL PROJECTS
const getProjects = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET SINGLE PROJECTS
const getSingleProject = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => (resolve(data)))
    .catch(reject);
});

const getEngineerBooking = (engineerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="firebaseKey"&equalTo="${engineerId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

// UPDATE PROJECT
const updateProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

// DELETE PROJECT
const deleteSingleProject = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteSingleProject,
  getEngineerBooking,
};
