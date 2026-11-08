# Yun’s blog — GitHub Pages

배포 주소: https://yunjeoming.github.io

기존 `yuns-blog`의 Next.js / Contentlayer / MDX 블로그를 정적 사이트로 옮긴 저장소입니다.
로컬 폴더 이름은 `github.io`, GitHub 저장소 이름은 `yunjeoming.github.io`입니다.

## 로컬 실행

Node.js 22와 Yarn 1을 사용합니다.

```sh
nvm use
corepack enable
yarn install --frozen-lockfile
yarn dev
```

## 정적 빌드 및 미리보기

```sh
yarn build
yarn start
```

빌드 결과는 `out/`에 생성됩니다. 글은 `posts/blog` 또는 `posts/memo`에 MDX로 추가하고,
`isPublished: true`로 설정합니다. 이미지는 `public/`에 넣습니다.
글·태그·시리즈·프로젝트 경로는 빌드 시 생성되며 새 글을 추가하면 다시 배포해야 합니다.

## 배포

1. `yunjeoming` 계정으로 GitHub에 인증합니다 (`gh auth login`).
2. 원격 저장소 `yunjeoming/yunjeoming.github.io`에 `main` 브랜치를 push합니다.
3. GitHub 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정합니다.
4. Actions의 `Deploy GitHub Pages` 실행 결과를 확인합니다.

이후 `main`에 push하면 자동 배포됩니다. 별도의 배포 토큰은 필요 없습니다.
GitHub Pages에서 지원하지 않는 서버 이미지 최적화는 끄고 원본 이미지를 사용합니다.
기존 Giscus 댓글 저장소(`yunjeoming/yuns-blog`)는 유지합니다.
이 작업은 기존 Google 호스팅이나 도메인/DNS 설정을 변경하지 않습니다.
