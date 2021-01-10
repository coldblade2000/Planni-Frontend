import React, {useState} from 'react';
import {connect} from 'react-redux';
import ToolbarBox from "./ToolbarBox";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {selectedNewPlan} from "../redux/actions";
import {isEmpty} from "../model/processing";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';

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
    const classes = useStyles();
    const isLoggedIn = !isEmpty(props.user)
    if (!isLoggedIn) {
        console.log("Invalid state: PlanToolbar must not exist if user is logged out")
        throw new Error("Invalid state: PlanToolbar must not exist if user is logged out")
    }
    const plans = props.user.planIDs
    const [plan, setPlan] = useState((plans.length > 0) ? plans[0]._id : '')

    const renderPlanOptions = (plans) => {
        return plans.map((planElem) =>
            <MenuItem value={planElem._id} key={planElem._id}>{planElem.name}</MenuItem>
        )
    }

    const handleChange = (event) => {
        props.selectedNewPlan(plans.find((e) => e._id === event.target.value))
        setPlan(event.target.value)
    }

    const theme = createMuiTheme({
        palette: {
            type: "dark"
        },
        overrides: {
            MuiSelect: {}
        }
    });

    return (
        <ToolbarBox padding="0" className={classes.box}>
            <ThemeProvider theme={theme}><FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" className={classes.label}>Selected Plan</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={plan}
                    className={classes.planText}
                    onChange={handleChange}
                >
                    {renderPlanOptions(plans)}
                </Select>
            </FormControl></ThemeProvider>
        </ToolbarBox>
    )
}


function mapStateToProps(state) {
    return {
        user: state.user,
        currentSelectedPlan: state.selectedPlan
    };
}

export default connect(mapStateToProps, {selectedNewPlan})(PlanToolbar);