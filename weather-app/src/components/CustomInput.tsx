import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 150,
    },
  }),
);

interface ICustomInputProps {
  id: string;
  label: string;
  error: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({ id, label, onChange, error }: ICustomInputProps): JSX.Element => {
    const classes = useStyles();

    return <>
        <div className={classes.textField}>
            <TextField
                id={id}
                label={label}
                margin={"normal"}
                onChange={onChange}
                error={error}
            />
        </div>
    </>
}

export default CustomInput;