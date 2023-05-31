import { getSingleProject } from './projectData';
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

export { viewUserInfo, viewProjectDetails };
