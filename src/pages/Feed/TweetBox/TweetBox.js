import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import './Tweetbox.css';
import axios from 'axios';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const TweetBox = () => {

    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loggedInUser] = useLoggedInUser();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [user] = useAuthState(auth);

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    const email = user?.email;
    const handleUploadImage =(e)=>{
        setIsLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.set('image', image);
        
        axios.post("https://api.imgbb.com/1/upload?key=1338bfbea4d79e5189c47a911309ba40", formData)
            .then( res=> {
                setImageURL(res.data.data.display_url);
                console.log(res.data.data.display_url);
                setIsLoading(false);
            })
            .catch((error)=>{
                console.log(error);
                setIsLoading(false);
            })
    
    }

  const handleTweet = (e) =>{
    e.preventDefault();
    if(user.providerData[0].providerId){
        fetch(`https://twitter-app-clone-2rga.onrender.com/loggedInUser?email=${email}`)
        .then(res => res.json())
        .then(data=>{
            setName(data[0]?.name);
            setUsername(data[0]?.username);
        })
    }
    else{
        setName(user?.displayName);
        setUsername(email?.split('@')[0]);
    }
    if(name){
        const userPost = {
           profilePhoto: userProfilePic,
           post: post,
           photo: imageURL,
           username: username,
           name: name,
           email: email
        }

        setPost('');
        setImageURL('');
        console.log(userPost);
        fetch(`https://twitter-app-clone-2rga.onrender.com/post`,{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userPost)
        })
    .then(res=> res.json())
    .then(data => {
        console.log(data)
    })
    }
  }

  return (
    <div className='tweetBox'>
        <form onSubmit={handleTweet}>
            <div className='tweetBox_input'>
                <Avatar src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'/>
                <input 
                   type="text"
                   placeholder="What's happening?"
                   className='tweetBox_imageInput'
                   onChange={(e)=>setPost(e.target.value)}
                   value={post}
                   required
                />
            </div>
            <div className='imageIcon_tweetButton'>
                <label htmlFor='image' className='imageIcon'>
                    {
                        isLoading? <p>Uploading image</p> : <p>{imageURL? 'image uploaded': <AddPhotoAlternateOutlinedIcon/>}</p>
                    }
                </label>
                <input
                   type='file'
                   id='image'
                   className='imageInput'
                   onChange={handleUploadImage}
                />
                <Button className='tweetBox_tweetButton' type='submit'>
                    Tweet
                </Button>
            </div>
        </form>
    </div>
  )
}

export default TweetBox