let posts = JSON.parse(localStorage.getItem("posts")) || [];

displayPosts();

function addPost(){

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if(title === "" || content === ""){
        alert("Please write something");
        return;
    }

    let post = {
        title: title,
        content: content
    };

    posts.push(post);

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

function displayPosts(){

    let postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    posts.forEach((post, index) => {

        let postDiv = document.createElement("div");
        postDiv.className = "post";

        postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button onclick="deletePost(${index})">Delete</button>
        <button onclick="editPost(${index})">Edit</button>
        `;

        postsDiv.appendChild(postDiv);
    });
}

function deletePost(index){

    posts.splice(index,1);

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}

function editPost(index){

    let newTitle = prompt("Edit title", posts[index].title);
    let newContent = prompt("Edit content", posts[index].content);

    if(newTitle !== null && newContent !== null){

        posts[index].title = newTitle;
        posts[index].content = newContent;

        localStorage.setItem("posts", JSON.stringify(posts));

        displayPosts();
    }
}