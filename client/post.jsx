const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');


const handlePost = (e, onPostAdded) => {
    e.preventDefault();
    helper.hideError();

    const content = e.target.querySelector('#postContent').value;

    if (!content) {
        helper.handleError('Please enter something to post!');
        return false;
    }

    helper.sendPost(e.target.action, { content }, onPostAdded);
    return false;
};

const PostForm = (props) => {
    return (
        <form id="postForm"
            onSubmit={(e) => handlePost(e, props.triggerReload)}
            name="postForm"
            action="/post"
            method="POST"
            className="postForm"
        >
            <label htmlFor="content">Share your To-Do List:</label>
            <textarea id="postContent" name="content" rows="4" cols="50" placeholder="Write something..." />
            <input className="postSubmit" type="submit" value="Post" />
        </form>
    );
};

const PostList = (props) => {
    const [posts, setPosts] = useState(props.posts);

    useEffect(() => {
        const loadPostsFromServer = async () => {
            const response = await fetch('/getPosts');
            const data = await response.json();
            setPosts(data.posts);
        };
        loadPostsFromServer();
    }, [props.reloadPosts]);

    if (posts.length === 0) {
        return (
            <div className="postsList">
                <h3 className="emptyPost">No posts yet!</h3>
            </div>
        );
    }

    const postNodes = posts.map(post => {
        return (
            <div key={post.id} className="post">
                <p className="postContent">{post.content}</p>
            </div>
        );
    });

    return (
        <div className="postList">
            {postNodes}
        </div>
    );
};

const PremiumButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>Premium</button>
    );
};

const App = () => {
    const [reloadPosts, setReloadPosts] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPostsFromServer = async () => {
            const response = await fetch('/getPosts');
            const data = await response.json();
            setPosts(data.posts);
        };
        loadPostsFromServer();
    }, [reloadPosts]);

    const handlePremiumClick = () => {
        console.log("Premium feature activated!");
    };

    return (
        <div>
            <PremiumButton onClick={handlePremiumClick} />
            
            <div id="makePost">
                <PostForm triggerReload={() => setReloadPosts(!reloadPosts)} />
            </div>
            <div id="posts">
                <PostList posts={[]} reloadPosts={reloadPosts} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;
