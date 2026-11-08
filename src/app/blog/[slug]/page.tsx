import React from 'react';
import { Metadata } from 'next';
import { MdxPage } from '@/components/mdx';
import { PageSlugProps } from '@/types/common';
import { PostUtil } from '@/utils/post';

export async function generateMetadata({ params }: PageSlugProps): Promise<Metadata> {
  const { slug } = await params;
  return PostUtil.getMetadataByPath(`blog/${slug}`);
}

const page = async ({ params }: PageSlugProps) => {
  const { slug } = await params;
  const post = PostUtil.getIPostByPath(`blog/${slug}`);
  return <MdxPage post={post} />;
};

export default page;

export const dynamicParams = false;

export function generateStaticParams() {
  return PostUtil.getAllBlogPosts().map((post) => ({ slug: post._raw.flattenedPath.split('/')[1] }));
}
