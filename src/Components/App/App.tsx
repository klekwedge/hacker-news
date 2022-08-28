import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import './App.css'

const MainPage = lazy(() => import('../../pages/MainPage'))
const NewsPage = lazy(() => import('../../pages/NewsPage'))
const Page404 = lazy(() => import('../../pages/Page404'))

function App() {
  return (
    <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/:newsId' element={<NewsPage />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Suspense>
    </Router>
  )
}

export default App
