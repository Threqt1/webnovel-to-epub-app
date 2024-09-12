import {
    Button,
    Center,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const baseOptionsSchema = Yup.object().shape({
    imageQuality: Yup.number().required("Must input a number"),
    imageShouldResize: Yup.boolean().required(),
    imageWidth: Yup.number().required("Must input a number"),
    imageHeight: Yup.number().required("Must input a number"),
});

export default function MiscDetailsView(props: {
    submit: (values: {
        imageQuality: number;
        imageShouldResize: boolean;
        imageWidth: number;
        imageHeight: number;
    }) => void;
}) {
    return (
        <Formik
            initialValues={{
                imageQuality: 80,
                imageShouldResize: false,
                imageWidth: 1920,
                imageHeight: 1080,
            }}
            validationSchema={baseOptionsSchema}
            onSubmit={(values) => {
                props.submit(values);
            }}
        >
            {({ errors, touched, values, setFieldValue }) => (
                <Form>
                    <Stack
                        className="w-full h-full items-center"
                        spacing="20px"
                        direction="column"
                    >
                        <Heading className="py-4">Image Options</Heading>
                        <FormControl
                            isInvalid={
                                errors.imageQuality && touched.imageQuality
                            }
                        >
                            <FormLabel className="!text-center">
                                Image Quality
                            </FormLabel>
                            <Field name="imageQuality">
                                {({ field }: any) => (
                                    <NumberInput
                                        defaultValue={field.value}
                                        onChange={(value) =>
                                            setFieldValue(
                                                "imageQuality",
                                                parseInt(value)
                                            )
                                        }
                                        min={1}
                                        max={100}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                            <FormErrorMessage>
                                {errors.imageQuality}
                            </FormErrorMessage>
                            <FormHelperText>
                                The quality images should be saved at (less
                                means they take up less space)
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors.imageShouldResize &&
                                touched.imageShouldResize
                            }
                        >
                            <FormLabel className="!text-center">
                                Should Resize Image
                            </FormLabel>
                            <Center>
                                <Field name="imageShouldResize" as={Checkbox} />
                            </Center>
                            <FormErrorMessage>
                                {errors.imageShouldResize}
                            </FormErrorMessage>
                            <FormHelperText>
                                If the image should be resized during saving
                                (helps save space as well)
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            isInvalid={errors.imageWidth && touched.imageWidth}
                            isDisabled={!values.imageShouldResize}
                        >
                            <FormLabel className="!text-center">
                                Image Width
                            </FormLabel>
                            <Field name="imageWidth">
                                {({ field }: any) => (
                                    <NumberInput
                                        defaultValue={field.value}
                                        onChange={(value) =>
                                            setFieldValue(
                                                "imageWidth",
                                                parseInt(value)
                                            )
                                        }
                                        min={1}
                                        step={100}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                            <FormErrorMessage>
                                {errors.imageWidth}
                            </FormErrorMessage>
                            <FormHelperText>
                                The width of the resized images
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors.imageHeight && touched.imageHeight
                            }
                            isDisabled={!values.imageShouldResize}
                        >
                            <FormLabel className="!text-center">
                                Image Width
                            </FormLabel>
                            <Field name="imageHeight">
                                {({ field }: any) => (
                                    <NumberInput
                                        defaultValue={field.value}
                                        onChange={(value) =>
                                            setFieldValue(
                                                "imageHeight",
                                                parseInt(value)
                                            )
                                        }
                                        min={1}
                                        step={100}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                            <FormErrorMessage>
                                {errors.imageHeight}
                            </FormErrorMessage>
                            <FormHelperText>
                                The height of the resized images
                            </FormHelperText>
                        </FormControl>
                        <Button colorScheme="blue" type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}
