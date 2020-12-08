import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.role === 'administrator'){
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
        
    }, [dispatch, history])


    const deleteHandler = (id) => {
        console.log('delete')
    }

    return (
        <>
            <h1>Users</h1>
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
           {users.map(user => (
               <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                  <Link to={`/user/${user._id}/edit`}>
                  <button classNameName="btn btn-sm">
                      EDIT
                  </button>
                  </Link>
      
                   <button classNameName="btn btn-sm" onClick={() => deleteHandler(user._id)}>
                      DELETE
                  </button>
                  </td>
               </tr>
           ))}
        </tbody>
      </table>
      
    )}
        </>
    )
}

export default UserListScreen
