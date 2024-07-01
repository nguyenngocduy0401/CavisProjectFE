import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import InsideHeader from '../../components/insideHeader/InsideHeader';
// import GenericButton from '../../components/button/GenericButton';
// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
// import Toast from 'react-native-toast-message';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

export default function CameraOpen() {
    // const navigation = useNavigation()
    // const camera = useRef(null)
    // const devices = useCameraDevice()
    // const device = devices.back
    // const { showCamera, setShowCamera } = useState(false)
    // const [imageSource, setImageSource] = useState('')

    // useEffect(() => {
    //     async function getPermission() {
    //         const newCameraPermission = await Camera.requestCameraPermission()
    //         console.log(newCameraPermission)
    //     }
    //     getPermission()
    // }, [])

    // const capturePhoto = async () => {
    //     if (camera.current !== null) {
    //         const photo = await camera.current.takePhoto({});
    //         setImageSource(photo.path);
    //         setShowCamera(false);
    //         console.log(photo.path);
    //     }
    // }

    // if (device == null) {
    //     Toast.show({
    //         type: 'error',
    //         text1: 'Camera không khả dụng',
    //     });
    // }

    // return (
    //     <View style={styles.container}>
    //         <InsideHeader title={'Camera'} />
    //         {showCamera ? <>
    //             <Camera
    //                 ref={camera}
    //                 style={styles.camera}
    //                 device={device}
    //                 isActive={showCamera}
    //                 photo={true}
    //             />
    //             <GenericButton title={'Capture'} onPress={() => capturePhoto()} />
    //         </> : imageSource &&
    //         <Image style={styles.image}
    //             source={{ uri: `file://${imageSource}` }}
    //         />
    //         }
    //         <GenericButton title={'Back'} onPress={() => setShowCamera(true)} />
    //         <GenericButton title={'Use photo'} onPress={() => setShowCamera(true)} />
    //     </View>
    // )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})