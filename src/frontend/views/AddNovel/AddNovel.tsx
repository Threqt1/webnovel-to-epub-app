import {
    Box,
    Stack,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    useSteps,
} from "@chakra-ui/react";
import { useState } from "react";
import BaseOptionsPrompt from "./BaseOptionsPrompt";
import ParseDetailsView from "./ParseDetailsView";

const steps: string[] = [
    "Configure Base Options",
    "Parse Details",
    "Configure Miscellaneous Options",
];

export default function AddNovel() {
    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    function onSubmitBaseOptionsPrompt(values: {
        url: string;
        concurrency: number;
        timeout: number;
    }) {}

    const [activeView, setActiveView] = useState(
        //<BaseOptionsPrompt submit={onSubmitBaseOptionsPrompt} />
        <ParseDetailsView />
    );

    return (
        <Stack direction="column" className="w-full h-full" spacing="20px">
            <Stepper index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box className="shrink-0">
                            <StepTitle>{step}</StepTitle>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            {activeView}
        </Stack>
    );
}
