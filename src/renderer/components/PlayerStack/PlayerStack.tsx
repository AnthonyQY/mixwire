import { useSelector } from 'react-redux';
import { Stack } from '@mantine/core';
import { selectCurrentAudio } from '../../../store/playerSlice';
import Player from '../Player/Player';

export default function PlayerStack() {
  const currentAudioList = useSelector(selectCurrentAudio);
  return (
    <Stack
      style={{
        width: `100%`,
        position: 'fixed',
        bottom: '0',
        zIndex: 9999,
      }}
      gap={0}
    >
      {currentAudioList.map((x: any) => {
        return <Player key={x.id} audio={x} />;
      })}
    </Stack>
  );
}
