---
title: ":-1: asciimath"
date: 2015-05-18
layout: post
mathjax: true
---

Pour préparer la page sur l'[inharmonicité](/blog/2015/0516inharmonicity) j'ai essayé quelques formats de représentation mathématique différents:

* [latex-project.org](https://www.latex-project.org/) $F = \frac 1 {2L} \sqrt \frac T M$
  * *+* excellent résultat pour le lecteur
  * *-* difficultés avec les accents (*éàçè...*)
  * *-* difficile à lire et écrire lors de la création: `F = \frac 1 {2L} \sqrt \frac T M`
* [asciimath.org](http://asciimath.org/)
  * *+* excellent résultat pour le lecteur (quand ça marche)
  * *~* en principe, plus facile à lire et écrire: `F = 1/(2L) sqrt (T/M)`
  * :skull: en pratique, supporte très mal les noms de variable qui se confondent avec les symboles
* [texte+unicode](https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode):
  * *+* facile à lire et écrire *Fréquence = 1/(2L) √(Tension/MasseUnitaire)*
  * *~* limité à des expressions plus simples
* code (javascript): `frequence =  Math.sqrt(tension/masseUnitaire) / longueur / 2`
  * *~* limité à des expression plus simples
  * *~* [github.io](https://pages.github.com/) supporte mal les accents dans les blocs de code
  * *+* la formule peux être plus facilement testé et/ou utilisé

*TeX/latex* et *asciimath* sont disponible grâce à [mathjax.org](https://www.mathjax.org/). D'autres formats existent, comme par exemple unicodeMath, mais difficile à supporter pour ce site.
