import React, {useEffect, useState} from 'react'
import {AccountCircle} from "@material-ui/icons";
import {Menu, MenuItem} from "@material-ui/core";
import {connect} from "react-redux";
import {isEmpty} from "../processing";
import {BACKEND_ADDRESS} from "../constants/model";
import axios from "axios";
import {changeUser} from "../redux/actions";
import './stylesheets/AuthToolbar.css'

const AuthToolbar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!isEmpty(props.user))

    useEffect(() => {
        console.log("Token found: ", window.localStorage.getItem('token'))
        const token = window.localStorage.getItem('token')
        if (!isLoggedIn && (token && token.length > 10)) {
            axios.get(BACKEND_ADDRESS + '/user/', {headers: {Authorization: `Bearer ${token}`}}).then((res) => {
                console.log("Logged in user: ", res.data)
                props.changeUser(res.data)
                setIsLoggedIn(true)
            }).catch((err) => {
                console.log(err.response.status, err.message)
                if (err.response.status == 401) window.localStorage.setItem('token', null)
                setIsLoggedIn(false)
            })
        } else if (props.user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [props.user])

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        handleClose()
        console.log("Logging out...")
        window.localStorage.setItem('token', '')
        props.changeUser(null)
        setIsLoggedIn(false)
    }

    const renderLoggedIn = () => {
        if (isLoggedIn === true) {
            return (
                <div>
                    <div className="authcontainer" onClick={handleMenu}>
                        <p className="authToolLabel"> {props.user._id}</p>
                        <div
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit">
                            <AccountCircle/>
                        </div>
                    </div>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>

                        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                    </Menu>

                </div>
            )
        } else {
            return (
                <a href={BACKEND_ADDRESS + '/auth/google'}>
                    <div className="authcontainer">
                        <p className="authToolLabel">Log In</p>
                        <div
                            aria-label="log in button"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit">

                            <AccountCircle/>
                        </div>
                    </div>
                </a>
            )
        }
    }

    return renderLoggedIn(isLoggedIn)

}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps, {changeUser})(AuthToolbar)