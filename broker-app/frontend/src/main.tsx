import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './routes/App'
import Landing from './routes/Landing'
import Login from './routes/Login'
import Register from './routes/Register'
import Dashboard from './routes/Dashboard'
import MyListings from './routes/MyListings'
import Chats from './routes/Chats'
import Notifications from './routes/Notifications'
import PostListing from './routes/PostListing'
import Profile from './routes/Profile'
import Admin from './routes/Admin'
import AIPage from './routes/AI'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'dashboard', element: <Dashboard /> }
      ,{ path: 'my-listings', element: <MyListings /> }
      ,{ path: 'post', element: <PostListing /> }
      ,{ path: 'chats', element: <Chats /> }
      ,{ path: 'notifications', element: <Notifications /> }
      ,{ path: 'profile', element: <Profile /> }
      ,{ path: 'admin', element: <Admin /> }
      ,{ path: 'ai', element: <AIPage /> }
      ,{ path: 'landing', element: <Landing /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


