
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiURL } from '../../App';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EditResourcePage= () =>  {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate =useNavigate();
  const [flag,Setflag]=useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id:id,
    name:'',
    status:0
  });
  const [orginalData,setOrginalData]=useState({
    id:id,
    name:'',
    status:0
  });
 
 useEffect(() => {
    setLoading(true);
    const fetchData = async () => {       
        axios.get(ApiURL +'Resource/GetById?id='+id).then((data)=>{    
            setFormData(data.data);  
            setOrginalData(data.data);
            setLoading(false);
          })
          .catch ((error)=> {
              
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

  const handleChange = (name, value) => {
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if(name==='status')
      handleSubmit(updatedData);
   
  };

  const showError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000
    });
  };

   const handleSubmit = async (dataToSend = formData) => {
    Setflag(true);
    if(!(formData.name.length<1||formData.name.length>50 ))
    {
      setLoading(true);
      try {
      const res = await axios.put(ApiURL+'Resource/Update', dataToSend, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
        navigate('/resources');
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

   const handleDelete = async (e) => {
      setLoading(true);
      try {
      const res = await axios.delete(ApiURL+'Resource/Delete?id='+formData.id,  {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
        navigate('/resources');
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
  
  };
  return (
    <div>
      <h1>Ресурсы</h1>
      <button className="btn btn-add" onClick={() => {handleSubmit(formData);}}>Сохранить</button>
   {orginalData.status===0?(
   <>
    <button className="btn btn-archive" onClick={() => {handleChange('status',1);}}>К архиву</button></> 
   ):(
   <> <button className="btn btn-delete" onClick={() => {handleDelete();}}>Удалить</button>
    <button className="btn btn-work" onClick={() => {handleChange('status',0); }}>В работу</button></> 
   )} 

   
    <div className='input-form-kh'>
 <label className='label-input-kh'>Наименование</label>
       <input
          className="input-text-kh"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e)=>{handleChange('name',e.target.value)}}
        />
       {(formData.name.length<1||formData.name.length>50) &&flag&& ( <p className="validation-kh"> * Введите Наименование длиной от 1 до 50 букв. </p>)}
    </div>
    <ToastContainer />
    {loading && <div className='loader-parent'> <div className="loader"></div></div>}
    </div>
  );
}

export default EditResourcePage;
