import React from 'react';
import { BasicLayout } from '@/layouts';
import { PageTagProps } from '@/types/common';
import { PostUtil } from '@/utils/post';
import { Posts } from '@/components/post';
import { Aside } from '@/layouts/aside';

const page = async ({ params }: PageTagProps) => {
  const { tagName } = await params;
  const decodedTag = decodeURIComponent(tagName);
  const postMetas = PostUtil.getBlogPostMetasByTag(decodedTag);

  return (
    <BasicLayout>
      <Aside />
      <Posts postMetas={postMetas} selectedTitle={decodedTag} isTag={true} />
    </BasicLayout>
  );
};

export default page;

export const dynamicParams = false;

export function generateStaticParams() {
  return PostUtil.getAllBlogTags().map((tagName) => ({ tagName }));
}
