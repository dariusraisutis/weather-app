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

interface ICustomButtonProps {
    label: string;
    isDisabled: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton = ({ label, isDisabled, onClick }: ICustomButtonProps): JSX.Element => {
    const classes = useStyles();
    return (
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size={"medium"}
                disabled={isDisabled}
                onClick={onClick}
            >
                {label}
            </Button>
    );
}

export default CustomButton;