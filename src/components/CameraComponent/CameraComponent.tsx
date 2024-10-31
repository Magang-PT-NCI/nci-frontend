import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import CameraControls from './CameraControls';
import CameraPreview from './CameraPreview';

type CameraComponentProps = {
  onCapture: (photo: string) => void;
  onCancel: () => void;
};

const CameraComponent: React.FC<CameraComponentProps> = ({
  onCapture,
  onCancel,
}) => {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <CameraControls
        requestPermission={requestPermission}
        onCancel={onCancel}
      />
    );
  }

  const toggleCameraFacing = () =>
    setFacing((current) => (current === 'back' ? 'front' : 'back'));

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        ratio: '1:1', // 1:1 aspect ratio for the camera
      });

      // Crop the image to 300x300 px
      const croppedPhoto = await ImageManipulator.manipulateAsync(
        photoData.uri,
        [
          {
            crop: {
              originX: 0,
              originY: 0,
              width: Math.min(photoData.width, photoData.height),
              height: Math.min(photoData.width, photoData.height),
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
      );

      // Resize to 300x300
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        croppedPhoto.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
      );

      setPhoto(resizedPhoto.uri); // Set the resized photo URI
    }
  };

  const retakePicture = () => setPhoto(null);

  const savePicture = () => {
    if (photo) onCapture(photo); // Send photo to parent
  };

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        {photo ? (
          <CameraPreview
            photo={photo}
            onRetake={retakePicture}
            onSave={savePicture}
            onCancel={onCancel}
          />
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera} // Apply the camera style for size 300x300px
              facing={facing}
            >
              <CameraControls
                onToggleFacing={toggleCameraFacing}
                onCapture={takePicture}
                onCancel={onCancel}
              />
            </CameraView>
          </View>
        )}
      </View>
    </Modal>
  );
};

// Styles to ensure the camera is 300px by 300px
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 384,
    height: 384, // Set the camera container to 300x300px
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    aspectRatio: 1, // Ensure the camera has a 1:1 aspect ratio
  },
});

export default CameraComponent;
