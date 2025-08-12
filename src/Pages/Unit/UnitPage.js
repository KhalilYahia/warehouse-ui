
import React, { useEffect, useState } from 'react';
import UnitTable from '../../Components/Unit/UnitTable';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiURL } from '../../App';
import { ToastContainer, toast } from "react-toastify";

function UnitPage() {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
 const [data,Setdata] =useState([]);
 const showError = (msg) => {
     toast.error(msg, {
       position: "top-right",
       autoClose: 5000
     });
   };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {       
        axios.get(ApiURL +'Unit/GetAll').then((data)=>{    
            Setdata(data.data);  
            setLoading(false);
          })
          .catch ( (error)=> {
              setLoading(false);
              if (error.response && error.response.data) {
                const data = error.response.data;
                if (data.errors) {
                  const messages = Object.values(data.errors).flat().join('\n');
                  showError(messages);
                } else {
                  showError(data.title || JSON.stringify(data));
                }
              } else {
                showError('Убедитесь, что вы подключены к Интернету.');
              }
        }
      );
      
      }
      fetchData();
  }, []);

  return (
    <div>
      <h1>Единицы измерения</h1>
    <button class="btn btn-add" onClick={() => {navigate('/Units/addUnitPage')}}>+ Добавить</button>
      
      <UnitTable data={data}/>

      <ToastContainer />
      {loading && <div className='loader-parent'> <div className="loader"></div></div>}
    </div>
  );
}

export default UnitPage;
