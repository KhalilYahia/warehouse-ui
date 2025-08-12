import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3 className="title">Управление складом</h3>
        <button className="burger" onClick={toggleSidebar}>☰</button>
      </div>

      <nav className={`sidebar-menu ${isOpen ? 'show' : ''}`}>
        <div className="section">
          <h4>Склад</h4>
          <ul>
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) => (isActive ? "li selected" : "li")}
              >
                Баланс
              </NavLink>
              <NavLink
                to="/Receipts"
                onClick={toggleSidebar}
                className={({ isActive }) => (isActive ? "li selected" : "li")}
              >
                Поступления
              </NavLink>
              <NavLink
                to="/Shipments"
                onClick={toggleSidebar}
                className={({ isActive }) => (isActive ? "li selected" : "li")}
              >
                Отгрузки
              </NavLink>
          </ul>
        </div>
        <div className="section">
          <h4>Справочники</h4>
          <ul>
            <NavLink
                to="/Clients"
                onClick={toggleSidebar}
                className={({ isActive }) => (isActive ? "li selected" : "li")}
              >
                Клиенты
              </NavLink>
              <NavLink
                to="/units"
                onClick={toggleSidebar}
                className={({ isActive }) => (isActive ? "li selected" : "li")}
              >
                Единицы измерения
              </NavLink>
              <NavLink
                to="/resources"
                onClick={toggleSidebar}
                className={({ isActive }) => (isActive ? "li selected" : "li")}
              >
                Ресурсы
              </NavLink>
            
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
