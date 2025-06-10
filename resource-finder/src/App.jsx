import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import List from './pages/resourceList';
import Login from './pages/login';
import Profile from './pages/profile';
import Recommended from './pages/recommended';
import NotFound from './pages/notFound';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ResourcesContextProvider} from './context/resourceContext.jsx';
import {ChatbotContextProvider} from './context/chatbotContext.jsx';


function App() {
  const resourceHelperClient = new QueryClient();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';
  return (
    <>
    <QueryClientProvider client={resourceHelperClient}>
      <ResourcesContextProvider>
        <ChatbotContextProvider>
          <Header />
          <section className={`${isAuthPage ? 'h-[calc(100vh-215px)] flex items-center' : 'h-[calc(100vh-180px)]'} full-width pl-20 pr-20  overflow-auto`}>
            <Routes>
            <Route path="/" element={<List />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommended" element={<Recommended />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
       <Footer />
       </ChatbotContextProvider>
        </ResourcesContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
