import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.css'
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Cart from '../Cart/Cart.js';
import Footer from '../Footer/Footer.js'

function App() {
  return (
    <Router>
      <div className={styles.app}>

        <Navbar />

        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </Switch>
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
