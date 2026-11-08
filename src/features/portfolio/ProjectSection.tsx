import { FC } from 'react';
import type { ProjectSection as ProjectSectionProps } from '@/types/portfolio';
import Project from './Project';
import { H3 } from '../../components/title';

const ProjectSection: FC<ProjectSectionProps> = ({ type, projects }) => {
  return (
    <section className="w-full">
      <H3>{type}</H3>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Project key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
