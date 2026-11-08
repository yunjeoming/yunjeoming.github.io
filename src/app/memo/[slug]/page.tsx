import type { Metadata } from 'next';
import React from 'react';
import { PageSlugProps } from '@/types/common';
import { MdxPage } from '@/components/mdx';
import { PostUtil } from '@/utils/post';

export async function generateMetadata({ params }: PageSlugProps): Promise<Metadata> {
  const { slug } = await params;
  return PostUtil.getMetadataByPath(`memo/${slug}`);
}

const page = async ({ params }: PageSlugProps) => {
  const { slug } = await params;
  const post = PostUtil.getIPostByPath(`memo/${slug}`);
  return <MdxPage post={post} />;
};

export default page;

export const dynamicParams = false;

export function generateStaticParams() {
  return PostUtil.getAllMemoPosts().map((post) => ({ slug: post._raw.flattenedPath.split('/')[1] }));
}
