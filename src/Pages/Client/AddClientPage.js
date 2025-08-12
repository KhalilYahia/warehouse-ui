import  { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiURL } from '../../App';
import { useNavigate } from 'react-router-dom';

const AddClientPage= () =>  {

  const navigate =useNavigate();
  const [flag,Setflag]=useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    address:'',
    status: 0
  });
 

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
   
  };

  const showError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000
    });
  };

   const handleSubmit = async (e) => {
    Setflag(true);
    if(!(formData.name.length<1||formData.name.length>50 ))
    {
      setLoading(true);
      try {
      const res = await axios.post(ApiURL+'Client/Create', formData, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
        navigate('/Clients');
      }
          
    } catch (error) {
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
    
  }
  };

  return (
    <div>
      <h1>Клиенты</h1>
    <button className="btn btn-add" onClick={() => {handleSubmit();}}>Сохранить</button>
    <div className='input-form-kh'>
 <label className='label-input-kh'>Наименование</label>
       <input
          className="input-text-kh"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e)=>{handleChange('name',e.target.value)}}
        />
       {( <p style={((formData.name.length<1||formData.name.length>50) &&flag)?{visibility:'visible'}:{visibility:'hidden'}} className="validation-kh"> * Введите Наименование длиной от 1 до 50 букв. </p>)}
    </div>
    <div className='input-form-kh'>
 <label className='label-input-kh'>Адрес</label>
       <input
          className="input-text-kh"
          type="text"
          name="address"
          value={formData.address}
          onChange={(e)=>{handleChange('address',e.target.value)}}
        />
       {( <p style={((formData.address.length<1||formData.address.length>50) &&flag)? {visibility:'visible'}:{visibility:'hidden'}} className="validation-kh"> * Введите Адрес длиной от 1 до 50 букв. </p>)}
    </div>
    <ToastContainer />
    {loading && <div className='loader-parent'> <div className="loader"></div></div>}
    </div>
  );
}

export default AddClientPage;
