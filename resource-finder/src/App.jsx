import Header from './components/header';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ResourcesContextProvider} from './context/resourceContext.jsx';
import {ChatbotContextProvider} from './context/chatbotContext.jsx';
import RouteComp from './route.jsx';

function App() {
  const resourceHelperClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={resourceHelperClient}>
      <ResourcesContextProvider>
        <ChatbotContextProvider>
          <Header />
          <RouteComp />
          <Footer />
       </ChatbotContextProvider>
        </ResourcesContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
