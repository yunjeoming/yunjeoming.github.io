"""Check generated Pages artifacts after yarn build, without external dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
import xml.etree.ElementTree as ET

ROOT = Path('out')
BASE = 'https://yunjeoming.github.io/'


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.images = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.hrefs.append(attrs['href'])
        if tag == 'img' and 'src' in attrs:
            self.images.append(attrs['src'])


def exists(path):
    target = ROOT / unquote(path).lstrip('/')
    return target.is_file() or (target / 'index.html').is_file()


assert (ROOT / 'index.html').is_file(), 'Run yarn build first'
checked = 0
for page in ROOT.rglob('*.html'):
    if page.name == '404.html':
        continue
    url = BASE + str(page.relative_to(ROOT)).removesuffix('index.html')
    parser = Links()
    parser.feed(page.read_text())
    for href in parser.hrefs:
        target = urlparse(urljoin(url, href))
        if target.netloc == urlparse(BASE).netloc:
            assert exists(target.path), f'{page}: broken link {href}'
            checked += 1
    for src in parser.images:
        if src.startswith('/'):
            assert exists(urlparse(src).path), f'{page}: missing image {src}'

for path in ['portfolio/index.html', 'resume/index.html']:
    assert not (ROOT / path).exists(), f'Draft published: {path}'
assert not (ROOT / 'portfolio').exists(), 'Draft detail pages published'
for loc in ET.parse(ROOT / 'sitemap.xml').getroot().iter(
        '{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
    target = urlparse(loc.text)
    assert target.path.endswith('/'), loc.text
    assert exists(target.path), loc.text
print(f'PASS: {checked} internal links, images, draft exclusions and sitemap')
