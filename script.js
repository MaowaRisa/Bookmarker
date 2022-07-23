const bookmarkForm = document.getElementById("bookmarkForm");
const bookmarkRows = document.querySelectorAll('.b_marks');
const bookmarkResultsTbl = document.getElementById("bookmarkResults");
// Site Url properties
const protocol = document.getElementById("protocol");
// const domainName = document.getElementById("domainName").value;
const domainName = document.getElementById("domainName");
const extension = document.getElementById("extension");

fetchBookmarks();
bookmarkForm.addEventListener('submit',(e)=>{
    saveBookmark(e);   
    e.preventDefault();
});

function saveBookmark(e){
    //Get Values
    var siteName = document.getElementById("siteName");
    // var siteUrl = document.getElementById("siteUrl").value;
    var siteUrl = setUrl();
    
    
    var bookmark = {
        name: siteName.value,
        url: siteUrl
    }
    
    updateLs(bookmark);
    siteName.value = '';
    protocol.checked = true;
    domainName.value = '';
    extension.value = '.com';
    // Prevent form from submitting 
    e.preventDefault();
}
function setUrl(){
    var siteUrl = '';

    if(domainName.value.includes("http") || domainName.value.includes("www")){
        siteUrl = domainName.value;
    }else{
        // console.log("false");
        if(protocol.checked){
            siteUrl = 'https://www.' + domainName.value + extension.value;
        }else{
            siteUrl = 'http://www.' + domainName.value + extension.value;
        }
    }
    return siteUrl;
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
        <td><a class="btn btn-primary" href="${url}" target="_blank" >Visit</a></td>
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