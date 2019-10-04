// Saves options to chrome.storage
function save_options() {
  var showFeeds = document.getElementById("showFeeds").checked;
  var feedInsight = document.getElementById("feedInsight").checked;
  var feedVc = document.getElementById("feedVc").checked;
  
  chrome.storage.sync.set(
    {
      showFeeds: showFeeds,
      feedInsight: feedInsight,
      feedVc: feedVc
    },
    function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value feeds = all and showFeeds = true.
  chrome.storage.sync.get(
    {
      showFeeds: true,
      feedInsight: true,
      feedVc: true
    },
    function(items) {
      document.getElementById("showFeeds").checked = items.showFeeds;
      document.getElementById("feedInsight").checked = items.feedInsight;
      document.getElementById("feedVc").checked = items.feedVc;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
