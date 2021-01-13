import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import ToolbarBox from "./ToolbarBox";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {changeUser, selectedNewPlan} from "../redux/actions";
import {isEmpty} from "../model/processing";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {createNewPlan, getToken, logInUser} from "../model/networking";

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        padding: '0',
        margin: '6px',
        minWidth: 130,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    planText: {
        fontSize: '1rem'
    },
    label: {
        fontSize: '1rem'
    },
    box: {
        marginRight: '24px'
    }
}));

const PlanToolbar = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogPlanName, setDialogPlanName] = useState('')
    const classes = useStyles();
    const isLoggedIn = !isEmpty(props.user)
    if (!isLoggedIn) {
        console.log("Invalid state: PlanToolbar must not exist if user is logged out")
        throw new Error("Invalid state: PlanToolbar must not exist if user is logged out")
    }
    const plans = props.user.planIDs


    useEffect(() => {
        if (!props.currentSelectedPlan && (plans.length > 0)) {
            props.selectedNewPlan(plans[0], getToken(window))
        }
    })
    const renderPlanOptions = (plans) => {
        return plans.map((planElem) =>
            <MenuItem value={planElem._id} key={planElem._id}>{planElem.name}</MenuItem>
        )
    }

    const handleChange = (event) => {
        if (event.target.value === 'add') {

        } else {
            props.selectedNewPlan(plans.find((e) => e._id === event.target.value), getToken(window))
            //setPlan(event.target.value)
        }
    }

    const theme = createMuiTheme({
        palette: {
            type: "dark"
        },
        overrides: {
            MuiSelect: {}
        }
    });
    const handlePlanDialogSubmit = () => {
        if (dialogPlanName.length > 2) {
            createNewPlan(getToken(window), dialogPlanName, (res) => {
                const newplan = res.data
                console.log("New plan: ", newplan)
                logInUser(getToken(window), null, null, props.changeUser,
                    () => props.selectedNewPlan(newplan, getToken(window)))

            })
            setDialogPlanName('')
            setDialogOpen(false)
        } else {
            //TODO Handle incorrect input
        }

    }

    return (
        <ToolbarBox padding="0" className={classes.box}>
            <ThemeProvider theme={theme}><FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" className={classes.label}>Selected Plan</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={(props.currentSelectedPlan && props.currentSelectedPlan._id) || ''}
                    className={classes.planText}
                    onChange={handleChange}
                >
                    {renderPlanOptions(plans)}
                    <Divider/>
                    <MenuItem value={'add'} key={'add'} onClick={() => setDialogOpen(true)}>Add new plan</MenuItem>
                </Select>
            </FormControl></ThemeProvider>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle id="plan-create-dialog-title">Create new plan</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please choose a new name for this plan.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogPlanName}
                        onChange={(e) => setDialogPlanName(e.target.value)}
                        label="Plan name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePlanDialogSubmit} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </ToolbarBox>
    )
}


function mapStateToProps(state) {
    return {
        user: state.user,
        currentSelectedPlan: state.selectedPlan
    };
}

export default connect(mapStateToProps, {selectedNewPlan, changeUser})(PlanToolbar);