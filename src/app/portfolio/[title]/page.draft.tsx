import { projectsData } from '@/constants/projectsData';
import { H1, H3 } from '@/components/title';
import React from 'react';

const page = async ({ params }: { params: Promise<{ title: string }> }) => {
  const { title } = await params;
  return (
    <div className="w-full flex flex-col gap-4">
      <H1>{decodeURIComponent(title)}</H1>
      <p className="border p-4">
        프로젝트 간단 설명. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ratione culpa beatae
        vitae, reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ratione culpa beatae
        vitae, reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ratione culpa beatae
        vitae, reiciendis
      </p>
      <div>
        <H3 underline thickness="medium">
          Link
        </H3>
        <div>
          <div>view site</div>
          <div>view github</div>
        </div>
      </div>
      <div>
        <H3 underline thickness="medium">
          Tools
        </H3>
        <div>do sth</div>
      </div>
      <div>
        <H3 underline thickness="medium">
          담당 역할
        </H3>
        <div>do sth</div>
      </div>
      <div>
        <H3 underline thickness="medium">
          회고 및 후기
        </H3>
        <div>do sth</div>
      </div>
      <div>
        <H3 underline thickness="medium">
          미리 보기
        </H3>
        <div>do sth</div>
      </div>
    </div>
  );
};

export default page;

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from(new Set(projectsData.flatMap((group) => group.projects.map((project) => project.title)))).map((title) => ({ title }));
}
