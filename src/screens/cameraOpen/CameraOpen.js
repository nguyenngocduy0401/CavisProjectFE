import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import GenericButton from '../../components/button/GenericButton';
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';
import TitleText from '../../components/text/TitleText';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function CameraOpen() {
    const navigation = useNavigation()
    const user = useSelector(userSelector)
    const camera = useRef(null)
    const device = useCameraDevice('front')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [showCamera, setShowCamera] = useState(true)
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const format = useCameraFormat(device, [
        { photoResolution: { width: screenWidth, height: screenHeight } }
    ])

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, []);

    const capturePhoto = async () => {
        if (camera.current) {
            try {
                setLoading(true);
                const photo = await camera.current.takePhoto({});
                setImage(photo.path);
                setShowCamera(false);
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi chụp hình, xin vui lòng thử lại',
                });
            } finally {
                setLoading(false)
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Có lỗi xảy ra, xin vui lòng thử lại',
            });
        }
    }

    const savePhoto = async () => {
        if (image) {
            try {
                setLoading(true);
                const filename = image.substring(image.lastIndexOf('/') + 1);
                const fireRef = `skincheck/${user.id}/${filename}`
                const reference = storage().ref(fireRef);
                await reference.putFile(image)
                const url = await storage().ref(fireRef).getDownloadURL();
                console.log(url)
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi lưu hình, xin vui lòng thử lại',
                });
            } finally {
                setLoading(false);
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Vui lòng chụp ảnh',
            });
        }
    }

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <TitleText title={'Tính năng này yêu cầu quyền truy cập vào máy ảnh'} />
                <GenericButton title="Cấp quyền" onPress={() => requestPermission()} />
            </View>
        );
    }

    if (device == null) {
        return (
            <View style={styles.container}>
                <TitleText title={'Đang mở camera...'} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {showCamera ?
                <>
                    <Camera
                        ref={camera}
                        style={styles.camera}
                        device={device}
                        isActive={showCamera}
                        photo={true}
                        format={format}
                    />
                    <TouchableOpacity disabled={loading} style={styles.captureButton} onPress={capturePhoto}></TouchableOpacity>
                </> : image &&
                <>
                    <Image style={styles.image}
                        source={{ uri: `file://${image}` }}
                    />
                    <View style={styles.operationContainer}>
                        <TouchableOpacity disabled={loading} style={styles.operationButton} onPress={() => setShowCamera(true)}>
                            <Text style={styles.operationText}>Chụp lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={loading} style={styles.operationButton} onPress={savePhoto}>
                            <Text style={styles.operationText}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            <InsideHeader title={'Camera'} style={{ position: 'absolute', top: 0 }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    camera: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    captureButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: 'white',
        position: 'absolute',
        bottom: 30,
        left: screenWidth / 2 - 30,
    },
    operationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    operationButton: {
        padding: 10,
    },
    operationText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
})