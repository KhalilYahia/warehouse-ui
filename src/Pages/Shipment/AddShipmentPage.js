
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiURL } from '../../App';
import { useNavigate } from 'react-router-dom';
import AddingTableShipment from '../../Components/Shipment/AddingTableShipment';

const AddShipmentPage= () =>  {
  
  const navigate =useNavigate();
  const [flag,Setflag]=useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id:0,
    number:'',
    date:'',
    clientId:0,
    clientName:'',
    isSigned:false,
    goods:[]
  });
 
  const [AllActivatedInBalance,setAllActivatedInBalance] =useState([]);
  const [Clientoptions, setClientoptions] = useState([]);
 
   useEffect(() => {
     setLoading(true);
     const fetchData = async () => {       
         axios.get(ApiURL +'Balance/GetAllActiveElements').then((data)=>{    
              const Clientoptions_holder=[];
              data.data.clients.map((item)=>{
                    Clientoptions_holder.push({
                      value:item.id,
                      label:item.name
                      })
                  });
              setClientoptions(Clientoptions_holder);
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
      const fetchDataFromBalance = async () => {       
         axios.get(ApiURL +'Balance/GetAllActivatedInBalance').then((data)=>{    
              
              setAllActivatedInBalance(data.data);
                  setLoading(false);
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
       fetchDataFromBalance();
       fetchData();
   }, []);

  const handleChange = (name, value) => {

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if(name==='isSigned')
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
    if(!(formData.number.length<1||formData.number.length>50 )&& (formData.clientId>0) && (formData.date.length>1))
    {
      setLoading(true);
      try {
      const res = await axios.post(ApiURL+'Shipment/Create', dataToSend, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
        navigate('/Shipments');
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
      <h1>Поступление</h1>
    <button className="btn btn-add" onClick={() => {handleSubmit()}}>Сохранить</button>
     <button className="btn btn-work" onClick={() => {handleChange('isSigned',true); }}>Сохранить и подписать</button>
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
 <label className='label-input-kh'>Клиент</label>
    <Select
      id='select_client'
      options={Clientoptions}
      value={Clientoptions.find(opt => opt.value === formData.clientId) || null}
      onChange={(selectedOption) => handleChange('clientId', selectedOption===null?0:selectedOption.value)} 
      placeholder="select a client..."
      styles={{
                container: (base) => ({
                  ...base,
                  minWidth: 100,
                  display:'inline-block',
                 width:'calc(100% - 135px)'
                })
              }}
      />
       {( <p style={((formData.clientId===0) &&flag)?{visibility:'visible'}:{visibility:'hidden'}} className="validation-kh"> * Введите Клиент. </p>)}
    </div>
    <div className='input-form-kh'>
   <label className='label-input-kh'>Дата</label>
       <input
          className="input-text-kh"
          type="date"
          name="date"
          value={formData.date}
          onChange={(e)=>{handleChange('date',e.target.value)}}
        />
       {( <p style={((formData.date.length<1) &&flag)? {visibility:'visible'}:{visibility:'hidden'}} className="validation-kh"> * Введите Дата. </p>)}
    </div>
   
   <AddingTableShipment AllActivatedInBalance={AllActivatedInBalance} formData={formData} setFormData={setFormData}/>

    <ToastContainer />
    {loading && <div className='loader-parent'> <div className="loader"></div></div>}
    </div>
  );
}

export default AddShipmentPage;
