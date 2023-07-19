import React, {useState} from 'react';
import {connect} from 'react-redux';
import CourseList from "./CourseList";
import {
    Badge,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import '../stylesheets/PlanTab.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import {getToken, logInUser} from "../../model/networking";
import {changeUser, selectedNewPlanWithUpdate} from "../../redux/actions";

const PlanTab = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogPlanName, setDialogPlanName] = useState('')

    const handlePlanDialogSubmit = async () => {
        if (dialogPlanName.length > 2 && dialogPlanName.length <= 24) {
            const newPlan = {...props.plan}
            newPlan.name = dialogPlanName
            await props.selectedNewPlanWithUpdate(newPlan, getToken(window)).then(async () => {
                await logInUser(getToken(window), null, null, props.changeUser)
            })
            console.log("Called user login")
            setDialogPlanName('')
            setDialogOpen(false)
        } else {
            //TODO Handle incorrect input
        }

    }

    const calculateCredits = () => {
        let num = 0
        for (let course of props.plan.courseList) {
            if (course.credits) num = num + course.credits
        }
        return num
    }

    return (
        <div className="plantab">
            {/*<div className="topInfo headerItem">
                <Typography variant='h3'>{props.plan.name}</Typography>
            </div>*/}
            <Toolbar>
                <Typography variant='h6'>{props.plan.name}</Typography>
                <div className="grow"/>
                <IconButton aria-label={`there are ${''} alerts`} color="inherit" size="large">
                    <Badge badgeContent={4} color="secondary">
                        <WarningIcon/>
                    </Badge>
                </IconButton>
                <IconButton
                    aria-label="rename plan"
                    onClick={() => setDialogOpen(true)}
                    color="inherit"
                    size="large">
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="delete plan" color="inherit" size="large">
                    <DeleteForeverIcon/>
                </IconButton>
            </Toolbar>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle id="plan-create-dialog-title">Rename plan</DialogTitle>
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
                        Rename Plan
                    </Button>
                </DialogActions>
            </Dialog>
            <Divider/>
            <Typography className="headerItem centertext" variant="subtitle1" gutterBottom>
                {`You have selected ${calculateCredits()} credits`}
            </Typography>
            <CourseList usesSearch={false}/>
        </div>
    );
}


function mapStateToProps(state) {
    return {plan: state.selectedPlan};
}

export default connect(mapStateToProps, {changeUser, selectedNewPlanWithUpdate})(PlanTab);