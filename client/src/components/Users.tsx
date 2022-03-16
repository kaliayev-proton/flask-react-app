import { useState } from "react"

const API = process.env.REACT_APP_LOCAL_API

export const Users = () => {
    const [values, setValues] = useState({name: '', email: '', password: ''})
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(API);
        const response = await fetch(`${API}/users`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)})
        const data = await response.json();
        console.log(data);
    }
    const handleChange = (event: any) => {
        setValues((val: any) => ({ ...val, [event.target.name]: event.target.value}))
    }
    return (
        <div>
            <h1>Users</h1>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className="card card-body">
                        <div className="form-group">
                            <input className="form-control my-2" placeholder="name" autoFocus type="text" name="name" onChange={handleChange} value={values.name} />
                            <input className="form-control my-2" placeholder="email" type="email" name="email" onChange={handleChange} value={values.email} />
                            <input className="form-control my-2" placeholder="password" type="password" name="password" onChange={handleChange} value={values.password} />
                        </div>
                       <button className="btn btn-primary btn-block" type="submit">Save</button>
                    </form>
                </div>
                <div className="col-md-8"></div>
            </div>
        </div>
    )
}