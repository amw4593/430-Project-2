const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

//Handler for posting messages
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
//Generates the template for the posing form
const PostForm = (props) => {
    return (
        <form id="postForm"
            onSubmit={(e) => handlePost(e, props.triggerReload)}
            name="postForm"
            action="/post"
            method="POST"
            className="postForm"
        >
            <label htmlFor="content">Share your Thoughts:</label>
            <textarea id="postContent" name="content" rows="4" cols="50" placeholder="Write something..." />
            <input className="postSubmit" type="submit" value="Post" />
        </form>
    );
};
//Retrieves and showcases the posts when you subscribe to the premium version
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
//Creates the premium button
const PremiumButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>Premium</button>
    );
};
//Loads all post data into the app, also makes the button cycle the image 'ad' and post visibility (neither work)
const App = () => {
    const [reloadPosts, setReloadPosts] = useState(false);
    const [posts, setPosts] = useState([]);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const loadPostsFromServer = async () => {
            const response = await fetch('/getPosts');
            const data = await response.json();
            setPosts(data.posts);
        };
        loadPostsFromServer();
    }, [reloadPosts]);

    const handlePremiumClick = () => {
        setShowImage(true); 
        setReloadPosts(!reloadPosts);
    };

    return (
        <div>
            <PremiumButton onClick={handlePremiumClick} />
            
            {showImage && <img src="/hosted/img/google-ad-mockup.png" alt="Ad Mockup" />}

            <div id="makePost">
                <PostForm triggerReload={() => setReloadPosts(!reloadPosts)} />
            </div>
            <div id="posts">
                <PostList posts={[]} reloadPosts={reloadPosts} />
            </div>
        </div>
    );
};
//Initializes the App
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;
