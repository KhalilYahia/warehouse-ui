import  { useEffect, useState } from 'react';
import ShipmentTable from '../../Components/Shipment/ShipmentTable';
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import './ShipmentPage.css'
import axios from 'axios';
import { ApiURL } from '../../App';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ShipmentPage() {

  const navigate =useNavigate();
  const [results ,setresults]=useState([]);
  const [loading, setLoading] = useState(false);
  
  const now = new Date(); 
  const lastYear = new Date();
  lastYear.setFullYear(now.getFullYear() - 1);
  now.setDate(now.getDate() + 1);
  const [formData, setFormData] = useState({
    startPeriod:lastYear,
    endPeriod:now,
    outboundDocumentIds:[],
    clientIds:[],
    resourceIds:[],
    unitIds:[]
  });
 
  const [Clientoptions, setClientoptions] = useState([]);
  const [Resourceoptions, setResourceoptions] = useState([]);
  const [Unitsoptions, setUnitsoptions] = useState([]);
  const [DocumentsNumberoptions, setDocumentsNumberoptions] = useState([]);
 
   useEffect(() => {
     handleSubmit();
     const fetchData = async () => {       
         axios.get(ApiURL +'Receipt/GetAllFitters').then((data)=>{   
          console.log(data.data);
           const Clientoptions_holder=[];
          data.data.clients.map((item)=>{
                Clientoptions_holder.push({
                  value:item.id,
                  label:item.name
                  })
              });
      setClientoptions(Clientoptions_holder);

          
          const Resourceoptions_holder=[];
          data.data.resources.map((item)=>{
                Resourceoptions_holder.push({
                  value:item.id,
                  label:item.name
                  })
              });
      setResourceoptions(Resourceoptions_holder);

             
      const Unitoptions_holder=[];
          data.data.units.map((item)=>{
                Unitoptions_holder.push({
                  value:item.id,
                  label:item.name
                  })
              });
      setUnitsoptions(Unitoptions_holder);

      const DocumentsNumberoptions_holder=[];
          data.data.documentsNumber.map((item)=>{
                DocumentsNumberoptions_holder.push({
                  value:item.id,
                  label:item.number
                  })
              });
      setDocumentsNumberoptions(DocumentsNumberoptions_holder);
             
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
      setLoading(true);
      try {
      const res = await axios.post(ApiURL+'Shipment/Search', formData, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
        console.log(res);
        setresults(res.data);
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

   function formatDateForInput(date) {
  if (!date) return ""; 
  const d = new Date(date);
  if (isNaN(d)) return ""; 
  return d.toISOString().split("T")[0];
}

  return (
    <div>
      <h1>Отгрузки</h1>
      <fieldset className='filter-container-kh'>
    <legend>фильтр</legend>
     <div className='filter-kh'>
      <div className='single-filter'>
        <div className="date-period">
      <label>Период</label>
      <input 
      type="date" 
      value={formatDateForInput(formData.startPeriod)}
      onChange={(e)=>{handleChange('startPeriod',e.target.value)}}
      className="form-control" 
      />
      <span>—</span>
      <input 
      type="date" 
      value={formatDateForInput(formData.endPeriod)}
      onChange={(e)=>{handleChange('endPeriod',e.target.value)}}
      className="form-control" 
      />
    </div>
      </div>
      <div className='single-filter'>
        <label>
        Номер отгрузки
      </label>
      <Select
        options={DocumentsNumberoptions}
        isMulti
        value={DocumentsNumberoptions.filter(opt => formData.outboundDocumentIds.includes(opt.value))}
         onChange={(selectedOptions) =>
    handleChange(
      'inboundDocumentIds',
      selectedOptions ? selectedOptions.map(opt => opt.value) : [])}
        placeholder="Search or select..."
        />
     
      </div>
    <div className='single-filter'>
        <label>
        Клиент
      </label>
      <Select
        options={Clientoptions}
        isMulti
        value={Clientoptions.filter(opt => formData.clientIds.includes(opt.value))}
         onChange={(selectedOptions) =>
    handleChange(
      'clientIds',
      selectedOptions ? selectedOptions.map(opt => opt.value) : [])}
        placeholder="Search or select..."
        />
      </div>

      <div className='single-filter'>
        <label>
        Ресурс
      </label>
      <Select
        options={Resourceoptions}
        isMulti
        value={Resourceoptions.filter(opt => formData.resourceIds.includes(opt.value))}
         onChange={(selectedOptions) =>
    handleChange(
      'resourceIds',
      selectedOptions ? selectedOptions.map(opt => opt.value) : [])}
        placeholder="Search or select..."
        />
      </div>
      <div className='single-filter'>
        <label>
        Единица измерения
      </label>
      <Select
        options={Unitsoptions}
        isMulti
        value={Unitsoptions.filter(opt => formData.unitIds.includes(opt.value))}
         onChange={(selectedOptions) =>
    handleChange(
      'unitIds',
      selectedOptions ? selectedOptions.map(opt => opt.value) : [])}
        placeholder="Search or select..."
        />
     
      </div>
      </div>
      <button onClick={() => {handleSubmit();}}>Применить</button>
      
      </fieldset>
       <button className="btn btn-add" onClick={() => {navigate('/Shipments/addShipment')}}>+ Добавить</button>
        
      <ShipmentTable data={results}/>
      <ToastContainer />
      {loading && <div className='loader-parent'> <div className="loader"></div></div>}
    </div>
  );
}

export default ShipmentPage;
