import {
    Card,
    Stack,
    Flex,
    Heading,
    Icon,
    Button,
    Text,
    Image,
} from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa6";

type NovelsListItemChapter = {
    read: boolean;
    name: string;
};

type NovelsListItemProps = {
    title: string;
    coverImage: string;
    latestChapters: NovelsListItemChapter[];
};

export default function NovelsListItem(props: NovelsListItemProps) {
    return (
        <Card className="max-w-lg overflow-hidden p-2">
            <Stack direction="row" spacing={3}>
                <Image
                    objectFit="cover"
                    boxSize="200px"
                    src={props.coverImage}
                    className="rounded-md"
                />
                <Flex direction="column">
                    <Stack spacing={4} className="grow">
                        <Heading size="md">{props.title}</Heading>

                        <Stack>
                            {...props.latestChapters.map((r) => {
                                return (
                                    <Stack direction="row" align="center">
                                        <Icon
                                            as={FaCircle}
                                            color={`${
                                                r.read ? "green" : "red"
                                            }.500`}
                                            boxSize={2.5}
                                        />
                                        <Text noOfLines={1}>{r.name}</Text>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Stack>
                    <Button colorScheme="blue">View</Button>
                </Flex>
            </Stack>
        </Card>
    );
}
