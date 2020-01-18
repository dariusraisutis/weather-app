import React from "react";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
            textAlign: "left"
        },
    }),
);

interface ICustomerHeaderProps {
    text: string;
}

const CustomHeader = ({ text }: ICustomerHeaderProps): JSX.Element => {
    const classes = useStyles();

    return <>
        <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
                {text}
            </Typography>
        </Paper>
    </>;
}

export default CustomHeader;