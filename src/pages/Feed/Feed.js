import React, { useEffect, useState } from "react";
import "./feed.css";
import TweetBox from "./TweetBox/TweetBox";
import Post from './Post/Post'

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch(`https://twitter-app-clone-2rga.onrender.com/post`)
        .then((res)=>res.json())
        .then(data => {
            setPosts(data);
            console.log(data)
        })
    },[])

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {
                posts.map( p => <Post key={p._id} props={p}/>)
            }
        </div>

    )

}

export default Feed