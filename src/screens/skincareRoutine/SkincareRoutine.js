import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import GenericButton from '../../components/button/GenericButton';
import GenericWhiteButton from '../../components/button/GenericWhiteButton';
import Toast from 'react-native-toast-message';
import { getSkincareRoutine } from '../../services/UserService';
import { setSkincareRoutine } from '../../services/SkincareRoutineService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const morningRoutine = [
    {
        id: 1,
        name: 'Tẩy trang',
        description: 'Loại bỏ bụi bẩn và dầu thừa tích tự qua đêm, giúp làm sạch lớp dưỡng da ban đêm để sẵn sàng cho các bước chăm sóc tiếp theo.',
        image: require('../../../assets/images/remove-makeup.jpg'),
    },
    {
        id: 2,
        name: 'Sữa rửa mặt',
        description: 'Làm sạch da sâu hơn, loại bỏ bụi bẩn, dầu thừa và các tạp chất còn sót lại sau bước tẩy trang.',
        image: require('../../../assets/images/cleanser.jpg'),
    },
    {
        id: 3,
        name: 'Toner cân bằng da',
        description: 'Cân bằng pH cho da, giúp da sẵn sàng hấp thụ dưỡng chất từ các bước chăm sóc tiếp theo. Đồng thời, toner còn giúp se khít lỗ chân lông.',
        image: require('../../../assets/images/toner.jpg'),
    },
    {
        id: 4,
        name: 'Serum hoặc tinh chất dưỡng da',
        description: 'Cung cấp dưỡng chất chuyên sâu cho da, giúp cải thiện các vấn đề cụ thể như làm sáng da, cấp ẩm, chống lão hóa.',
        image: require('../../../assets/images/ampoule.jpg'),
    },
    {
        id: 5,
        name: 'Kem dưỡng ẩm',
        description: 'Giữ ẩm cho da, tạo lớp bảo vệ và ngăn ngừa mất nước, giúp da mềm mại và mịn màng suốt cả ngày.',
        image: require('../../../assets/images/moisturize.jpg'),
    },
    {
        id: 6,
        name: 'Kem chống nắng',
        description: 'Bảo vệ da khỏi tác hại của tia UV, ngăn ngừa lão hóa da và giảm nguy cơ ung thư da. Đây là bước quan trọng nhất để bảo vệ làn da khỏi tác động của môi trường.',
        image: require('../../../assets/images/sunscreen.jpg'),
    }
];

const nightRoutine = [
    {
        id: 1,
        name: 'Tẩy trang',
        description: 'Loại bỏ lớp trang điểm, kem chống nắng và các tạp chất trên da, giúp da sạch sẽ và sẵn sàng cho các bước chăm sóc tiếp theo.',
        image: require('../../../assets/images/remove-makeup.jpg'),
    },
    {
        id: 2,
        name: 'Sữa rửa mặt',
        description: 'Làm sạch da sâu hơn, loại bỏ bụi bẩn, dầu thừa và các tạp chất còn sót lại sau bước tẩy trang.',
        image: require('../../../assets/images/cleanser.jpg'),
    },
    {
        id: 3,
        name: 'Tẩy tế bào chết',
        description: 'Loại bỏ các tế bào da chết, giúp làm sạch lỗ chân lông và làm đều màu da. Nên thực hiện 2-3 lần mỗi tuần.',
        image: require('../../../assets/images/exfoliate.jpg'),
    },
    {
        id: 4,
        name: 'Toner/nước hoa hồng',
        description: 'Cân bằng pH cho da, giúp da sẵn sàng hấp thụ dưỡng chất từ các bước chăm sóc tiếp theo. Đồng thời, toner còn giúp se khít lỗ chân lông.',
        image: require('../../../assets/images/toner.jpg'),
    },
    {
        id: 5,
        name: 'Đắp mặt nạ',
        description: 'Cung cấp dưỡng chất chuyên sâu và làm dịu da. Có thể sử dụng mặt nạ dưỡng ẩm, mặt nạ làm sáng da hoặc mặt nạ chống lão hóa tùy theo nhu cầu của da.',
        image: require('../../../assets/images/mask.jpg'),
    },
    {
        id: 6,
        name: 'Serum hoặc tinh chất dưỡng da',
        description: 'Cung cấp dưỡng chất chuyên sâu cho da, giúp cải thiện các vấn đề cụ thể như làm sáng da, cấp ẩm, chống lão hóa.',
        image: require('../../../assets/images/ampoule.jpg'),
    },
    {
        id: 7,
        name: 'Kem dưỡng ẩm',
        description: 'Giữ ẩm cho da, tạo lớp bảo vệ và ngăn ngừa mất nước, giúp da mềm mại và mịn màng suốt cả đêm.',
        image: require('../../../assets/images/moisturize.jpg'),
    },
    {
        id: 8,
        name: 'Bôi kem mắt',
        description: 'Chăm sóc vùng da mỏng manh quanh mắt, giảm bọng mắt và quầng thâm, ngăn ngừa nếp nhăn.',
        image: require('../../../assets/images/eye-cream.jpg'),
    },
    {
        id: 9,
        name: 'Đắp mặt nạ ngủ',
        description: 'Cung cấp dưỡng chất và độ ẩm suốt đêm, giúp da phục hồi và tái tạo hiệu quả hơn khi bạn ngủ. Thường chỉ cần sử dụng 2-3 lần mỗi tuần.',
        image: require('../../../assets/images/mask.jpg'),
    }
];


