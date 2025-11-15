import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'; 

import Home from './pages/Home';
import Detail from './pages/Detail';
import PostDetail from './pages/PostDetail';
import UMKMList from './pages/UMKMList';

function App() {
  return (
    <Router>
       <ScrollToTop /> 
       
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/umkm" element={<UMKMList />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/post/:id" element={<PostDetail />} />
       </Routes>
    </Router>
  );
}

export default App;