// Listen up form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var website = document.getElementById('siteName').value;
    var url = document.getElementById('siteUrl').value;

    // save bookmark values in json form
    var Bookmark = {
            name: website,
            siteUrl: url
        }
        // working with localstorage
    if (localStorage.getItem('Bookmarks') === null) {
        var Bookmarks = [];
        Bookmarks.push(Bookmark);
        localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
    } else {
        var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
        Bookmarks.push(Bookmark);
        localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
    }

    e.preventDefault();
    fetchBookmarks();

}

function fetchBookmarks() {
    var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));

    var append = document.getElementById('bookmarksResults');
    append.innerHTML = '';
    for (var i = 0; i < Bookmarks.length; i++) {
        var name = Bookmarks[i].name;
        var url = Bookmarks[i].siteUrl;
        append.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class="btn btn-primary" href=' + url + ' target="_blank">Visit</a>' +
            '</h3>' +
            '<a class="btn btn-danger" onclick="deleteBookmark(\'' + url + '\');">Delete</a>' +
            '</h3></div>';
    }
}

function deleteBookmark(url) {
    var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    for (i = 0; i < Bookmarks.length; i++) {
        if (Bookmarks[i].siteUrl == url) {
            Bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
    fetchBookmarks();


}