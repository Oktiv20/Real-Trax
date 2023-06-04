import { getEngineerBooking, getSingleProject } from './projectData';
import { getSingleUser } from './userData';

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

// const viewEngineerBookings = (projectFirebaseKey) => new Promise((resolve, reject) => {
//   Promise.all([getSingleProject(projectFirebaseKey), getEngineerBooking(projectFirebaseKey)])
//     .then(([projectObject, engineerBookingArray]) => {
//       console.log(projectObject);
//       resolve({ ...projectObject, bookings: engineerBookingArray });
//     }).catch((error) => reject(error));
// });
export { viewUserInfo, viewProjectDetails, viewEngineerBookings };
