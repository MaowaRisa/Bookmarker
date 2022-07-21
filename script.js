const bookmarkForm = document.getElementById("bookmarkForm");
const bookmarkRows = document.querySelectorAll('.b_marks');
const bookmarkResultsTbl = document.getElementById("bookmarkResults");


bookmarkForm.addEventListener('submit',(e)=>{
    saveBookmark(e); 
});
// localStorage.clear();
fetchBookmarks();
function saveBookmark(e){
    //Get Values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    updateLs(bookmark);
    // Prevent form from submitting 
    e.preventDefault();
}

function updateLs(bookmark){
    // get bookmark from ls
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if(bookmarks === null){
        var bookmarkList = [];
        bookmarkList.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
        createRow(bookmark.name, bookmark.url);
    }else{
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        createRow(bookmark.name, bookmark.url);
    }

}
function createRow(name, url){
    var tr = document.createElement("tr");
            
    tr.innerHTML = `
        <td>${name}</td>
        <td><a class="btn btn-primary" href="${url}">Visit</a></td>
        <td><a class="btn btn-danger" onclick="deleteBookmark('${url}')">Delete</a></td>
    `
    bookmarkResultsTbl.appendChild(tr);
}
// localStorage.clear();
function fetchBookmarks(){
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (bookmarks){
        for(let i=0; i < bookmarks.length; i++){
            let name = bookmarks[i].name;
            let url = bookmarks[i].url;
            createRow(name, url);
        }
    }

}

function deleteBookmark(url){
 
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(let i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // clear rows
    // console.log(bookmarkResultsTbl.getElementsByTagName('tr')[1].remove());
    clearTbl();
    fetchBookmarks();
}
function clearTbl(){
    // debugger;
    var rowCount = bookmarkResultsTbl.getElementsByTagName('tr').length;
    let i = 1;
    while(rowCount > 1){
        console.log(bookmarkResultsTbl.getElementsByTagName('tr'))

        bookmarkResultsTbl.getElementsByTagName('tr')[rowCount-1].remove();
        rowCount--;
        i++;
    }
    // for (let i = 0; i<=rowCount; i++){
    //     bookmarkResultsTbl.getElementsByTagName('tr').remove();
    //     rowCount--;
    // }
}