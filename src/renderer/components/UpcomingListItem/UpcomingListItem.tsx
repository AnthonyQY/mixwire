/* eslint-disable no-bitwise */
import { Group, Image, Stack, Text, UnstyledButton } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHover } from '@mantine/hooks';
import { IconPlayerPlay, IconX } from '@tabler/icons-react';
import { setCurrentAudio } from '../../../store/playerSlice';
import {
  addCurrentlyPlayingAudio,
  removeUpcomingAudioByID,
  selectCurrentlyPlayingAudioList,
} from '../../../store/upcomingSlice';

import styles from './UpcomingListItem.module.css';

export default function UpcomingListItem({ audio }: { audio: any }) {
  const dispatch = useDispatch();

  const { hovered, ref } = useHover();

  const currentlyPlayingAudioList = useSelector(
    selectCurrentlyPlayingAudioList,
  );

  const handleLoadTrack = () => {
    if (currentlyPlayingAudioList.some((x: any) => x.id === audio.id)) {
      alert("Can't add more than 1 of the same track!");
      return;
    }
    dispatch(setCurrentAudio(audio));

    dispatch(addCurrentlyPlayingAudio(audio));
    dispatch(removeUpcomingAudioByID(audio.id));
  };

  const handleRemoveItem = () => {
    dispatch(removeUpcomingAudioByID(audio.id));
  };

  function trimTo10Chars(str: string): string {
    if (str.length <= 10) {
      return str;
    }
    return `${str.slice(0, 10)}...`;
  }

  return (
    <Group
      className={styles.listItem}
      style={{
        padding: '0.5rem',
        borderRadius: '0.25rem',
      }}
      ref={ref}
    >
      <Image
        radius="md"
        w={50}
        h={50}
        fit="cover"
        src={audio.imageString}
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />
      <Stack
        gap={0}
        style={{ width: '100px', overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
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
      {hovered ? (
        <>
          <UnstyledButton
            className={styles.closeButton}
            onClick={handleRemoveItem}
            style={{ marginLeft: 'auto' }}
          >
            <IconX />
          </UnstyledButton>
          <UnstyledButton
            className={styles.playButton}
            onClick={handleLoadTrack}
          >
            <IconPlayerPlay />
          </UnstyledButton>{' '}
        </>
      ) : null}
    </Group>
  );
}
