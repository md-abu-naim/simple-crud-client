import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const lodedUsers = useLoaderData()
    const [users, setUsers] = useState(lodedUsers)

    const handleDelete = _id => {
        console.log("delete", _id );
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE',
            // headers: {
            //     'content-type': 'application/json'
            // }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                alert("Deleted successfully")
                const remaining = users.filter(user => user._id !== _id)
                setUsers(remaining)
            }
        })
    }
    return (
        <div>
            <h2>{users.length}</h2>
            <Link to="/">home</Link>
            <div>
                {users.map(user => <p key={user._id}>{user._id} : {user.name} : {user.email} <Link to={`/update/${user._id}`}><button>UP</button></Link> <button onClick={()=> handleDelete(user._id)}>D</button></p>)}
            </div>
        </div>
    );
};

export default Users;