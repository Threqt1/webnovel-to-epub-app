import {
    Box,
    Button,
    Flex,
    IconButton,
    Input,
    Spacer,
    Stack,
    Wrap,
    WrapItem,
    Text,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

import NovelsListItem from "./NovelsListItem";

export default function NovelsList() {
    return (
        <Flex className="w-full h-full items-center" direction="column">
            <Flex className="w-full px-2">
                <Input
                    className="!w-1/4"
                    variant="flushed"
                    size="md"
                    width="auto"
                    placeholder="Search for a novel"
                />
                <Spacer />
                <Stack direction="row">
                    <IconButton icon={<FaPlus />} aria-label="Add new novel" />
                </Stack>
            </Flex>
            <Box className="my-4" />
            <Wrap
                className="w-full overflow-y-scroll overflow-x-hidden grow"
                spacing="30px"
                justify="center"
            >
                <WrapItem>
                    <NovelsListItem
                        title="SSS-Class Suicide Hunter"
                        coverImage="https://i3.wp.com/woopread.com/wp-content/uploads/2020/05/sss-class-suicide-hunter-75x106.png"
                        latestChapters={[
                            {
                                read: false,
                                name: "Chapter 1201",
                            },
                            {
                                read: false,
                                name: "Chapter 1201",
                            },
                            {
                                read: true,
                                name: "Chapter 1201",
                            },
                        ]}
                    />
                </WrapItem>
                <WrapItem>
                    <NovelsListItem
                        title="SSS-Class Suicide Hunter"
                        coverImage="https://i3.wp.com/woopread.com/wp-content/uploads/2020/05/sss-class-suicide-hunter-75x106.png"
                        latestChapters={[
                            {
                                read: false,
                                name: "Chapter 1201",
                            },
                            {
                                read: true,
                                name: "Chapter 1201",
                            },
                            {
                                read: true,
                                name: "Chapter 1201",
                            },
                        ]}
                    />
                </WrapItem>
            </Wrap>
            <Box className="my-4" />
            <Flex className="w-1/2 px-2">
                <Button size="md" colorScheme="gray">
                    Previous
                </Button>
                <Spacer />
                <Text className="text-center">Page 1 of 1</Text>
                <Spacer />
                <Button size="md" colorScheme="gray">
                    Next
                </Button>
            </Flex>
        </Flex>
    );
}
