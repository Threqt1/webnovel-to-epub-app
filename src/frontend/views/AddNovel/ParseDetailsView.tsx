import { Center, Spinner, Stack, Text } from "@chakra-ui/react";

export default function ParseDetailsView() {
    return (
        <Center className="w-full h-full">
            <Stack
                dir="column"
                className="w-1/2"
                align={"center"}
                spacing={"15px"}
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
                <Text>Loading Webnovel Data...</Text>
            </Stack>
        </Center>
    );
}
