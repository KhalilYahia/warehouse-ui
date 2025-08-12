
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Pages/Main';
import BalancePage from './Pages/Balance/BalancePage';
import ResourcePage from './Pages/Resource/ResourcePage';
import AddResourcePage from './Pages/Resource/AddResourcePage';
import EditResourcePage from './Pages/Resource/EditResourcePage';
import UnitPage from './Pages/Unit/UnitPage';
import AddUnitPage from './Pages/Unit/AddUnitPage';
import EditUnitPage from './Pages/Unit/EditUnitPage';
import ClientPage from './Pages/Client/ClientPage';
import AddClientPage from './Pages/Client/AddClientPage';
import EditClientPage from './Pages/Client/EditClientPage';
import ReceiptPage from './Pages/Receipts/ReceiptPage';
import AddReceiptPage from './Pages/Receipts/AddReceiptPage';
import EditReceiptPage from './Pages/Receipts/EditReceiptPage';
import ShipmentPage from './Pages/Shipment/ShipmentPage';
import AddShipmentPage from './Pages/Shipment/AddShipmentPage';
import EditShipmentPage from './Pages/Shipment/EditShipmentPage';

//export const ApiURL='https://localhost:7132/';
export const ApiURL='http://ahmadibrahem-001-site4.htempurl.com/api/';

function App() {
  return (
   <BrowserRouter>
      <div>
     
        <Routes>
          <Route path="" element={<Main />} >
            <Route path="/" element={<BalancePage />} />
            <Route path="/receipts" element={<ReceiptPage />} />
              <Route path="/receipts/addReceipt" element={<AddReceiptPage />} />
              <Route path="/receipts/editReceipt" element={<EditReceiptPage />} />

            <Route path="/shipments" element={<ShipmentPage />} />
              <Route path="/shipments/addShipment" element={<AddShipmentPage />} />
              <Route path="/shipments/editShipment" element={<EditShipmentPage />} />
            
            
            <Route path="/resources" element={<ResourcePage />} />
              <Route path="/resources/addResourcePage" element={<AddResourcePage />} />
              <Route path="/resources/editResourcePage" element={<EditResourcePage />} />
             
             <Route path="/Units" element={<UnitPage />} />
              <Route path="/Units/addUnitPage" element={<AddUnitPage />} />
              <Route path="/Units/editUnitPage" element={<EditUnitPage />} />

             <Route path="/Clients" element={<ClientPage />} />
              <Route path="/Clients/addClientPage" element={<AddClientPage />} />
              <Route path="/Clients/editClientPage" element={<EditClientPage />} />
          </Route>
      
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
