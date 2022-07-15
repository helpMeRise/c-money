import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Auth } from './components/Auth/Auth';
import { Footer } from './components/Footer/Footer';
import { Currencies } from './components/Currencies/Currencies';
import { Account } from './components/Account/Account';
import { Exchange } from './components/Exchange/Exchange';


function App() {
  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Routes>
            <Route path='/' element={<Navigate to='/auth' replace/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/currencies' element={<Currencies/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/exchange' element={<Exchange/>}/>
          </Routes>
          <Footer />
        </>
      }>
      </Route>
    </Routes>
  );
}

export default App;
