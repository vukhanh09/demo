import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from './createJob.module.css'

function CreateETLjob() {
    const [formSrcFields, setFormSrcFields] = useState([
      { 
        sourcetype: '', 
        connectstring: '',
        tablename:  '',
        alias:  ''
      },
    ])

    const [query, setQuery] = useState({})
    // const [data, setData] = useState()

    const [target, setTarget] = useState({})
  
    const handleFormSrcChange = (event, index) => {
      let data = [...formSrcFields] ;
      data[index][event.target.name] = event.target.value;
      setFormSrcFields(data);
    }
  
    const submit = (e) => {
      e.preventDefault();
      let data = {
        'source':formSrcFields,
        'query':[query],
        'target':[target]
      }

      console.log(data)
    }
  
    const addFields = () => {
      let object = {
        sourcetype: '',
        connectstring: '',
        tablename:  '',
        alias:  ''
      }
  
      setFormSrcFields([...formSrcFields, object])
    }
  
    const removeFields = (index) => {
      let data = [...formSrcFields];
      data.splice(index, 1)
      setFormSrcFields(data)
    }



  
    return (
      <div className={styles.main}>
        <div className={styles.content}>
            <Box 
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                // autoComplete="off"
                >
                <div>
                    <TextField
                        label="Querry Name"
                        id="querryname"
                        value={query.querryname}
                        size="small"
                        onChange={e=>setQuery({...query,'querryname':e.target.value})}
                        // onChange={e=>setQuery(e.target.value)}
                        />

                        
                        <TextField
                        label="Querry Detail"
                        id="querrydetail"
                        size="small"
                        value={query.querrydetail}
                        onChange={e=>setQuery({...query,'querrydetail':e.target.value})}
                    />
                </div>
                <div>
                    <TextField
                        label="Target type"
                        id="targettype"
                        value={target.targettype}
                        onChange={e=>setTarget({...target,'targettype':e.target.value})}
                        size="small"
                        />
                    <TextField
                        label="Connect string"
                        id="connectstring"
                        value={target.connectstring}
                        onChange={e=>setTarget({...target,'connectstring':e.target.value})}
                        size="small"
                    />
                    <TextField
                        label="Table name"
                        id="tablename"
                        value={target.tablename}
                        onChange={e=>setTarget({...target,'tablename':e.target.value})}
                        size="small"
                        />
                </div>
                
            </Box>
            <form onSubmit={submit}>
            {formSrcFields.map((form, index) => {
                return (
                <div key={index}>
                    {/* <input
                    name='sourcetype'
                    placeholder='Loại Nguồn'
                    onChange={event => handleFormSrcChange(event, index)}
                    value={form.sourcetype}
                    /> */}
                    <select name='sourcetype'  value={form.sourcetype} onChange={event => handleFormSrcChange(event, index)}>
                        <option value="0">Chọn nguồn</option>
                        <option value="storage">Lưu trữ đám mây</option>
                        <option value="dwh">Kho dữ liệu</option>
                        <option value="bigdata">Dữ liệu lớn</option>
                    </select>
                    
                    
                    <input
                    name='connectstring'
                    placeholder='storage path/tên database'
                    onChange={event => handleFormSrcChange(event, index)}
                    value={form.connectstring}
                    />
                    <input
                    name='tablename'
                    placeholder='Tên bảng/tên file'
                    onChange={event => handleFormSrcChange(event, index)}
                    value={form.tablename}
                    />
                    <input
                    name='alias'
                    placeholder='Tên bảng tạm'
                    onChange={event => handleFormSrcChange(event, index)}
                    value={form.alias}
                    />
                    <button onClick={() => removeFields(index)}>Remove</button>
                </div>
                )
            })}
            </form>
        </div>
        <button onClick={addFields}>Thêm Nguồn..</button>
        <br />
        <button onClick={submit}>Tạo tiến trình</button>
      </div>
    );
  }
  
  export default CreateETLjob;