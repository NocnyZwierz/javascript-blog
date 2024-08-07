'use strict';

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html += linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li> ';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();
  //not o jazda

  function generateAuthors (){
    //zaciagamy całą listę
    const articles = document.querySelectorAll(optArticleSelector);
    //jedziemy po autorach
    for (let article of articles) {
      //wraper
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      //łapiemy ich atrubuty
      const articleAuthor = article.getAttribute('data-author');
      //linkujemy
      const linkHTML = '<a href="#author-' + articleAuthor.replace(' ', '-') + '">' + articleAuthor + '</a>';
      //link
      authorWrapper.innerHTML = linkHTML;
    }
  }
  generateAuthors();

  function authorClickHandler(event) {
    //blokowanie domyślnej akcji jak wyżej
    event.preventDefault();
    //clickedElement jako element który został kliknienty
    const clickedElement = this;
    // zaciagamy atrybut href
    const href = clickedElement.getAttribute('href');
    // Wyciąga nazwę autora z href, zamieniając #author- na pusty ciąg i zamieniając '-' na spację potem leci do generateTitleLinks
    const author = href.replace('#author-', '').replace('-', ' ');
    //lecimy po wszystkie atywne linki od autorów i usuwamy active
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }
    //dany autor dostaje klasę active
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    //zgodnie z poleceniem wywołujemy funkcę generateTitleLinks które filtruje według autora listę artykółów
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    //szykamy wszytkich linków do autorów
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    //nasuchjemy zdazenia kliknięcia ak wyzej musi być bo nie zadziała.
    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();

}
