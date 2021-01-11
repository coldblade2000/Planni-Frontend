import React, {useEffect} from 'react'
import {AccountCircle} from "@material-ui/icons";
import {Menu, MenuItem} from "@material-ui/core";
import {connect} from "react-redux";
import {BACKEND_ADDRESS} from "../constants/model";
import {changeUser} from "../redux/actions";
import './stylesheets/AuthToolbar.css'
import ToolbarBox from "./ToolbarBox";
import {logInUser} from "../model/networking";

const AuthToolbar = ({user, changeUser}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    //const [isLoggedIn, setIsLoggedIn] = useState(!isEmpty(user))

    useEffect(() => {
        console.log("Token found: ", window.localStorage.getItem('token'))
        const token = window.localStorage.getItem('token')
        if (!user && (token && token.length > 10)) {
            logInUser(token, (res) => {
                changeUser(res.data)
            }, (err) => {
            })
        }

    }, [user, changeUser])

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
        //setIsLoggedIn(false)
        changeUser(null)
    }

    const renderLoggedIn = () => {
        if (user) {
            return [
                <div key="1" className="authcontainer" onClick={handleMenu}>
                    <p className="authToolLabel"> {user._id}</p>
                    <div
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit">
                        <AccountCircle/>
                    </div>
                </div>,
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    key="2"
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                            horizontal: 'right',
                        }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>

                        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                    </Menu>

            ]
        } else {
            return (
                <a href={BACKEND_ADDRESS + '/auth/login'}>
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

    return (
        <ToolbarBox>
            {renderLoggedIn()}
        </ToolbarBox>
    )

}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps, {changeUser})(AuthToolbar)