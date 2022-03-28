import logo from "./logo.svg";
import "./App.css";
import Table from "./components/MyTable";
import MyForm from "./components/MyForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="form" element={<MyForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
