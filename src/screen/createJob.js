import { useState } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { IconSquarePlus, IconCircleMinus } from '@tabler/icons';
// import axios from 'axios'; // npm instal axios
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';

function CreateETLjob() {

    const [formSrcFields, setFormSrcFields] = useState([
        {
            sourcetype: '',
            connectstring: '',
            databasename:'',
            srcusername: '',
            srcpassword: '',
            tablename: '',
            alias: ''
        },
    ])
    const [Daginfo, setDagInfo] = useState([
        {
            DagId: '',
            Schedule: '',
            owner: '',
            tags_name: ''
        },
    ])

    const [formQuery, setformQuery] = useState([
        {
            queryname: '',
            querydetail: '',
            listsourcetable: '',
            targettable: '',
            writemode: ''
        },
    ])
    // console.log(formQuery)



    const handleFormSrcChange = (event, index) => {
        let data = [...formSrcFields];
        data[index][event.target.name] = event.target.value;
        setFormSrcFields(data);
    }
    const handleformQuery = (event, index) => {
        let data = [...formQuery];
        data[index][event.target.name] = event.target.value;
        setformQuery(data);
    }

    const handleDagInfo = (event, index) => {
        let data = [...Daginfo];
        data[index][event.target.name] = event.target.value;
        setDagInfo(data);
    }


    const submit = (e) => {
        e.preventDefault();
        let conf = {
            'DagId': Daginfo.DagId,
            "Schedule": Daginfo.Schedule,
            "owner": Daginfo.owner,
            'tags': Daginfo.tags_name,
            'source': formSrcFields,
            'query': formQuery
        }
        console.log(conf)
        const body = {
            "conf": { conf },
        }

        console.log(JSON.stringify(body))

        const invoicebody=
            {
                "item_name":Daginfo.DagId,
                "customer_invoice_data":JSON.stringify(body),
                "subscription_id":1,
                "plan_history_id":1,
                "invoice_period_start_date": new Date().toLocaleString() + '',
                "invoice_period_end_date":new Date().toLocaleString() + '',
                "invoice_description":Daginfo.DagId,
                "invoice_amount":100,
                "invoice_created_ts":new Date().toLocaleString() + '',
                "invoice_due_ts":new Date().toLocaleString() + '',
                "invoice_paid_ts":new Date().toLocaleString() + ''
            }
        

        // axios({
        //     method: 'post',
        //     url: 'https://flowdpa.apps.xplat.fis.com.vn/api/v1/dags/dag_create_job_file/dagRuns',

        //     auth: {
        //         username: 'hung',
        //         password: '123456a@'
        //     },
        //     data: body
        // });

        // axios({
        //     method: 'post',
        //     url: 'https://dpzapi.apps.xplat.fis.com.vn/api/v1/invoice',           
        //     data: invoicebody
        // });


    }



    const addFields = () => {
        let object = {
            sourcetype: '',
            connectstring: '',
            databasename:'',
            srcusername: '',
            srcpassword: '',
            tablename: '',
            alias: ''
        }

        setFormSrcFields([...formSrcFields, object])
    }

    const removeFields = (index) => {
        let data = [...formSrcFields];
        data.splice(index, 1)
        setFormSrcFields(data)
    }


    const addFieldQuery = () => {
        let object = {
            queryname: '',
            querydetail: '',
            listsourcetable: '',
            targettable: '',
            writemode: ''
        }

        setformQuery([...formQuery, object])

    }
    const removeQuery = (index) => {
        let data = [...formQuery];
        data.splice(index, 1)
        setformQuery(data)
    }
    const datatypes = [
        {
            key: 'storage',
            name: 'Lưu trữ đám mây'
        },
        {
            key: 'dwh',
            name: 'Kho dữ liệu'
        },
        {
            key: 'bigdata',
            name: 'Dữ liệu lớn'
        }
        ,
        {
            key: 'sqlserver',
            name: 'Microsof Sql, Azure SQL'
        },
        {
            key: 'oracle',
            name: 'Oracle'
        }
        ,
        {
            key: 'mysql',
            name: 'MySQL'
        }
        ,
        {
            key: 'postgres',
            name: 'PostgresSQL'
        }
        ,
        {
            key: 'cassandra',
            name: 'Cassandra'
        }


    ]

    const writemodetype = [
        {
            key: 'append',
            name: 'append'
        },
        {
            key: 'overwrite',
            name: 'overwrite'
        } 
    ]


    const divStyle = {
        margin: '5px'
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };



    return (
        <div >
            <strong>
                Thông tin job
            </strong>
            <Box >

                <TextField
                    label="Tên Job"
                    id="DagId"
                    name="DagId"
                    value={Daginfo.DagId}
                    size="small"
                    onChange={event => setDagInfo({ ...Daginfo.DagId, ['DagId']: event.target.value })}
                    style={divStyle}

                />
                <TextField
                    label="Schedule"
                    id="Schedule"
                    name="Schedule"
                    size="small"
                    value={Daginfo.Schedule}
                    onChange={event => setDagInfo({ ...Daginfo, 'Schedule': event.target.value })}
                    style={divStyle}
                />
                <TextField
                    label="Người tạo"
                    id="owner"
                    name="owner"
                    value={Daginfo.owner}
                    onChange={event => setDagInfo({ ...Daginfo, 'owner': event.target.value })}
                    size="small"
                    style={divStyle}
                />
                <TextField
                    label="Tags"
                    id="tags_name"
                    name="tags_name"
                    value={Daginfo.tags_name}
                    onChange={event => setDagInfo({ ...Daginfo, 'tags_name': event.target.value })}
                    size="small"
                    style={divStyle}
                />


            </Box>
            <div>
                <p>
                    <strong>
                        Đăng ký dữ liệu
                    </strong>
                </p>

                <Box >
                    {formSrcFields.map((form, index) => {
                        return (
                            <div key={index}  >
                                <strong>{index + 1} </strong>
                                <Select name='sourcetype' value={form.sourcetype} onChange={event => handleFormSrcChange(event, index)}
                                    size="small"
                                    style={divStyle}
                                >

                                    {datatypes.map((datatype) => (
                                        <MenuItem
                                            key={datatype.key}
                                            value={datatype.key}
                                        >
                                            {datatype.name}
                                        </MenuItem>
                                    ))}

                                </Select>


                                <TextField
                                    name='connectstring'
                                    size="small"
                                    label='Đường dẫn kết nối'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.connectstring}
                                    style={divStyle}
                                />
                                 <TextField
                                    name='databasename'
                                    size="small"
                                    label='Tên cơ sở dữ liệu'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.databasename}
                                    style={divStyle}
                                />
                                <TextField
                                    name='srcusername'
                                    size="small"
                                    label='Tài khoản đăng nhập'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.srcusername}
                                    style={divStyle}
                                />
                                <TextField
                                    name='srcpassword'
                                    size="small"
                                    label='Mật khẩu'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.srcpassword}
                                    style={divStyle}
                                />
                                <TextField
                                    name='tablename'
                                    size="small"
                                    label='Tên bảng/tên file'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.tablename}
                                    style={divStyle}
                                />
                                <TextField
                                    name='alias'
                                    size="small"
                                    label='Tên bảng cho truy vấn'
                                    onChange={event => handleFormSrcChange(event, index)}
                                    value={form.alias}
                                    style={divStyle}
                                />
                                <Button style={divStyle} name="removesource" onClick={() => removeFields(index)}><IconCircleMinus /></Button>
                                <br></br>
                            </div>
                        )
                    })}
                    <Button style={divStyle} name="addsoruce" onClick={addFields}><IconSquarePlus /></Button>
                </Box>
                <strong>
                    Đăng ký thủ tục tổng hợp dữ liệu
                </strong>
                <div  >
                    {/* <input placeholder='Số query' onChange={e => addFieldQuery(e.target.value)}/> */}
                    {formQuery.map((formquery, index) => (
                        <div key={index} >
                            <strong>{index + 1} </strong>
                            <div >
                                {/* <strong>Query {index}</strong> */}
                                <TextField
                                    label="Tên job tổng hợp"
                                    id="queryname"
                                    name="queryname"
                                    value={formquery.queryname}
                                    size="small"
                                    onChange={event => handleformQuery(event, index)}
                                    style={divStyle}
                                />
                                <br></br>
                                

                                {/* <TextField
                                    label="Danh sách bảng cần tổng hợp"
                                    id="listsourcetable"
                                    name="listsourcetable"
                                    value={formquery.listsourcetable}
                                    onChange={event => handleformQuery(event, index)}
                                    size="small"
                                    style={divStyle}
                                /> */}

                                <MultipleSelectCheckmarks 
                                headerName={'Danh sách bảng cần tổng hợp'} 
                                data={formSrcFields}
                                formQuery={formQuery}
                                setformQuery = {setformQuery}
                                index = {index}
                                source = {'listsourcetable'}
                                />
                                

                                <Button name="btnremovequery" onClick={() => removeQuery(index)}><IconCircleMinus /></Button>
                                <br></br>
                                <TextField
                                    label="Query Detail"
                                    id="querydetail"
                                    name="querydetail"
                                    multiline
                                    size="small"
                                    fullWidth
                                    value={formquery.querydetail}
                                    onChange={event => handleformQuery(event, index)}
                                    style={divStyle}
                                />
                                Bảng đích
                                <Select name='targettable'
                                    value={formquery.targettable}
                                    onChange={event => handleformQuery(event, index)}
                                    size="small"
                                    style={divStyle}
                                >

                                    {formSrcFields.map((formSrcField) => (
                                        <MenuItem
                                            key={formSrcField.alias}
                                            value={formSrcField.alias}
                                        >
                                            {formSrcField.alias}
                                        </MenuItem>
                                    ))}

                                </Select>

                                Write mode
                                <Select name='writemode'
                                    value={formquery.writemode}
                                    onChange={event => handleformQuery(event, index)}
                                    size="small"
                                    style={divStyle}
                                >

                                    {writemodetype.map((writemode) => (
                                        <MenuItem
                                            key={writemode.key}
                                            value={writemode.key}
                                        >
                                            {writemode.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </div>

                        </div>

                    ))
                    }
                    <Button style={divStyle} name="btnaddquery" onClick={addFieldQuery}><IconSquarePlus /></Button>
                </div>
            </div>
            <br />
            <Button onClick={submit}>Tạo tiến trình</Button>
        </div>
    );
}

export default CreateETLjob;