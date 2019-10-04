/* Constants and global vars */
var listId = "feed";
var linkText = "Read more";
var showFeeds = true;
var feedInsight = true;
var feedVc = true;
var urls = [];

/* Controller entry point */
function init() {
  loadOptions();

  // Wait for page to load and DOM to be ready to hook up handler
  window.setTimeout(function() {
    (document.getElementById("search-csu-icon").onclick = function() {
      submitForm();
    }), 0;
  });
}

function loadOptions() {
  chrome.storage.sync.get(
    {
      showFeeds: true,
      feedInsight: true,
      feedVc: true
    },
    function(items) {
      showFeeds = items.showFeeds;
      feedInsight = items.feedInsight;
      feedVc = items.feedVc;

      if (feedInsight) {
        urls.push("https://insight.futurestudents.csu.edu.au/wp-json/wp/v2/posts?per+page=5");
      }
      if (feedVc) {
        urls.push("https://blog.csu.edu.au/wp-json/wp/v2/posts?per+page=3");
      }
      if (!showFeeds) {
        urls.length = 0;
      }

      urls.forEach(function(url) {
        loadData(url, listId);
      });
    }
  );
}

/* Load feed data via native XHR - no external dependencies */
function loadData(url, listId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      var list = document.getElementById(listId);
      processFeed(data, list);
    }
  };
  xhr.send();
}

/* Feed item renderer */
function processFeed(data, list) {
  data.forEach(function(item) {
    var listItem = document.createElement("li");

    var heading = document.createElement("h3");
    heading.innerHTML = item.title.rendered;
    listItem.appendChild(heading);

    var excerpt = document.createElement("p");
    excerpt.innerHTML = item.excerpt.rendered;
    listItem.appendChild(excerpt);

    var link = document.createElement("a");
    link.appendChild(document.createTextNode(linkText));
    link.setAttribute("class", "link");
    link.setAttribute("href", item.link);
    listItem.appendChild(link);

    list.appendChild(listItem);
  });
}

function submitForm() {
  document.getElementById("search-csu-form").submit();
}

/* Execute init and kick things off */
init();
