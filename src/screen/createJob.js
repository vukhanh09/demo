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
    const [info, setInfo] = useState([
      { 
        DagId: '', 
        Schedule: '',
        owner:  '',
        tags_name:  ''
      },
    ])

    const [formSrcQuery, setFormSrcQuery] = useState([
      { 
        queryname: '', 
        querydetail: '',
        targettype:  '',
        connectstring: '',
        targettable:  ''
      },
    ])
    console.log(formSrcQuery)


  
    const handleFormSrcChange = (event, index) => {
      let data = [...formSrcFields] ;
      data[index][event.target.name] = event.target.value;
      setFormSrcFields(data);
    }
    const handleFormSrcQuery = (event, index) => {
      let data = [...formSrcQuery] ;
      data[index][event.target.id] = event.target.value;
      setFormSrcQuery(data);
    }
  
    const submit = (e) => {
      e.preventDefault();
      let data = {
        'Job':[
          {
            'DagId':info.DagId,
            "Schedule":info.Schedule,
            "owner":info.owner,
            'tags':info.tags_name,
            'source':formSrcQuery,
            'query':formSrcQuery
          }

        ]
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
    const removeQuery = (index) => {
      let data = [...formSrcQuery];
      data.splice(index, 1)
      setFormSrcQuery(data)
    }

    const addFieldQuery = () =>{
      let object = {
        queryname: '',
        querydetail: '',
        targettype:  '',
        connectstring:  '',
        targettable: ''
      }
  
      setFormSrcQuery([...formSrcQuery, object])

    }


    return (
      <div >
        <div  >
          <Box
            // className={styles.box}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                    label="DagId"
                    id="DagId"
                    value={info.DagId}
                    size="small"
                    onChange={event => setInfo({...info,'DagId':event.target.value})}
                    // onChange={e=>setQuery(e.target.value)}
                    />

                    
                    <TextField
                    label="Schedule"
                    id="Schedule"
                    size="small"
                    value={info.Schedule}
                    onChange={event => setInfo({...info,'Schedule':event.target.value})}
                    />

                <TextField
                    label="Owner"
                    id="owner"
                    value={info.owner}
                    onChange={event =>setInfo({...info,'owner':event.target.value})}
                    size="small"
                    />
                <TextField
                    label="Tags name"
                    id="tags_name"
                    value={info.tags_name}
                    onChange={event =>setInfo({...info,'tags_name':event.target.value})}
                    size="small"
                />
            </div>
                
        </Box>

        </div>
        <div >
            <Box onSubmit={submit} 
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
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
                      
                      
                      <TextField
                      name='connectstring'
                      size="small"
                      label='storage path/tên database'
                      onChange={event => handleFormSrcChange(event, index)}
                      value={form.connectstring}
                      />
                      <TextField
                      name='tablename'
                      size="small"
                      label='Tên bảng/tên file'
                      onChange={event => handleFormSrcChange(event, index)}
                      value={form.tablename}
                      />
                      <TextField
                      name='alias'
                      size="small"
                      label='Tên bảng tạm'
                      onChange={event => handleFormSrcChange(event, index)}
                      value={form.alias}
                      />
                      <button onClick={() => removeFields(index)}>Remove</button>
                  </div>
                  )
              })}
                      <button onClick={addFields}>Thêm Nguồn..</button>
            </Box>
            <div  >
              {/* <input placeholder='Số query' onChange={e => addFieldQuery(e.target.value)}/> */}
              {formSrcQuery.map((form, index) =>(
                <Box key={index}
                // className={styles.box}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <div>
                        <strong>Query {index}</strong>
                        <TextField
                            label="Querry Name"
                            id="querryname"
                            value={form.querryname}
                            size="small"
                            onChange={event => handleFormSrcQuery(event, index)}
                            // onChange={e=>setQuery(e.target.value)}
                            />

                            
                            <TextField
                            label="Querry Detail"
                            id="querrydetail"
                            size="small"
                            value={form.querrydetail}
                            onChange={event => handleFormSrcQuery(event, index)}
                            />
                            <button onClick={() => removeQuery(index)}>Remove</button>
                    </div>
                    <div>
                        <TextField
                            label="Target type"
                            id="targettype"
                            value={form.targettype}
                            onChange={event => handleFormSrcQuery(event, index)}
                            size="small"
                            />
                        <TextField
                            label="Connect string"
                            id="connectstring"
                            value={form.connectstring}
                            onChange={event => handleFormSrcQuery(event, index)}
                            size="small"
                        />
                        <TextField
                            label="Table name"
                            id="tablename"
                            value={form.tablename}
                            onChange={event => handleFormSrcQuery(event, index)}
                            size="small"
                            />
                    </div>
                    
                </Box>
              ))
              }
                <button onClick={addFieldQuery}>Thêm Query..</button>
          </div>
        </div>
        <br />
        <button onClick={submit}>Tạo tiến trình</button>
      </div>
    );
  }
  
  export default CreateETLjob;