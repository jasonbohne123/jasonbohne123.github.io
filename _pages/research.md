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


### Working Papers

### Technical Reports

[1] Jason Bohne. [Statistical Inference of Hidden Markov Models on High Frequency Quote Data](/files/si_tr.pdf)


[2] Jason Bohne, Jarryd Sculley, and Paul Vespe. [Multiple Kernel Learning on the Limit Order Book](/files/mkl_tr.pdf)


[3] Jason Bohne and Jarryd Sculley. [Mean Variance Optimization using Elastic Net Penalty](/files/mvo_tr.pdf)

*Jason Bohne and Jarryd Sculley*