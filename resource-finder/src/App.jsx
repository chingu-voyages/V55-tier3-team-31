import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import List from './pages/resourceList';
import Login from './pages/login';
import Profile from './pages/profile';
import NotFound from './pages/notFound';
function App() {

  return (
    <>
      <Header />
      <section className="full-width pl-20 pr-20 h-[calc(100vh-180px)]">
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
      <Footer />
    </>
  )
}

export default App
