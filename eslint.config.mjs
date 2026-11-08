import next from 'eslint-config-next';

const config = [
  ...next,
  { ignores: ['.next/**', '.contentlayer/**', 'out/**', 'next-env.d.ts'] },
];

export default config;
