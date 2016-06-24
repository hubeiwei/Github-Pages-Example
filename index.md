---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <h1>LaoHu</h1>
        <a href="https://github.com/hubeiwei/" target="_blank"><img src="https://assets-cdn.github.com/favicon.ico" alt="GitHub" width="25"/></a>
        <a href="http://weibo.com/hubeiwei/" target="_blank"><img src="http://www.weibo.com/favicon.ico" alt="weibo" width="25"/></a>
      </div>
      <div id="particles-js"></div>
    </div>

    <div class="index-content">
      <ul class="artical-list">
        {% for post in site.categories.blog %}
        <li>
          <a href="{{ post.url }}" class="title">{{ post.title }}</a>
          <div class="title-desc">{{ post.description }}</div>
        </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</body>
