import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
function App() {
  return (
  <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<AddTodo/>}/>
      <Route path='/edit/:id' element={<EditTodo/>}/>
    </Routes>
  </div>
  );
}

export default App;
