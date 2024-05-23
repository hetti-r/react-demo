const Posts = ({ posts, setPublishedStatus }) => {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <h3>{post.title} written by {post.author}</h3>
                    <p>Date: {post.date}</p>
                    <p>{post.content}</p>
                    <p>
                        <strong>Status:</strong> {post.published ? "Published" : "unPublished"}
                        <br />
                        <button onClick={() => setPublishedStatus(post.id, post.published)}>
                            {post.published ? "UnPublish" : "Publish"}
                        </button>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Posts;