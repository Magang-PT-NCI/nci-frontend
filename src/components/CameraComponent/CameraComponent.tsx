import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { View, Modal } from 'react-native';
import CameraControls from './CameraControls';
import CameraPreview from './CameraPreview';

type CameraComponentProps = {
  onCapture: (photo: string) => void;
  onCancel: () => void;
};

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture, onCancel }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <CameraControls requestPermission={requestPermission} />
    );
  }

  const toggleCameraFacing = () => setFacing((current) => (current === 'back' ? 'front' : 'back'));

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        ratio: '1:1', 
      });
      setPhoto(photoData.uri);
    }
  };

  const retakePicture = () => setPhoto(null);
  const savePicture = () => {
    if (photo) onCapture(photo); // Send photo to parent
  };

  return (
    <Modal visible={true} animationType="slide">
      <View className="flex-1">
        {photo ? (
          <CameraPreview 
            photo={photo} 
            onRetake={retakePicture} 
            onSave={savePicture} 
            onCancel={onCancel} 
          />
        ) : (
          <CameraView ref={cameraRef} className="flex-1" facing={facing} ratio="1:1">
            <CameraControls
              onToggleFacing={toggleCameraFacing}
              onCapture={takePicture}
              onCancel={onCancel}
            />
          </CameraView>
        )}
      </View>
    </Modal>
  );
};

export default CameraComponent;
