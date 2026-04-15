import React, { useEffect, useState } from 'react'
import axios from 'axios'
 import './Homepage.css';  

export default function Project4() {

    const [state, setstate] = useState([])
    const [form, setform] = useState({ name: "", email: "", password: "" ,gender:"" })
    const [editid, seteditid] = useState(null)

    const API = "http://localhost:3004/data"

    const getdata = async () => {
        const res = await axios.get(API)
        setstate(res.data)
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (editid) {
            await axios.put(`${API}/${editid}`, form)
            seteditid(null)
        }
        else {
            await axios.post(API, form)
        }

        setform({ name: "", email: "", password: "" ,gender:"" })
        getdata()
    }

    const deleteData = async (id) => {
        await axios.delete(`${API}/${id}`)
        getdata()
    }

    const editData = (el, id) => {
        setform({ name: el.name, email: el.email, password: el.password,gender: el.gender})
        seteditid(id)
    }

    useEffect(() => {
        getdata()
    }, [])
    return (
        <div>
            <div >
                <form onSubmit={handlesubmit}>
                    <h3>REGISTRATION</h3>
                    <label>Name:</label>
                    <input type="text" name='name' placeholder='Enter Name' value={form.name} onChange={handlechange} required />
                    <br />
                    <br />
                    <label>Email:</label>
                    <input type="email" name='email' placeholder='Enter Name' value={form.email} onChange={handlechange} required />
                    <br />
                    <br />
                    <label>Password:</label>
                    <input type="password" name='password' placeholder='Enter Password' value={form.password} onChange={handlechange} required />
                    <br />
                    <br />
                    
                       <label>Gender:</label>

<input 
  type="radio" 
  name="gender" 
  value="Male" 
  checked={form.gender === "Male"} 
  onChange={handlechange} 
/>
<label>Male</label>

<input 
  type="radio" 
  name="gender" 
  value="Female" 
  checked={form.gender === "Female"} 
  onChange={handlechange} 
/>
<label>Female</label>
<br />
                    <br />
                    <button id='btn'  className='btn btn-primary' type='submit'>{editid ? "Update" : "Submit"}</button>
                </form>
 </div> 
                {
                  <>
  <table cellPadding="10"  className="custom-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Gender</th>
        <th>Action</th>
    
      </tr>
    </thead>

    <tbody>
      {state.map((el) => (
        <tr key={el.id}>
          <td>{el.name}</td>
          <td>{el.email}</td>
          <td>{el.password}</td>
          <td>{el.gender}</td>
          <td>
            <button className='btn btn-success' onClick={() => editData(el, el.id)}>Edit</button>
            <button className='btn btn-danger' onClick={() => deleteData(el.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</>

                }
           
        </div>
        
        
    )
}
