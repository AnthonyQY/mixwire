import { Stack, Title, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import {
  selectCurrentlyPlayingAudioList,
  selectUpcomingAudioList,
} from '../../../store/upcomingSlice';
import UpcomingListItem from '../UpcomingListItem/UpcomingListItem';
import CurrentlyPlayingListItem from '../CurrentlyPlayingListItem/CurrentlyPlayingListItem';

export default function UpcomingList() {
  const currentlyPlayingAudioList = useSelector(
    selectCurrentlyPlayingAudioList,
  );
  const upcomingAudioList = useSelector(selectUpcomingAudioList);

  return (
    <>
      <Title order={2} style={{ fontWeight: 500 }}>
        Currently Playing
      </Title>
      {currentlyPlayingAudioList.length > 0 ? (
        <Stack>
          {currentlyPlayingAudioList.map((item: any) => {
            return (
              <CurrentlyPlayingListItem
                key={crypto.randomUUID()}
                audio={item}
              />
            );
          })}
        </Stack>
      ) : (
        <Text>None</Text>
      )}

      <Title order={2} style={{ fontWeight: 300 }}>
        Upcoming
      </Title>
      {upcomingAudioList.length > 0 ? (
        <Stack>
          {upcomingAudioList.map((item: any) => {
            return <UpcomingListItem key={crypto.randomUUID()} audio={item} />;
          })}
        </Stack>
      ) : (
        <Text>None</Text>
      )}
    </>
  );
}
