import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import './App.css'

const MainPage = lazy(() => import('../../pages/MainPage'));
const NewsPage = lazy(() => import('../../pages/NewsPage'));
const Page404 = lazy(() => import('../../pages/Page404'));

function App() {
  return (
    <Router>
      <Box p="10px 20px" className="flex flex-col items-center">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:newsId" element={<NewsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Box>
    </Router>
  )
}

export default App
