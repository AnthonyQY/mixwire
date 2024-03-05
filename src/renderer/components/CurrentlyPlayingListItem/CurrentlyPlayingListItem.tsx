/* eslint-disable no-bitwise */
import {
  Group,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';

export default function CurrentlyPlayingListItem({ audio }: { audio: any }) {
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  function trimTo10Chars(str: string): string {
    if (str.length <= 10) {
      return str;
    }
    return `${str.slice(0, 10)}...`;
  }

  return (
    <Group
      style={{
        backgroundColor: colorScheme === 'dark' ? '#25262c' : 'white',
        padding: '0.5rem',
        borderRadius: '0.25rem',
      }}
    >
      <Image
        radius="md"
        w={50}
        h={50}
        fit="cover"
        src={audio.imageString}
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />
      <Stack gap={0}>
        <Text size="xl">
          {audio?.name
            ? trimTo10Chars(audio.name)
            : trimTo10Chars('Untitled Track')}
        </Text>
        <Text size="sm">
          {audio?.artist
            ? trimTo10Chars(audio.artist)
            : trimTo10Chars('Unknown Author')}
        </Text>
      </Stack>
    </Group>
  );
}
