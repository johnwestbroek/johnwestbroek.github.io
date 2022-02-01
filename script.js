
    // modified date page
    modDate     = document.lastModified;
    tsDate      = Date.parse(modDate)/1000;
    dateNote    = '<time datetime="'+ modDate +'" title="'+ modDate +'">'+ tsDate +'</time>';
    dateElement = document.getElementsByClassName("moddate");

    dateElement[0].innerHTML = dateNote;







    function load(url, callback){
      var xhr = new XMLHttpRequest();
      xhr.onloadend = function(e){
        callback(xhr);
      };
      xhr.open('GET', url);
      xhr.send();
  }

  var $body = document.body;
  var originalTitle = document.title;
  var originalUrl = window.location.href;

// if has js
  document.addEventListener('click', function(event) {

    if ( event.target.matches('.panel-close') || event.target.matches('.site__panel') ) {
      document.body.classList.remove("panel-loaded");
      document.documentElement.classList.remove("fixed");

       document.title = originalTitle;
       history.pushState(null, null, originalUrl);

    } else if ( event.target.matches('.panel-open') ) {
      event.preventDefault();
      var targetUrl = event.target.href

      //console.log(event.target.href);

      load(targetUrl, function(data) {
          var resp   = data.responseText;
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(resp,"text/html");
          var tds    = xmlDoc.querySelector(".page");

          var targetTitle = xmlDoc.querySelector("title").innerHTML;

          document.body.classList.add("panel-loaded");
          document.documentElement.classList.add("fixed");

          document.querySelector(".site__panel .page").innerHTML = tds.innerHTML;
          document.querySelector(".site__panel .page").scrollTo(0, 0);

          history.pushState(null, null, targetUrl);
          document.title = targetTitle;
      })

    }
    event.stopPropagation();
  }, false); // + loader, and check of document is there







function set_site_theme(scheme) {
  $body.setAttribute('data-theme', scheme);
  window.localStorage.setItem("site_theme", scheme);
}

let ColorSchemeOptions = document.querySelectorAll('[name="colorscheme"]')

ColorSchemeOptions.forEach((option) => {
  option.addEventListener('change', (event) => {
    if (event.target.checked) {
      var scheme = event.target.value;
    }
    if ( scheme ) { set_site_theme(scheme); }
  })
});

// READY
document.addEventListener("DOMContentLoaded", function(e) {
  // Set stored theme
  var stored_scheme = window.localStorage.getItem("site_theme");
  if ( stored_scheme ) {
    set_site_theme(stored_scheme);
    let theme_option = document.querySelector('input[name="colorscheme"][value="'+ stored_scheme +'"]');
    if ( theme_option ) { theme_option.checked = true; }
  }
});