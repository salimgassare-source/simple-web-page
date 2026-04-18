// Store current editing post
let editingId = null;


// =======================
// AUTH FUNCTIONS
// =======================

// SIGNUP
function signup() {
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.text())
    .then(data => alert(data));
}


// LOGIN
function login() {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("token", data.token);
        alert("Login successful");
    });
}


// =======================
// POSTS (CRUD)
// =======================

// LOAD POSTS
function loadPosts() {
    fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(data => {
            const postsDiv = document.getElementById("posts");
            postsDiv.innerHTML = "";

            data.forEach(post => {
                postsDiv.innerHTML += `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>

                    <button onclick="editPost('${post._id}', '${post.title}', '${post.content}')">Edit</button>
                    <button onclick="deletePost('${post._id}')">Delete</button>
                </div>
                `;
            });
        });
}


// CREATE or UPDATE POST
function addOrUpdatePost() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        return;
    }

    if (editingId) {
        // UPDATE
        fetch(`http://localhost:3000/posts/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ title, content })
        })
        .then(() => {
            editingId = null;
            loadPosts();
        });

    } else {
        // CREATE
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ title, content })
        })
        .then(() => loadPosts());
    }

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}


// EDIT
function editPost(id, title, content) {
    document.getElementById("title").value = title;
    document.getElementById("content").value = content;
    editingId = id;
}


// DELETE
function deletePost(id) {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        return;
    }

    fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    })
    .then(() => loadPosts());
}


// =======================
// INIT
// =======================

loadPosts();




