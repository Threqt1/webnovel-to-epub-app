import {
    Box,
    Center,
    Heading,
    List,
    ListItem,
    Progress,
    Stack,
    UnorderedList,
} from "@chakra-ui/react";

export default function ParseDetailsView() {
    return (
        <Center className="w-full h-full">
            <Stack className="grow" direction={"column"} spacing={"20px"}>
                <Progress className="w-full grow" hasStripe value={50} />
                <Center>
                    <UnorderedList>
                        <ListItem>H</ListItem>
                        <ListItem>H</ListItem>
                        <ListItem>H</ListItem>
                        <ListItem>H</ListItem>
                        <ListItem>H</ListItem>
                        <ListItem>H</ListItem>
                        <ListItem>Edward is a bitch</ListItem>
                        <ListItem>H</ListItem>
                    </UnorderedList>
                </Center>
            </Stack>
        </Center>
    );
}
