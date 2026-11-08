import { MetadataRoute } from 'next';
import { Constants } from '@/constants';
import { PostUtil } from '@/utils/post';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = [...PostUtil.getAllBlogPosts(), ...PostUtil.getAllMemoPosts()];
  const paths = [
    '', 'blog', 'memo', 'series',
    ...posts.map((post) => post._raw.flattenedPath),
    ...PostUtil.getAllBlogTags().map((tag) => `blog/tag/${encodeURIComponent(tag)}`),
    ...Object.keys(PostUtil.getAllSerieses()).map((title) => `series/${encodeURIComponent(title)}`),
  ];
  return paths.map((path) => ({ url: `${Constants.URL}/${path ? `${path}/` : ''}` }));
}

export const dynamic = 'force-static';
