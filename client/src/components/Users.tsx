import { useEffect, useState } from "react";

const API = process.env.REACT_APP_LOCAL_API;

interface User {
 name: string;
 email: string;
 password: string;
 id?: string;
}

export const Users = () => {
 useEffect(() => {
  getUsers();
 }, []);
 const [values, setValues] = useState<User>({
  name: "",
  email: "",
  password: "",
 });
 const [users, setUsers] = useState([]);

 const getUsers = async () => {
  const res = await fetch(`${API}/users`);
  const data = await res.json();
  setUsers(data);
 };

 const createUser = async () => {
  const response = await fetch(`${API}/users`, {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(values),
  });
  const data = await response.json();
  console.log(data);
  await getUsers();
  setValues({ name: "", email: "", password: "" });
 };
 const updateUser = async () => {
  const response = await fetch(`${API}/user/${values.id}`, {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    name: values.name,
    email: values.email,
    password: values.password,
   }),
  });
  const data = await response.json();
  console.log(data);
  await getUsers();
  setValues({ name: "", email: "", password: "" });
 };

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  console.log(values);
  if (values.id) {
   updateUser();
  } else {
   createUser();
  }
  console.log(API);
 };
 const handleChange = (event: any) => {
  setValues((val: any) => ({
   ...val,
   [event.target.name]: event.target.value,
  }));
 };

 const deleteUser = async (id: string) => {
  const confirm = window.confirm(
   "Are you sure you want to delete " + id + " user"
  );
  if (!confirm) {
   return;
  }
  const response = await fetch(`${API}/user/${id}`, {
   method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  await getUsers();
 };
 const editUser = async (id: string) => {
  const response = await fetch(`${API}/user/${id}`, {
   method: "GET",
  });
  const data = await response.json();
  setValues({
   name: data.name,
   email: data.email,
   password: data.password,
   id: data._id,
  });
 };
 return (
  <div>
   <h1>Users</h1>
   <div className="row">
    <div className="col-md-4">
     <form onSubmit={handleSubmit} className="card card-body">
      <div className="form-group">
       <input
        className="form-control my-2"
        placeholder="name"
        autoFocus
        type="text"
        name="name"
        onChange={handleChange}
        value={values.name}
       />
       <input
        className="form-control my-2"
        placeholder="email"
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email}
       />
       <input
        className="form-control my-2"
        placeholder="password"
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password}
       />
      </div>
      <button className="btn btn-primary btn-block" type="submit">
       Save
      </button>
     </form>
    </div>
    <div className="col-md-6">
     <table className="table table-bordered table-striped">
      <thead>
       <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Operations</th>
       </tr>
      </thead>
      <tbody>
       {users.map((user: any, index: number) => (
        <tr key={`${index}-${user.email}`}>
         <td>{user.name}</td>
         <td>{user.email}</td>
         <td>{user.password}</td>
         <td>
          <button
           className="btn btn-secondary btn-sm btn-block"
           onClick={() => editUser(user._id)}
          >
           Edit
          </button>
          <button
           className="btn btn-danger btn-sm btn-block"
           onClick={() => deleteUser(user._id)}
          >
           Delete
          </button>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 );
};
