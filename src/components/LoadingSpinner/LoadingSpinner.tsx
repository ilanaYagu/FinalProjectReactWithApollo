import { Box } from "@mui/material";
import { SpinnerCircularSplit } from 'spinners-react';

const LoadingSpinner = () =>
    <Box textAlign="center" marginTop={"15%"}>
        <SpinnerCircularSplit size={"5%"} color="white" />
    </Box>

export default LoadingSpinner;
