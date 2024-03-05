import { useSelector } from 'react-redux';
import { Grid } from '@mantine/core';
import { selectAllAudio } from '../../../store/playlistSlice';
import AudioGridTile from '../AudioGridTile/AudioGridTile';

export default function AudioGrid() {
  const allAudio = useSelector(selectAllAudio);

  return allAudio ? (
    <Grid>
      {allAudio.map((item: any) => {
        return (
          <Grid.Col
            key={item.id}
            span={{
              xs: 12 / 2,
              sm: 12 / 3,
              md: 12 / 4,
              lg: 12 / 5,
              xl: 12 / 6,
            }}
          >
            <AudioGridTile audio={item} />
          </Grid.Col>
        );
      })}
    </Grid>
  ) : null;
}
