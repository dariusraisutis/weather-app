import React from "react"
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            flex: 1
        },
    }),
);

interface ICustomButton {
    label: string;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

const CustomButton = ({ label, onClick }: ICustomButton): JSX.Element => {
    const classes = useStyles();
    return (
            <span onClick={onClick}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    size={"medium"}
                >
                    {label}
                </Button>
            </span>
    );
}

export default CustomButton;