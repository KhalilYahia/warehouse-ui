
import { useEffect, useState } from 'react';
import './ReceiptTable.css'
import Select from "react-select";


function AddingTableReceipt({allActiveElements, formData,setFormData}) {

  const [Resourceoptions, setResourceoptions] = useState([]);
  const [Unitsoptions, setUnitsoptions] = useState([]);

  useEffect(()=>{
    console.log(formData);
    if( allActiveElements.resources !== undefined)
    {
      const Resourceoptions_holder=[];
      allActiveElements.resources.map((item)=>{
                Resourceoptions_holder.push({
                  value:item.id,
                  label:item.name
                  })
              });
      setResourceoptions(Resourceoptions_holder);

      const Unitoptions_holder=[];
      allActiveElements.units.map((item)=>{
                Unitoptions_holder.push({
                  value:item.id,
                  label:item.name
                  })
              });
      setUnitsoptions(Unitoptions_holder);
    }
  },[allActiveElements])

  const handleAddRow = () => {
    const newFormData = structuredClone(formData);
    newFormData.goods.push({
        id: 0,
        resourceId: 0,
        resourceName: '',
        unitId: 0,
        unitName: '',
        quantity:0
    } );
    setFormData(newFormData);
   
  };

  const handleRemoveRow = (index) => {
     const newFormData = structuredClone(formData);
    newFormData.goods.splice(index, 1);
    setFormData(newFormData);
  };

  const handleChange = (index, field, value) => {
    
    const newformData = structuredClone(formData);
    newformData.goods[index][field]= value;
    setFormData(newformData);
  };

  
  return (
   <div className="table-container" style={{paddingBottom:'100px'}}>
    <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", overflow:'auto',border:'none' }} className='custom-table'>
      <thead>
        <tr style={{ backgroundColor: "rgb(190 43 111 / 63%)" }}>
          <th>
            <button className='btn-insert' onClick={handleAddRow} >
              +
            </button>
          </th>
          <th>Ресурс</th>
          <th>Единица измерения</th>
          <th>Количество</th>
        </tr>
      </thead>
      <tbody>
        {formData.goods.map((row, index) => (
          <tr key={index}> 
            <td>
              <button
              className='btn-remove'
                onClick={() => { handleRemoveRow(index)}}
              >
                x
              </button>
            </td>
            <td>
              <Select
                id='select_resource'
                options={Resourceoptions}
                value={Resourceoptions.find(opt => opt.value === row.resourceId) || null}
                onChange={(selectedOption) => handleChange(index,'resourceId', selectedOption===null?0:selectedOption.value)} 
                placeholder="select a resource..."
                styles={{
                          container: (base) => ({
                            ...base,
                            minWidth: 100 
                          })
                        }}
               />
            </td>
            <td>
               <Select
                id='select_unit'
                options={Unitsoptions}
                value={Unitsoptions.find(opt => opt.value === row.unitId) || null}
                onChange={(selectedOption) => handleChange(index,'unitId', selectedOption===null?0:selectedOption.value)} 
                placeholder="select unit..."
                styles={{
                          container: (base) => ({
                            ...base,
                            minWidth: 100 
                          })
                        }}
               />
              
            </td>
            <td>
              <input
                type="number"
                className='form-control'
                min={0}
                value={row.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
  );
}

export default AddingTableReceipt;
