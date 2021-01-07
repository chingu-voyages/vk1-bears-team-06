import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SidebarSettings = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 

    useEffect(() => [userInfo])

    return (
        <>
            <div className="list-group">
            { userInfo && userInfo.role === 'administrator' && (
                <>
                    <Link to="/admin/userslist" className="list-group-item list-group-item-action active" aria-current="true">
                        Users
                    </Link>
                    <Link to="/admin/resortslist" className="list-group-item list-group-item-action active" aria-current="true">
                        Resorts
                    </Link>
                </>
            )
            }

            { userInfo && userInfo.role === 'resortOwner' && (
                <>
                    <Link to={`/resort-owner/${userInfo._id}/resortslist`} className="list-group-item list-group-item-action active" aria-current="true">
                        Resorts
                    </Link>
                </>
            )
            }
            <Link to="/profile" className="list-group-item list-group-item-action active" aria-current="true">
                Account Settings
            </Link>
            </div>
        </>
    )
}

export default SidebarSettings