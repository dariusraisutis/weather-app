import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme: Theme) => {
    createStyles({
        root: {
            flexGrow: 1
        }
    })
});



const CustomGrid = () => {
    const classes = useStyles();
    return <>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
            {[0, 1, 2].map(value => (
                <Grid key={value} item>
                </Grid>
            ))}
            </Grid>
        </Grid>
        </Grid>
    </>;
}

export default CustomGrid;