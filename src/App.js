import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './Store/store';
// import User from './User';
import Chat from './Component/Chat';
import Login from './Component/Login';
import Confimation from './Component/Confirmation';
import Dashboard from './Component/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './Component/User';
import PrivateRoute from './Utlis/privateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Routes>
      <Route exact strict path="/" element={<Login />} />
      <Route exact strict path="/chat" element={<PrivateRoute> <Chat /> </PrivateRoute>} />
      <Route exact strict path="/user/confirm/:token" element={<Confimation /> }/>
      <Route exact strict path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route exact strict path="/users" element={<PrivateRoute><User /></PrivateRoute>} />
      </Routes>
      </Router>
   {/* <User /> */}
    </Provider>
  );
}

export default App;
