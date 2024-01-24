import React, { useState } from 'react';
import './sidebar.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import SidebarOptions from './SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreIcon from '@mui/icons-material/More';
import DoneIcon from '@mui/icons-material/Done';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CustomeLink from './CustomeLink';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({handleLogout, user}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser] = useLoggedInUser();
  const navigate = useNavigate();
  // console.log(loggedInUser[0]);
  const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'

  const handleClick = e =>{
    setAnchorEl(e.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const result = user[0]?.email?.split('@')[0];
  
  return (
    <div className='sidebar'>
      <TwitterIcon className='sidebar_twitterIcon'/>
        <CustomeLink to='/home/feed'>
          <SidebarOptions active Icon={HomeIcon} text="Home" />
        </CustomeLink>
        <CustomeLink to='/home/explore'>
          <SidebarOptions Icon={SearchIcon} text="Explore" />
        </CustomeLink>
        <CustomeLink to='/home/notifications'>
          <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
        </CustomeLink>
        <CustomeLink to='/home/messages'>
          <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
        </CustomeLink>
        <CustomeLink to='/home/bookmarks'>
          <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
        </CustomeLink>
        <CustomeLink to='/home/lists'>
          <SidebarOptions Icon={ListAltIcon} text="Lists" />
        </CustomeLink>
        <CustomeLink to='/home/profile'>
          <SidebarOptions Icon={PermIdentityIcon} text="Profile" />
        </CustomeLink>
        <CustomeLink to='/home/more'>
          <SidebarOptions Icon={MoreIcon} text="More" />
        </CustomeLink>
      <Button variant='outlined' className='sidebar_tweet'  onClick={() => navigate('/')}>
        Tweet
      </Button>

      <div className='Profile_info'>
        <Avatar src={userProfilePic} />
        <div className='user_info'>
          <h4>
          {
            loggedInUser[0]?.name ? 
              loggedInUser[0]?.name : 
              user && user[0].displayName
          }

          </h4>
          <h5>
          @{loggedInUser[0]?.username ? 
                        loggedInUser[0]?.username :result}
          </h5>
        </div>
        <IconButton 
          size='small'
          sx={{ ml:2 }}
          aria-controls={openMenu?"basic-menu":undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true": undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} >
          <MenuItem className='Profile_info1'>
            <Avatar src={userProfilePic? userProfilePic : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} />
              <div className='user_info subUser_info'>
                <div>
                  <h4>
                    {
                      loggedInUser[0]?.name ? 
                        loggedInUser[0]?.name : user && user[0]?.displayName
                    }
                  </h4>
                  <h5>
                    @{loggedInUser[0]?.username ? 
                        loggedInUser[0]?.username :result}
                  </h5>
                </div>
                <ListItemIcon className='done_icon' color='blue'>
                  <DoneIcon/>
                </ListItemIcon>
              </div>
          </MenuItem>
          <Divider/>
            <MenuItem onClick={handleClose}>Add an existing account</MenuItem> 
            <MenuItem onClick={handleLogout}>
              LogOut @{loggedInUser[0]?.username ? loggedInUser[0]?.username :result}
            </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar