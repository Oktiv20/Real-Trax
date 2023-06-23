import {
  getArtistProject, getEngineerBooking, getProjects, getSingleProject,
} from './projectData';
import { getEngineer, getSingleUser } from './userData';

const viewUserInfo = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleUser(firebaseKey)]).then(([userObj]) => {
    resolve({ ...userObj });
  }).catch((error) => reject(error));
});

const viewProjectDetails = (projectFirebaseKey) => new Promise((resolve, reject) => {
  getSingleProject(projectFirebaseKey)
    .then((projectObject) => {
      getSingleUser(projectObject.uid)
        .then((artistObject) => {
          resolve({ artistObject, ...projectObject });
        });
    }).catch((error) => reject(error));
});

const viewEngineerDetails = (engineerFirebaseKey) => new Promise((resolve, reject) => {
  getSingleProject(engineerFirebaseKey)
    .then((engineerObject) => {
      getSingleUser(engineerObject.uid);
      resolve({ engineerObject });
    }).catch((error) => reject(error));
});

const viewEngineerBookings = (projectFirebaseKey) => new Promise((resolve, reject) => {
  getSingleProject(projectFirebaseKey)
    .then((projectObject) => {
      getEngineerBooking(projectObject?.engineer_id).then(getArtistProject(projectObject?.artist_id))
        .then((artistObject) => {
          resolve({ artistObject, ...projectObject });
        });
    }).catch((error) => reject(error));
});

const globalSearch = (searchTerm, uid) => new Promise((resolve, reject) => {
  Promise.all([getProjects(uid), getEngineer(uid)]).then(([projectArray, engineerArray]) => {
    const filteredProjects = projectArray.filter((project) => {
      if (project.projectName?.toLowerCase().includes(searchTerm?.toLowerCase())) {
        return project;
      }
      return '';
    }).map((filterProject) => {
      if (filterProject !== '') {
        return {
          name: filterProject.projectName,
          firebaseKey: filterProject.firebaseKey,
          type: 'projects',
        };
      }
      return '';
    });

    const filteredEngineers = engineerArray.filter((engineer) => {
      const fullName = `${engineer.firstName} ${engineer.lastName}`;
      if (fullName.toLowerCase().includes(searchTerm?.toLowerCase())) {
        return engineer;
      }
      return '';
    }).map((filterEngineer) => {
      if (filterEngineer !== '') {
        return {
          name: `${filterEngineer.firstName} ${filterEngineer.lastName}`,
          firebaseKey: filterEngineer.firebaseKey,
          type: 'engineers',
        };
      }
      return '';
    });

    resolve([...filteredProjects, ...filteredEngineers]);
  }).catch((error) => reject(error));
});

export {
  viewUserInfo, viewProjectDetails, viewEngineerBookings, viewEngineerDetails, globalSearch,
};
