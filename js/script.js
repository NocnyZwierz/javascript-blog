'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });
{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      // czy tutaj coś mam pominięte? dwa razy przelecałem przez modół

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      html = html + linkHTML;
      console.log(html);
    }
    titleList.innerHTML = html;
    // https://stackoverflow.com/questions/74992026/function-doesnt-want-to-execute-js **
    const links = document.querySelectorAll('.titles a');
    for (let link of links) { // wywołanie naszej funkcji bez tego nie działa
      link.addEventListener('click', titleClickHandler);
    }
  }

  function titleClickHandler(event) { // ** sprawdź link co jest wyżej ** jak jest dodany parametr do tej funkcji "event" w console.log już nie pokazjue że jest "'event' is deprecated." czy to jest coś poważnego?

    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this; //nie dokońca romuzmiem działanie this
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }

  generateTitleLinks();
}
