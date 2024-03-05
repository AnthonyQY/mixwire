/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import {
  FileButton,
  Button,
  Modal,
  Group,
  TextInput,
  Stack,
} from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { addPlaylistAudio } from '../../../store/playlistSlice';

export default function FileUpload() {
  const dispatch = useDispatch();

  const [opened, { open, close }] = useDisclosure(false);

  const [audioData, setAudioData] = useState<any | null>(null);
  const [audioDataPath, setAudioDataPath] = useState<string>('None');
  const [imageData, setImageData] = useState<any | null>(null);
  const [imageDataPath, setImageDataPath] = useState<string>('None');

  const handleFileChange = (file: File | null) => {
    if (file) {
      setAudioDataPath(file?.path);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAudioData(e.target?.result?.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageDataPath(file?.path);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageData(e.target?.result?.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const name = e.target[0].value;
    const artist = e.target[1].value;
    if (!audioData) {
      alert('No file selected!');
      return;
    }

    dispatch(
      addPlaylistAudio({
        id: crypto.randomUUID(),
        name,
        artist,
        audioString: audioData,
        imageString: imageData,
      }),
    );

    setAudioData(null);
    setAudioDataPath('None');

    setImageData(null);
    setImageDataPath('None');

    e.target.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Track" centered>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack>
            <TextInput label="Track Name (optional)" />
            <TextInput label="Artist (optional)" />
            <Group align="flex-end" style={{ width: '100%' }}>
              <TextInput
                label="Selected Audio File"
                value={audioDataPath}
                flex={1}
                readOnly
              />
              <FileButton
                onChange={(file) => handleFileChange(file)}
                accept="*"
              >
                {(props) => (
                  <Button {...props} color="orangered">
                    Select Audio
                  </Button>
                )}
              </FileButton>
            </Group>
            <Group align="flex-end" style={{ width: '100%' }}>
              <TextInput
                label="Selected Image File"
                value={imageDataPath}
                flex={1}
                readOnly
              />
              <FileButton
                onChange={(file) => handleImageChange(file)}
                accept="*"
              >
                {(props) => (
                  <Button {...props} color="orangered">
                    Select Image
                  </Button>
                )}
              </FileButton>
            </Group>
            <Button type="submit" leftSection={<IconPlus />} color="orangered">
              Add
            </Button>
          </Stack>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />} color="orangered">
        Add New Track
      </Button>
    </>
  );
}
