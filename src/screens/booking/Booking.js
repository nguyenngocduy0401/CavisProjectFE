import { View, Text, Image, StyleSheet, Button, Dimensions, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import headerLogo from '../../../assets/images/cavis-vertical-logo.png';
import { Icon, LinearProgress } from '@rneui/themed';
import DatePicker from 'react-native-date-picker'
import GenericButton from '../../components/button/GenericButton';
import GenericWhiteButton from '../../components/button/GenericWhiteButton';
import QuestionAnswerCheck from '../../components/questionAnswerCheck/QuestionAnswerCheck';
import { useNavigation } from '@react-navigation/native';
import TitleText from '../../components/text/TitleText';
import NormalText from '../../components/text/NormalText';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import usePremium from '../../hooks/usePremium';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function Booking() {
    const navigation = useNavigation();
    const isPremiumValid = usePremium()
    if (!isPremiumValid) {
        navigation.goBack();
        Toast.show({
            type: 'error',
            text1: 'Chức năng này yêu cầu tài khoản premium',
        });
    }
    const [step, setStep] = useState(1);
    const [date, setDate] = useState(new Date())
    const [type, setType] = useState(null)
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [timeRangeSkincare, setTimeRangeSkincare] = useState(null)
    const [skincareSchedules, setSkincareSchedules] = useState([]);
    const [experts, setExperts] = useState([]);
    const [expert, setExpert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    async function getTimeRange() {
        try {
            const data = [
                {
                    id: 1,
                    timeRange: "8:00 - 9:00",
                },
                {
                    id: 2,
                    timeRange: "9:00 - 10:00",
                },
                {
                    id: 3,
                    timeRange: "10:00 - 11:00",
                },
                {
                    id: 4,
                    timeRange: "13:00 - 14:00",
                },
                {
                    id: 5,
                    timeRange: "15:00 - 16:00",
                },
                {
                    id: 6,
                    timeRange: "16:00 - 17:00",
                },
            ]
            setSkincareSchedules(data)
        } catch (error) {
            console.log(error)
        }
    }
    async function getExperts() {
        try {
            setRefreshing(true);
            const data = [
                {
                    id: 1,
                    fullName: "Nguyễn Văn A"
                },
                {
                    id: 2,
                    fullName: "Nguyễn Văn B"
                },
                {
                    id: 3,
                    fullName: "Nguyễn Văn C"
                },
                {
                    id: 4,
                    fullName: "Nguyễn Văn D"
                },
            ]
            setExperts(data)
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false)
        }
    }
    useEffect(() => {
        getTimeRange()
    }, [])
    useEffect(() => {
        if (type && date && (timeRangeSkincare || startTime && endTime)) {
            getExperts()
        }
    }, [type, date, timeRangeSkincare, startTime, endTime])
    const onRefresh = useCallback(() => {
        if (type && date && (timeRangeSkincare || startTime && endTime)) {
            getExperts()
        }
    }, [type, date, timeRangeSkincare, startTime, endTime])
    const handleSubmit = async () => {
        try {
            setLoading(true);
            console.log({ type, timeRangeSkincare, startTime, endTime, expert })
            navigation.goBack()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <ScrollView style={styles.container}>
            <InsideHeader title={'Đặt lịch với chuyên gia'} />
            <View style={styles.center}>
                <Image source={headerLogo} style={styles.topLogo} />
                <LinearProgress
                    style={styles.progress}
                    value={step === 1 ? Math.min(1 / 3, 1) : step === 2 ? Math.min(2 / 3, 1) : 1}
                    variant="determinate"
                    trackColor="#FBBD98"
                    color="#F27272"
                />
            </View>
            {step === 1 &&
                <View style={styles.center}>
                    <TitleText title="Bạn muốn đặt lịch với chuyên gia lĩnh vực nào?" />
                    <View style={styles.answers}>
                        <QuestionAnswerCheck active={type === "skincare"} onPress={() => setType("skincare")} label={'Skincare'} />
                        <QuestionAnswerCheck active={type === "makeup"} onPress={() => setType("makeup")} label={'Makeup'} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <GenericButton
                            title={'Tiếp theo'}
                            onPress={() => setStep(2)}
                            buttonStyle={[styles.buttonStyleButton, { width: screenWidth - 40 }]}
                            disabled={!type}
                        />
                    </View>
                </View>
            }
            {step === 2 &&
                <View style={[styles.center, {height: screenHeight}]}>
                    <TitleText title="Hãy chọn ngày hẹn:" />
                    <DatePicker locale='vi' minimumDate={new Date()} style={styles.datePicker} date={date} onDateChange={setDate} mode='date' />
                    <TitleText title="Hãy chọn thời gian hẹn:" />
                    {type === 'skincare' ?
                        <Dropdown
                            style={styles.dropdown}
                            data={skincareSchedules}
                            maxHeight={150}
                            labelField="timeRange"
                            valueField="id"
                            placeholderStyle={styles.dropdownPlaceholder}
                            placeholder={'Khung giờ'}
                            value={timeRangeSkincare}
                            onChange={item => {
                                setTimeRangeSkincare(item.id);
                            }}
                        />:
                        <View style={styles.flexRow}>
                            <View style={styles.center}>
                                <Text style={styles.labelStyle}>Bắt đầu</Text>
                                <DatePicker locale='vi' minimumDate={new Date()} style={styles.timePicker} date={startTime} onDateChange={setStartTime} mode='time' />
                            </View>
                            <Icon
                                name='chevron-right'
                                type='entypo'
                                color='black'
                                containerStyle={styles.icon}
                                iconProps={{ size: 20 }}
                            />
                            <View style={styles.center}>
                                <Text style={styles.labelStyle}>Kết thúc</Text>
                                <DatePicker locale='vi' minimumDate={startTime} style={styles.timePicker} date={endTime} onDateChange={setEndTime} mode='time' />
                            </View>
                        </View>
                    }
                    <View style={styles.buttonContainer}>
                        <GenericWhiteButton
                            title={'Quay lại'}
                            onPress={() => setStep(1)}
                            buttonStyle={[styles.whiteButtonStyleButton, { width: screenWidth / 2 - 40 }]}
                        />
                        <GenericButton
                            title={'Tiếp theo'}
                            onPress={() => setStep(3)}
                            buttonStyle={[styles.buttonStyleButton, { width: screenWidth / 2 - 40 }]}
                            disabled={!(type === "skincare" && date && timeRangeSkincare) && !(type === "makeup" && date && startTime && endTime)}
                        />
                    </View>
                </View>
            }
            {step === 3 &&
                <View style={styles.center}>
                    <TitleText title="Danh sách các chuyên gia phù hợp:" />
                    <FlatList
                        style={styles.answers}
                        data={experts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={{ marginBottom: 10 }}>
                                <QuestionAnswerCheck disabled={loading} active={item.id === expert} onPress={() => setExpert(item.id)} label={item.fullName} />
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        ListEmptyComponent={
                            <TitleText
                                style={{
                                    textAlign: 'center',
                                    marginLeft: 0,
                                    fontSize: 18
                                }}
                                title={'Không tìm thấy chuyên gia phù hợp'}
                            />
                        }
                    />
                    <View style={styles.buttonContainer}>
                        <GenericWhiteButton
                            title={'Quay lại'}
                            disabled={loading}
                            onPress={() => setStep(2)}
                            buttonStyle={[styles.whiteButtonStyleButton, { width: screenWidth / 2 - 40 }]}
                        />
                        <GenericButton
                            title={'Tiếp theo'}
                            onPress={handleSubmit}
                            buttonStyle={[styles.buttonStyleButton, { width: screenWidth / 2 - 40 }]}
                            disabled={!expert}
                            loading={loading}
                        />
                    </View>
                </View>
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topLogo: {
        width: 127,
        height: 80,
        marginTop: 20,
    },
    progress: {
        width: "60%",
        marginTop: 40,
        borderRadius: 5,
    },
    datePicker: {
        width: screenWidth,
    },
    timePicker: {
        width: screenWidth / 2
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    answers: {
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        gap: 10,
    },
    labelStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    center: {
        alignItems: "center",
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 10,
    },
    dropdown: {
        height: 50,
        width: screenWidth - 40,
        borderColor: "#FBBD98",
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 15,
    },
    dropdownPlaceholder: {
        fontSize: 16,
        color: "#DB6464",
    },
});

