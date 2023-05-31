/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getProjects } from '../api/projectData';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../utils/context/authContext';

export default function Projects() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    getProjects(user.uid).then(setProjects);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="text-center my-4 text-white">
      <h1>PROJECTS</h1>
      <hr />
      <Link href="/projects/new" passHref>
        <Button>Add A Project</Button>
      </Link>
      <div className="text-center my-4 d-flex flex-wrap">
        {projects.map((project) => (
          <ProjectCard key={project.firebaseKey} projectObj={project} onUpdate={getAllProjects} />
        ))}
      </div>
    </div>
  );
}
