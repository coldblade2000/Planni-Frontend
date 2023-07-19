import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import ToolbarBox from "./ToolbarBox";
import {
    adaptV4Theme,
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
    TextField,
} from "@mui/material";
import {changeUser, selectedNewPlan} from "../redux/actions";
import {isEmpty} from "../model/processing";
import {createTheme, StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
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

/**
 * Toolbar element in charge of allowing the selection of a plan.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PlanToolbar = ({user, selectedNewPlan, currentSelectedPlan, changeUser}) => {
    //is the create plan dialog open?
    const [dialogOpen, setDialogOpen] = useState(false)
    //The current plan name in the dialog. Dialog text controller
    const [dialogPlanName, setDialogPlanName] = useState('')

    const classes = useStyles();
    const isLoggedIn = !isEmpty(user)
    if (!isLoggedIn) {
        console.log("Invalid state: PlanToolbar must not exist if user is logged out")
        throw new Error("Invalid state: PlanToolbar must not exist if user is logged out")
    }
    const plans = user.planIDs


    useEffect(() => {
        //Selects the first plan from the user if none has been selected already
        if (!currentSelectedPlan && (plans.length > 0)) {
            selectedNewPlan(plans[0], getToken(window))
        }
    })
    //Renders the menu with all the plans that are available
    const renderPlanOptions = (plans) => {
        return plans.map((planElem) =>
            <MenuItem value={planElem._id} key={planElem._id}>{planElem.name}</MenuItem>
        )
    }

    const handleChange = (event) => {
        if (event.target.value !== 'add') {
            selectedNewPlan(plans.find((e) => e._id === event.target.value), getToken(window))
            //setPlan(event.target.value)
        }
    }

    const theme = createTheme(adaptV4Theme({
        palette: {
            mode: "dark"
        },
        overrides: {
            MuiSelect: {}
        }
    }));
    const handlePlanDialogSubmit = () => {
        if (dialogPlanName.length > 2) {
            createNewPlan(getToken(window), dialogPlanName, (res) => {
                const newplan = res.data
                console.log("New plan: ", newplan)
                logInUser(getToken(window), null, null, changeUser,
                    () => selectedNewPlan(newplan, getToken(window)))

            })
            setDialogPlanName('')
            setDialogOpen(false)
        } else {
            //TODO Handle incorrect input
        }

    }

    return (
        <ToolbarBox padding="0" className={classes.box}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}><FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" className={classes.label}>Selected Plan</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={(currentSelectedPlan && currentSelectedPlan._id) || ''}
                        className={classes.planText}
                        onChange={handleChange}
                    >
                        {renderPlanOptions(plans)}
                        <Divider/>
                        <MenuItem value={'add'} key={'add'} onClick={() => setDialogOpen(true)}>Add new plan</MenuItem>
                    </Select>
                </FormControl></ThemeProvider>
            </StyledEngineProvider>
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
                        Create Plan
                    </Button>
                </DialogActions>
            </Dialog>
        </ToolbarBox>
    );
}


function mapStateToProps(state) {
    return {
        user: state.user,
        currentSelectedPlan: state.selectedPlan
    };
}

export default connect(mapStateToProps, {selectedNewPlan, changeUser})(PlanToolbar);