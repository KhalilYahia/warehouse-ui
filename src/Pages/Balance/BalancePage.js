
import { useEffect, useState } from 'react';
import BalanceTable from '../../Components/Balance/BalanceTable';
import Select from "react-select";
import './BalancePage.css'
import axios from 'axios';
import { ApiURL } from '../../App';
import { toast, ToastContainer } from 'react-toastify';

function BalancePage() {
  const [results ,setresults]=useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    resourceIds:[],
    unitIds:[]
  });
 
  const [Resourceoptions, setResourceoptions] = useState([]);
  const [Unitsoptions, setUnitsoptions] = useState([]);
 
   useEffect(() => {
     handleSubmit();
     const fetchData = async () => {       
         axios.get(ApiURL +'Receipt/GetAllFitters').then((data)=>{    
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
      const res = await axios.post(ApiURL+'Balance/Search', formData, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
       
      });
      if(res.status===200)
      {
        setLoading(false);
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

  return (
    <div>
      <h1>Баланс</h1>
     <fieldset className='filter-container-kh'>
    <legend>фильтр</legend>
     <div className='filter-kh'>
      
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
       
      <BalanceTable data={results} />
    
      <ToastContainer />
      {loading && <div className='loader-parent'> <div className="loader"></div></div>}
    </div>
  );
}

export default BalancePage;