export default function SkincareRoutine({ route }) {
    const navigation = useNavigation()
    const type = route.params?.type
    const [routine, setRoutine] = useState([]);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [skincareData, setSkincareData] = useState(null);
    async function getSkincare() {
        try {
            const data = await getSkincareRoutine();
            setSkincareData(data?.data);
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }
    useEffect(() => {
        getSkincare()
    }, [])
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (skincareData && type === 'Morning') {
            if (skincareData.morning) {
                navigation.goBack()
                Toast.show({
                    type: 'error',
                    text1: 'Bạn đã skincare buổi sáng rồi',
                });
            } else if (currentHour < 6 || currentHour > 10) {
                navigation.goBack()
                Toast.show({
                    type: 'error',
                    text1: 'Hãy skincare buổi sáng trong khung giờ 6h - 10h',
                });
            } else {
                setRoutine(morningRoutine)
            }
        } else if (skincareData && type === 'Night') {
            if (skincareData.night) {
                navigation.goBack()
                Toast.show({
                    type: 'error',
                    text1: 'Bạn đã skincare buổi tối rồi',
                });
            } else if (currentHour < 20 || currentHour > 23) {
                navigation.goBack()
                Toast.show({
                    type: 'error',
                    text1: 'Hãy skincare buổi tối trong khung giờ 20h - 23h',
                });
            } else {
                setRoutine(nightRoutine)
            }
        }
    }, [skincareData]);
    const handleCompleted = async () => {
        try {
            setLoading(true);
            const id = skincareData.id
            if (type === 'Morning') {
                await setSkincareRoutine(id, {
                    morning: true,
                    night: skincareData.night,
                })
            } else if (type === 'Night') {
                await setSkincareRoutine(id, {
                    morning: skincareData.morning,
                    night: true,
                })
            }
            navigation.goBack()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <ScrollView style={styles.container}>
            <InsideHeader title={'Quy trình skincare'} />
            {routine.length > 0 && routine.map(routineStep =>
                routineStep.id === step && (
                    <View style={styles.detailContainer} key={routineStep.id}>
                        <Image
                            source={routineStep.image}
                            style={styles.image}
                        />
                        <TitleText title={routineStep.name} style={styles.title} />
                        <NormalText text={routineStep.description} />
                        {step === 1 ?
                            <GenericButton
                                title={'Tiếp theo'}
                                onPress={() => setStep(step + 1)}
                                buttonStyle={[styles.buttonStyleButton]}
                                disabled={loading}
                            />
                            : step === routine.length ?
                                <View style={{ flexDirection: 'row' }}>
                                    <GenericWhiteButton
                                        title={'Quay lại'}
                                        onPress={() => setStep(step - 1)}
                                        buttonStyle={[styles.whiteButtonStyleButton, { width: screenWidth / 2 - 40 }]}
                                        disabled={loading}
                                    />
                                    <GenericButton
                                        title={'Hoàn thành'}
                                        onPress={handleCompleted}
                                        buttonStyle={[styles.buttonStyleButton, { width: screenWidth / 2 - 40 }]}
                                        disabled={loading}
                                    />
                                </View>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <GenericWhiteButton
                                        title={'Quay lại'}
                                        onPress={() => setStep(step - 1)}
                                        buttonStyle={[styles.whiteButtonStyleButton, { width: screenWidth / 2 - 40 }]}
                                        disabled={loading}
                                    />
                                    <GenericButton
                                        title={'Tiếp theo'}
                                        onPress={() => setStep(step + 1)}
                                        buttonStyle={[styles.buttonStyleButton, { width: screenWidth / 2 - 40 }]}
                                        disabled={loading}
                                    />
                                </View>
                        }
                    </View>
                )
            )}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    detailContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    image: {
        width: screenWidth - 40,
        height: screenWidth * 1.1,
        resizeMode: 'contain',
    },
    title: {
        marginLeft: 0,
        marginTop: 5,
        marginBottom: 10,
    },
    buttonStyleButton: {
        height: 50,
        borderWidth: 0,
        borderRadius: 30,
        marginTop: 20,
    },
    whiteButtonStyleButton: {
        height: 50,
        borderRadius: 30,
        marginTop: 20,
    },
})