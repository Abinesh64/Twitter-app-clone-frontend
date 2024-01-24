import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Lists from './pages/Lists/Lists';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import Feed from './pages/Feed/Feed'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} >
            <Route index element={<Feed />} />
          </Route>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route path="feed" element={<Feed/>} />
            <Route path="explore" element={<Explore/>} />
            <Route path="notifications" element={<Notifications/>} />
            <Route path="messages" element={<Messages />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="lists" element={<Lists />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="more" element={<More/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
