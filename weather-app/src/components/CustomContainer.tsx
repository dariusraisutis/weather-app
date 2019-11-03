import React, { Children } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

interface ICustomContainerProps {
    backgroundColor?: string;
    height?: string;
}
const CustomContainer = () => {
    return <>
        <CssBaseline />
        <Container maxWidth={"lg"}>
        </Container>
    </>;
}

export default CustomContainer;