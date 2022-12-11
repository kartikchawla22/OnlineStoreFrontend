import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Home';
import CartProvider from './Providers/CardProvider/Cart';
import SuccessPage from './Pages/Success';
import CancelPage from './Pages/Cancel';
import styles from './index.module.scss';
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Components/Header";
import Orders from "./Pages/Orders";



function App() {
  return (
    <Router>
      <CartProvider>
        <div className={styles.mainHeading}>
          <h1>
            Fake Alibaba
          </h1>
        </div>
        <Header />
        <div className={styles.content}>
          <div className={styles.mainContent}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="/orders" element={<Orders />} />
              {/* <Route
                path="*"
                element={<Navigate to="/" />}
              /> */}
            </Routes>
          </div>
        </div>
      </CartProvider>
    </Router >
  );
}

export default App;
