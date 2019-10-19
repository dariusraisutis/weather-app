import React from "react"
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            width: 250
        },
    }),
);

interface ICustomButton {
    label: string;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

const CustomButton = (props: ICustomButton): JSX.Element => {
    const { label, onClick } = props;
    const classes = useStyles();
    
    return (
        <div>
            <span onClick={onClick}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    {label}
                </Button>
            </span>
        </div>
    );
}

export default CustomButton;