import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Auth } from './components/Auth/Auth';
import { Footer } from './components/Footer/Footer';
import { Currencies } from './components/Currencies/Currencies';


function App() {
  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Routes>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/currencies' element={<Currencies/>}/>
          </Routes>
          <Footer />
        </>
      }>
      </Route>
    </Routes>
  );
}

export default App;
