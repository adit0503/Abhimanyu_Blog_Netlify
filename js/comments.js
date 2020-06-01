var firebaseConfig = {
  apiKey: "AIzaSyBP8wa7tkkrNa0LzYPbAqzkBqE6W0Xc3gY",
  authDomain: "abhimanyu-comments.firebaseapp.com",
  databaseURL: "https://abhimanyu-comments.firebaseio.com",
  projectId: "abhimanyu-comments",
  storageBucket: "abhimanyu-comments.appspot.com",
  messagingSenderId: "345488094437",
  appId: "1:345488094437:web:2367cac6215c8505f5900c"
};
firebase.initializeApp(firebaseConfig);

const rootRef = firebase.database().ref();
const commentsRef = rootRef.child("comments");

document.getElementById("btnSubmitComment").addEventListener("click", function () {
    var newPostRef = commentsRef.push();
    newPostRef.set({
        name: document.getElementById("tbName").value.trim(),
        comment: document.getElementById("txComment").value.trim(),
        frompage: location.pathname,
        when: firebase.database.ServerValue.TIMESTAMP
    });
});

function showpastcomments() {
var showat = document.getElementById('pastcomments');
var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
commentsRef.once('value', function (snapshot) {
    snapshot.forEach(function (itemSnapshot) {
        var itemData = itemSnapshot.val();
        var comment = itemData.comment;
        var name = itemData.name;
        var when = new Date(itemData.when).toLocaleDateString("en");
        showat.innerHTML += "<li>" + comment + "  <span> " + name + " (" + when +
            ")</span></li><hr>";
          })
      })
  }

showpastcomments()
