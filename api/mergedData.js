import { getEngineerBooking, getProjects, getSingleProject } from './projectData';
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

const viewEngineerBookings = (projectFirebaseKey) => new Promise((resolve, reject) => {
  getSingleProject(projectFirebaseKey)
    .then((projectObject) => {
      getEngineerBooking(projectObject?.engineer_id)
        .then((artistObject) => {
          resolve({ artistObject, ...projectObject });
        });
    }).catch((error) => reject(error));
});

const globalSearch = (searchWord, uid) => new Promise((resolve, reject) => {
  Promise.all([getProjects(uid), getEngineer(uid)]).then(([projectArray, engineerArray]) => {
    console.log(projectArray);
    console.log(engineerArray);
    const filteredProjects = projectArray.filter((project) => {
      if (project.projectName?.toLowerCase().includes(searchWord?.toLowerCase())) {
        console.log(project.projectName);
        return project;
      }
      return '';
    }).map((filterProject) => {
      if (filterProject !== '') {
        return {
          name: filterProject.projectName,
          firebaseKey: filterProject.firebaseKey,
          type: 'project',
        };
      }
      return '';
    });

    const filteredEngineers = engineerArray.filter((engineer) => {
      if (engineer.firstName?.toLowerCase().includes(searchWord?.toLowerCase())) {
        return engineer;
      } if (engineer.lastName?.toLowerCase().includes(searchWord?.toLowerCase())) {
        return engineer;
      }
      return '';
    }).map((filterEngineer) => {
      if (filterEngineer !== '') {
        return {
          name: filterEngineer.firstName + filterEngineer.lastName,
          firebaseKey: filterEngineer.firebaseKey,
          type: 'engineer',
        };
      }
      return '';
    });

    resolve([...filteredProjects, ...filteredEngineers]);
  }).catch((error) => reject(error));
});

export {
  viewUserInfo, viewProjectDetails, viewEngineerBookings, globalSearch,
};
