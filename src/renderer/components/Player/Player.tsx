/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import {
  Box,
  Slider,
  Group,
  UnstyledButton,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipForwardFilled,
  IconRepeat,
  IconVolume,
  IconVolumeOff,
  IconX,
} from '@tabler/icons-react';
import ReactHowler from 'react-howler';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAudio } from '../../../store/playerSlice';
import {
  shiftUpcomingAudioList,
  selectUpcomingAudioList,
  removeCurrentlyPlayingAudioByID,
  addCurrentlyPlayingAudio,
} from '../../../store/upcomingSlice';

import styles from './Player.module.css';

export default function Player({ audio }: { audio: any }) {
  const dispatch = useDispatch();

  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const upcomingAudioList = useSelector(selectUpcomingAudioList);

  const trackRef = useRef<any>(null);

  const [audioSource, setAudioSource] = useState<any>(audio);

  const [audioPlaying, setAudioPlaying] = useState<boolean>(true);
  const [audioPosition, setAudioPosition] = useState<any>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const [audioVolume, setAudioVolume] = useState<number>(0.5);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  const [renderedPosition, setRenderedPosition] = useState<any>(0);

  const [skipping, setSkipping] = useState<boolean>(false);
  const [looping, setLooping] = useState<boolean>(false);
  const [ending, setEnding] = useState<boolean>(false);

  const handlePlayerOnLoad = () => {
    if (trackRef.current) {
      setAudioDuration(trackRef.current.duration());
    }
  };

  const handleUnloadTrack = () => {
    dispatch(removeAudio(audioSource.id));
    dispatch(removeCurrentlyPlayingAudioByID(audioSource.id));
  };

  useEffect(() => {
    if (ending) {
      if (looping) {
        setEnding(false);
        return;
      }
      setSkipping(true);
    }
  }, [ending]);

  useEffect(() => {
    if (skipping) {
      if (upcomingAudioList.length > 0) {
        const nextTrack = { ...upcomingAudioList[0] };
        dispatch(shiftUpcomingAudioList());
        setAudioSource(nextTrack);
        dispatch(addCurrentlyPlayingAudio(nextTrack));
      } else {
        handleUnloadTrack();
      }
      dispatch(removeCurrentlyPlayingAudioByID(audioSource.id));
      setSkipping(false);
      setEnding(false);
    }
  }, [skipping]);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.seek(audioPosition);
      setRenderedPosition(audioPosition);
    }
  }, [audioPosition]);

  useEffect(() => {
    if (trackRef.current && audioPlaying) {
      const interval = setInterval(() => {
        setRenderedPosition(trackRef.current.seek());
      }, 100); // Update every second
      return () => clearInterval(interval);
    }
  }, [audioPlaying]);

  const secondsToMinutes = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.round(seconds % 60);
    const paddedSeconds: string =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutes}:${paddedSeconds}`;
  };

  return (
    <>
      <Group
        style={{
          backgroundColor: colorScheme === 'dark' ? '#0f0f10' : 'white',
          height: 100,
          width: '100%',
          zIndex: 998,
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <Image
          radius="md"
          w={60}
          h={60}
          src={audioSource.imageString}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
        <Stack
          gap={0}
          style={{ width: '5vw', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          <Text size="xl">
            {audioSource?.name ? audioSource.name : 'Untitled Track'}
          </Text>
          <Text size="sm">
            {audioSource?.artist ? audioSource.artist : 'Unknown Author'}
          </Text>
        </Stack>
        <UnstyledButton
          className={styles.playerButton}
          onClick={() => setAudioPlaying(!audioPlaying)}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {audioPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
        </UnstyledButton>
        <UnstyledButton
          className={styles.playerButton}
          style={{ display: 'flex', justifyContent: 'center' }}
          onClick={() => setSkipping(true)}
        >
          <IconPlayerSkipForwardFilled />
        </UnstyledButton>
        <Text>{secondsToMinutes(renderedPosition)}</Text>
        <Box flex={1}>
          <Slider
            color="orange"
            value={renderedPosition}
            onChange={setAudioPosition}
            min={0}
            max={audioDuration}
            style={{ width: '100%' }}
            label={(value) => secondsToMinutes(value)}
          />
        </Box>
        <Text>{secondsToMinutes(audioDuration)}</Text>
        <UnstyledButton
          className={styles.playerButton}
          style={{ display: 'flex', justifyContent: 'center' }}
          onClick={() => setAudioMuted(!audioMuted)}
        >
          {audioMuted ? <IconVolumeOff /> : <IconVolume />}
        </UnstyledButton>
        <Box flex={0.25}>
          <Slider
            color="orange"
            value={audioVolume}
            onChange={setAudioVolume}
            min={0}
            step={0.01}
            max={1}
            style={{ width: '100%' }}
            label={(value) => Math.ceil(100 * value)}
            disabled={audioMuted}
          />
        </Box>
        <UnstyledButton
          className={styles.playerButton}
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: looping ? 'orangered' : 'inherit',
          }}
          onClick={() => setLooping(!looping)}
        >
          <IconRepeat />
        </UnstyledButton>

        <UnstyledButton
          className={styles.playerButton}
          style={{ display: 'flex', justifyContent: 'center' }}
          onClick={handleUnloadTrack}
        >
          <IconX />
        </UnstyledButton>
      </Group>
      {audioSource ? (
        <ReactHowler
          src={audioSource.audioString}
          playing={audioPlaying}
          ref={trackRef}
          onLoad={handlePlayerOnLoad}
          volume={audioVolume}
          mute={audioMuted}
          onEnd={() => {
            setEnding(true);
          }}
          loop={looping}
        />
      ) : null}
    </>
  );
}
