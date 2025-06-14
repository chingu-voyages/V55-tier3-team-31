import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import List from './pages/resourceList.jsx';
import Login from './pages/login.jsx';
import Profile from './pages/profile.jsx';
import Recommended from './pages/recommended.jsx';
import Popular from './pages/popular.jsx';
import NotFound from './pages/notFound.jsx';
import PrivateRoute from './components/privateRoute.jsx';

const RouteComp = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login';
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <section className={`${isAuthPage ? 'h-[calc(100vh-215px)] flex items-center' : 'h-[calc(100vh-180px)]'} full-width pl-20 pr-20  overflow-auto`}>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                    <PrivateRoute user={user}>
                        <Profile />
                    </PrivateRoute>
                } />
                <Route path="/recommended" element={
                    <PrivateRoute user={user}>
                        <Recommended />
                    </PrivateRoute>
                } />
                <Route path="/popular" element={
                    <PrivateRoute user={user}>
                        <Popular />
                    </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </section>
    );
}

export default RouteComp;