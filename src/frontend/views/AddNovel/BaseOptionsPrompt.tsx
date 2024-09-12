import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const baseOptionsSchema = Yup.object().shape({
    url: Yup.string()
        .url("Invalid URL")
        .required("Must input a URL")
        .test(
            "scraper-exists",
            "Scraper doesn't exist for this URL",
            async (value) => {
                let scraper = await window.electronAPI.checkScraperExistence(
                    value
                );
                return scraper;
            }
        ),
    concurrency: Yup.number().required("Must input a number"),
    timeout: Yup.number().required("Must input a number"),
});

export default function BaseOptionsPrompt(props: {
    submit: (values: {
        url: string;
        concurrency: number;
        timeout: number;
    }) => void;
}) {
    return (
        <Formik
            initialValues={{
                url: "",
                concurrency: 3,
                timeout: 10000,
            }}
            validationSchema={baseOptionsSchema}
            onSubmit={(values) => {
                props.submit(values);
            }}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form>
                    <Stack
                        className="w-full h-full items-center"
                        spacing="20px"
                        direction="column"
                    >
                        <FormControl isInvalid={errors.url && touched.url}>
                            <FormLabel className="!text-center">
                                Novel Table of Contents URL
                            </FormLabel>
                            <Field
                                name="url"
                                as={Input}
                                placeholder="https://woopread.com/series/sss-class-suicide-hunter/"
                            />
                            <FormErrorMessage>{errors.url}</FormErrorMessage>
                            <FormHelperText>
                                The URL for the novel's table of contents page.
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors.concurrency && touched.concurrency
                            }
                        >
                            <FormLabel className="!text-center">
                                Page Concurrency
                            </FormLabel>
                            <Field name="concurrency">
                                {({ field }: any) => (
                                    <NumberInput
                                        defaultValue={field.value}
                                        onChange={(value) =>
                                            setFieldValue(
                                                "concurrency",
                                                parseInt(value)
                                            )
                                        }
                                        min={1}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                            <FormErrorMessage>{errors.url}</FormErrorMessage>
                            <FormHelperText>
                                The number of pages to concurrently parse
                                chapters with
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            isInvalid={errors.timeout && touched.timeout}
                        >
                            <FormLabel className="!text-center">
                                Maximum Timeout
                            </FormLabel>
                            <Field name="timeout">
                                {({ field }: any) => (
                                    <NumberInput
                                        defaultValue={field.value}
                                        onChange={(value) =>
                                            setFieldValue(
                                                "timeout",
                                                parseInt(value)
                                            )
                                        }
                                        step={1000}
                                        min={100}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                            <FormErrorMessage>{errors.url}</FormErrorMessage>
                            <FormHelperText>
                                The maximum timeout to wait on resources to
                                load, in milliseconds
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
