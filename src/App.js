import data from './data.json'
import React from 'react';
import store from './store'
import { Provider } from 'react-redux';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">

          <header>
            <Link to="/">React Shopping Cart</Link>
            <Link to="/admin">Admin</Link>
          </header>

          <main>
            <Routes>
              <Route path='/admin' element={<AdminScreen />}></Route>
              <Route exact path='/' element={<HomeScreen />}></Route>
            </Routes>
          </main>

          <footer>All Right is Reserved.</footer>

          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;