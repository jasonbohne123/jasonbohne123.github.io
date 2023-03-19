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

[1] Statistical Inference of Hidden Markov Models on High Frequency Quote Data [pdf](/files/si_tr.pdf)
  - *Jason Bohne*

[2] Multiple Kernel Learning on the Limit Order Book  [pdf](/files/mkl_tr.pdf) 
- *Jason Bohne, Jarryd Sculley, and Paul Vespe*

[3] Mean Variance Optimization using Elastic Net Penalty [pdf](/files/mvo_tr.pdf)
- *Jason Bohne and Jarryd Sculley*