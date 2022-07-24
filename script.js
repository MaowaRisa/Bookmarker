const bookmarkForm = document.getElementById("bookmarkForm");
const bookmarkRows = document.querySelectorAll('.b_marks');
const bookmarkResultsTbl = document.getElementById("bookmarkResults");
const modalSectionEl = document.getElementById("modalSection");

// Site Url properties
const protocol = document.getElementById("protocol");
const domainName = document.getElementById("domainName");
const extension = document.getElementById("extension");



fetchBookmarks();
bookmarkForm.addEventListener('submit',(e)=>{
    saveBookmark(e);   
});

function saveBookmark(e){
    //Get Values
    const bookmarkId = JSON.parse(localStorage.getItem('bookmarks')).length + 1;
    // var id = rowCount;
    var siteName = document.getElementById("siteName");
    var siteUrl = setUrl();

    if(siteName.value == '' || siteUrl == ''){
        const errorEl = document.getElementById("error");
        errorEl.innerText = `* Enter website name and url`;
    }else{
        var bookmark = {
            id: bookmarkId,
            name: siteName.value,
            url: siteUrl
        }
        // save to LS
        updateLs(bookmark);

        // clear input fields
        siteName.value = '';
        protocol.checked = true;
        domainName.value = '';
        extension.value = '.com';
    }

    
    // Prevent form from submitting 
    e.preventDefault();
}
function setUrl(){
    var siteUrl = '';
    if(!domainName.value == ''){
        if(domainName.value.includes("http") || domainName.value.includes("www")){
            siteUrl = domainName.value;
        }else{
            if(protocol.checked){
                siteUrl = 'https://www.' + domainName.value + extension.value;
            }else{
                siteUrl = 'http://www.' + domainName.value + extension.value;
            }
        }
    }
    return siteUrl;
}

function updateLs(bookmark){
    // get bookmark from ls
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarkResultsTbl.style.display = '';

    if(bookmarks === null){
        var bookmarkList = [];
        bookmarkList.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));

        createRow(bookmark.id, bookmark.name, bookmark.url);
    }else{
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        createRow(bookmark.id, bookmark.name, bookmark.url);
    }


}
function createRow(id, name, url){
    var tr = document.createElement("tr");
     
    tr.innerHTML = `
        <td id="bookmark_${id}">${id}</td>
        <td>${name}</td>
        <td>${url}</td>
        <td style="text-align:left;"><a class="btn btn-info" href="${url}" target="_blank">Visit</a></td>
        <td>
            <a class="btn btn-primary" onclick="EditBookmark('${id}')">Change</a>
            <a class="btn btn-danger" onclick="deleteBookmark('${id}')">Delete</a>
        </td>
    `
    bookmarkResultsTbl.appendChild(tr);
}

function fetchBookmarks(){
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if(bookmarks.length == 0){
        bookmarkResultsTbl.style.display = 'none';
    }
    if (bookmarks){
        for(let i=0; i < bookmarks.length; i++){
            let id = bookmarks[i].id;
            let name = bookmarks[i].name;
            let url = bookmarks[i].url;
            createRow(id, name, url);
        }
    }

}
function EditBookmark(bookmarkId){
    console.log(bookmarkId);
}

function deleteBookmark(Id){
    //check modal class
    const confirmation = document.getElementById("confirmation");
    if(!confirmation.classList.contains("modal-open")){
        confirmation.classList.add("modal-open");
        const modalFooterEl = document.createElement('div');
        modalFooterEl.classList.add('modalFooter');

        modalFooterEl.innerHTML = `
            <button class="modalBtn" onclick="Cancel()">Cancel</button>
            <button class="modalBtn modalConfirmBtn" onclick="confirmDelete(${Id})">Delete</button>
        `;

        modalSectionEl.appendChild(modalFooterEl);
        
    }
    
}
function confirmDelete(Id){

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i=0; i<bookmarks.length; i++){
        if(bookmarks[i].id == Id){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    clearTbl();

    fetchBookmarks();

    Cancel();
}
function clearTbl(){
    // debugger;
    var rowCount = bookmarkResultsTbl.getElementsByTagName('tr').length;
    let i = 1;
    while(rowCount > 1){
        bookmarkResultsTbl.getElementsByTagName('tr')[rowCount-1].remove();
        rowCount--;
        i++;
    }
}
function Cancel(){
    document.querySelector('.modalFooter').remove();
    let confirmation = document.getElementById("confirmation");
    confirmation.classList.remove("modal-open");
}
