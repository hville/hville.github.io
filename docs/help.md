# Help

## github pages

* [domain](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site)
* [markdown-to-github-pages](https://nicolas-van.github.io/easy-markdown-to-github-pages/)
* [https://pages.github.com/versions/](https://pages.github.com/versions/)

## plugins

* [front-matter](https://jekyllrb.com/docs/front-matter/) for variables
* [jekyll-gist](https://github.com/jekyll/jekyll-gist) for `{% gist xxx %}` to include script tag
  * `{% gist xxx %} -> <script src="https://gist.github.com/dfd408a602ec3d8d95e1adb6fe21cd04.js"> </script>`
  * `{% gist xxx name.md %} -> <script src="https://gist.github.com/dfd408a602ec3d8d95e1adb6fe21cd04.js?name.md"> </script>`
  * display only instead of inline code block
* [github-metadata](https://github.com/jekyll/github-metadata) to set
  * `site.title = repository name`
  * `site.description = repository tagline`
  * `site.url = GitHub Pages domain (cname or user domain)`
  * `site.baseurl = project name`
* [jekyll-titles-from-headings](https://github.com/benbalter/jekyll-titles-from-headings) to set
  * `page.title = first header`
* [jekyll-relative-links](https://github.com/benbalter/jekyll-relative-links)

## guide

* [HankQuinlan](http://jmcglone.com/guides/github-pages/)

## code

* [html repl](https://repl.it/languages/html)
