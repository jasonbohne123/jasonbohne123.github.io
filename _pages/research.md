---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}


### Publications

[1] Jason Bohne, David Rosenberg, Gary Kazantsev, and Pawel Polak. [Online Nonconvex Bilevel Optimization with Bregman Divergences](https://arxiv.org/pdf/2409.10470v1)


