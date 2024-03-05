/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import {
  AppShell,
  Image,
  Group,
  Stack,
  Title,
  Switch,
  useMantineColorScheme,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import PlayerStack from '../components/PlayerStack/PlayerStack';

import AudioGrid from '../components/AudioGrid/AudioGrid';
import FileUpload from '../components/FileUpload/FileUpload';
import UpcomingList from '../components/UpcomingList/UpcomingList';
import { selectAllAudio, setPlaylistAudio } from '../../store/playlistSlice';

import Logo from './logo3.png';

export default function PlayerPage() {
  const dispatch = useDispatch();

  const { setColorScheme, colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const allAudio = useSelector(selectAllAudio);

  const [dark, setDark] = useState(false);

  window.addEventListener('beforeunload', () => {
    window.serializeApi.serializeData(JSON.stringify(allAudio));
  });

  useEffect(() => {
    window.serializeApi.deserializeData();

    window.serializeApi.onDataLoad((data: any) => {
      dispatch(setPlaylistAudio(JSON.parse(data)));
    });
  }, []);

  useEffect(() => {
    if (dark) {
      setColorScheme('dark');
    } else {
      setColorScheme('light');
    }
  }, [dark]);

  return (
    <AppShell navbar={{ width: 300, breakpoint: 'none' }} padding="md">
      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: colorScheme === 'dark' ? '#191a1f' : 'white',
        }}
      >
        <Stack justify="space-between" style={{ width: '100%' }} gap={20}>
          <Group style={{ WebkitAppRegion: 'drag' }}>
            <Image
              radius="md"
              w={60}
              h={60}
              src={Logo}
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
            <Title order={1}>MixWire</Title>
          </Group>
          <Group>
            <FileUpload />
            <Switch
              checked={dark}
              onChange={(event) => setDark(event.currentTarget.checked)}
              offLabel={<IconSun style={{ width: '1rem' }} />}
              onLabel={<IconMoon style={{ width: '1rem' }} />}
              color="orangered"
            />
          </Group>
          <UpcomingList />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          backgroundColor: colorScheme === 'dark' ? '#1b1c22' : 'white',
        }}
      >
        <Stack>
          <Group>
            <Title order={1}>Your Tracks</Title>
          </Group>
          <AudioGrid />
        </Stack>
      </AppShell.Main>{' '}
      <PlayerStack />
    </AppShell>
  );
}
