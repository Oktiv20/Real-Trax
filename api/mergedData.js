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
  // The getSingleProject function returns a promise. When this promise resolves successfully, the .then() callback is executed, and the resolved value (projectObject) is passed as an argument.
  getSingleProject(projectFirebaseKey)
    .then((projectObject) => {
      getSingleUser(projectObject.uid)
        .then((artistObject) => {
          resolve({ artistObject, ...projectObject }); // When the getSingleProject and getSingleUser promises resolve successfully, the viewProjectDetails promise will resolve a value that is a new object with the combined artist and project object
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
  Promise.all([getProjects(uid), getEngineer(uid), getEngineerBooking()]).then(([projectArray, engineerArray, bookingArray]) => {
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

    const filteredBookings = bookingArray.filter((bookings) => {
      if (bookings.projectName?.toLowerCase().includes(searchTerm?.toLowerCase())) {
        return bookings;
      }
      return '';
    }).map((filterBooking) => {
      if (filterBooking !== '') {
        return {
          name: filterBooking.projectName,
          firebaseKey: filterBooking.firebaseKey,
          type: 'bookings',
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

    resolve([...filteredProjects, ...filteredEngineers, ...filteredBookings]);
  }).catch((error) => reject(error));
});

export {
  viewUserInfo, viewProjectDetails, viewEngineerBookings, viewEngineerDetails, globalSearch,
};
