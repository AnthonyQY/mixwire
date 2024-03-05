/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-bitwise */
import {
  AspectRatio,
  Group,
  Image,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconPlayerPlayFilled, IconTrash, IconX } from '@tabler/icons-react';
import { useHover } from '@mantine/hooks';
import {
  addUpcomingAudio,
  selectUpcomingAudioList,
} from '../../../store/upcomingSlice';
import {
  removePlaylistAudioByID,
  selectAllAudio,
} from '../../../store/playlistSlice';

import styles from './AudioGridTile.module.css';

export default function AudioGridTile({ audio }: { audio: any }) {
  const dispatch = useDispatch();

  const { hovered, ref } = useHover();

  const upcomingAudioList = useSelector(selectUpcomingAudioList);
  const allAudio = useSelector(selectAllAudio);

  const handleLoadTrack = () => {
    if (upcomingAudioList.some((x: any) => x.id === audio.id)) {
      alert("Can't add more than 1 of the same track!");
      return;
    }
    dispatch(addUpcomingAudio(audio));
  };

  const handleRemoveTrack = () => {
    dispatch(removePlaylistAudioByID(audio.id));
    console.log(audio.id);
    console.log(allAudio);
  };

  return (
    <div>
      <AspectRatio ratio={1 / 1} ref={ref}>
        <Image
          radius="md"
          fit="cover"
          src={audio.imageString}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
        {hovered ? (
          <Group justify="center" gap="2rem">
            <UnstyledButton
              className={styles.audioGridButton}
              onClick={handleRemoveTrack}
            >
              <IconTrash size={32} />
            </UnstyledButton>
            <UnstyledButton
              className={styles.audioGridButton}
              onClick={handleLoadTrack}
            >
              <IconPlayerPlayFilled size={32} />
            </UnstyledButton>
          </Group>
        ) : null}
      </AspectRatio>
      <Stack gap={0}>
        <Text size="xl">{audio?.name ? audio.name : 'Untitled Track'}</Text>
        <Text size="sm">{audio?.artist ? audio.artist : 'Unknown Author'}</Text>
      </Stack>
    </div>
  );
}
