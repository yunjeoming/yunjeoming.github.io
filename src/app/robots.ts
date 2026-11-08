import { MetadataRoute } from 'next';
import { Constants } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${Constants.URL}/sitemap.xml`,
  };
}

export const dynamic = 'force-static';
