var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteURLInput = document.getElementById("websiteURL");

var allBookmarks = []
if (localStorage.getItem("all") != null) {
    allBookmarks = JSON.parse(localStorage.getItem("all"));
    display()
}


function getValue() {
    if (bookmarkNameInput.value && websiteURLInput.value) {

        var urlValue = websiteURLInput.value.toLowerCase();

        var urlRegex = new RegExp("^(https:\/\/|http:\/\/)(www\.)?[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$");

        if (urlValue.match(urlRegex)) {
            var isDuplicate = false;
            for (var i = 0; i < allBookmarks.length; i++) {
                if (
                    allBookmarks[i].name.toLowerCase() === bookmarkNameInput.value.toLowerCase() ||
                    allBookmarks[i].url === urlValue
                ) {
                    isDuplicate = true;
                    break;
                }
            }

            if (isDuplicate) {
                swal("This bookmark already exists. Please enter a different name and URL.");
            } else {
                var bookmark = {
                    name: bookmarkNameInput.value,
                    url: urlValue,
                };

                allBookmarks.push(bookmark);
                localStorage.setItem("all", JSON.stringify(allBookmarks));
                clearInputs();
                display();
            }
        } else {
            swal("Please input a valid URL that starts with http:// or https:// and contains a valid domain ending like .com or .net");
        }
    } else {
        swal("Please input a value");
    }
}

function clearInputs() {

    bookmarkNameInput.value = "";
    websiteURLInput.value = "";
}

function display() {

    var box = ""

    for (var i = 0; i < allBookmarks.length; i++) {

        box += `
        <tr class="text-center">
            <td>${i + 1}</td>
            <td>${allBookmarks[i].name}</td>
            <td>
            <a href="${allBookmarks[i].url}" class="btn btn-visit text-white"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
            </td>
            <td>
            <button class="btn btn-delete text-white" onclick="removeBookmark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
            </td>
        </tr>
                `
    }
    document.getElementById("rows").innerHTML = box
}

function removeBookmark(index) {

    allBookmarks.splice(index, 1)
    localStorage.setItem("all", JSON.stringify(allBookmarks))
    display()
}
