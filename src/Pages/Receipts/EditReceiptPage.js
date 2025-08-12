
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiURL } from '../../App';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddingTableReceipt from '../../Components/Receipt/AddingTableReceipt';

const EditReceiptPage= () =>  {
  
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate =useNavigate();
  const [flag,Setflag]=useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id:id,
    number:'',
    date:'01-08-1900T00:00:0',
    goods:[
      
    ]
  });
 
  const [allActiveElements,setAllActiveElements] =useState({});

 
   useEffect(() => {
     setLoading(true); 
     const fetchData = async () => {       
         axios.get(ApiURL +'Balance/GetAllActiveElements').then((data)=>{    
             setAllActiveElements(data.data);  
             
           })
           .catch ( (error)=> {
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
      const fetchFormById = async () => {       
      axios.get(ApiURL +'Receipt/GetById?InboundDocument_Id='+id).then((data)=>{    
          setFormData(data.data);  
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
       fetchFormById();
       fetchData();
   }, []);

  
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
    console.log(formData.date);
    Setflag(true);
    if(!(formData.number.length<1||formData.number.length>50 ) && (formData.date.length>1))
    {
      setLoading(true);
      try {
      const res = await axios.put(ApiURL+'Receipt/update', formData, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
        navigate('/Receipts');
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
      const res = await axios.delete(ApiURL+'Receipt/Delete?id='+formData.id,  {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
        navigate('/receipts');
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

 function formatDateForInput(value) {
    if (!value) return "";
  // Remove curly braces if they exist
  const cleanValue = value.replace(/[{}]/g, "");
  // Split date part manually to avoid timezone issues
  const [year, month, day] = cleanValue.split("T")[0].split("-").map(Number);
  // Build local date
  const date = new Date(year, month - 1, day);
  // Return YYYY-MM-DD string
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
  return (
    <div>
      <h1>Поступление</h1>
    <button className="btn btn-add" onClick={() => {handleSubmit();console.log(formData)}}>Сохранить</button>
     <button className="btn btn-delete" onClick={() => {handleDelete();}}>Удалить</button>
     <div className='input-form-kh'>
 <label className='label-input-kh'>Номер</label>
       <input
          className="input-text-kh"
          type="text"
          name="number"
          value={formData.number}
          onChange={(e)=>{handleChange('number',e.target.value)}}
        />
       {( <p style={((formData.number.length<1||formData.number.length>50) &&flag)?{visibility:'visible'}:{visibility:'hidden'}} className="validation-kh"> * Введите Номер длиной от 1 до 50 букв. </p>)}
    </div>
    <div className='input-form-kh'>
   <label className='label-input-kh'>Дата</label>
       <input
          className="input-text-kh"
          type="date"
          name="date"
          value={formatDateForInput(formData.date)}
          onChange={(e)=>{handleChange('date',e.target.value)}}
        />
       {( <p style={((formData.date.length<1) &&flag)? {visibility:'visible'}:{visibility:'hidden'}} className="validation-kh"> * Введите Дата. </p>)}
    </div>
   
   <AddingTableReceipt allActiveElements={allActiveElements} formData={formData} setFormData={setFormData}/>

    <ToastContainer />
    {loading && <div className='loader-parent'> <div className="loader"></div></div>}
    </div>
  );
}

export default EditReceiptPage;
