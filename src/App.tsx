import Home from './Home';
import Details from './Details';
import {Routes, BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:from/:to/:amt/:rate/:result" element={<Details />} />
     </Routes>
    </BrowserRouter>  
  );
}

export default App;