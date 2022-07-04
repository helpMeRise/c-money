import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Auth } from './components/Auth/Auth';


function App() {
  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Routes>
            <Route path='/' element={<Auth/>}/>
          </Routes>
        </>
      }>
      </Route>
    </Routes>
  );
}

export default App;
