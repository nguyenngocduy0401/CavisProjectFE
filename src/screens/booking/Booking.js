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
import { compareAsc, format, isAfter, parse, parseISO } from 'date-fns';
import { getCalendars } from '../../services/CalendarService';
import { setMakeupAppointment, setSkincareAppointment } from '../../services/UserService';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import { getAppointmentExperts } from '../../services/AppointmentService';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function Booking() {
    const user = useSelector(userSelector)
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
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minimumTime = new Date();
    minimumTime.setHours(8, 0, 0, 0);
    const maximumTime = new Date();
    maximumTime.setHours(20, 0, 0, 0);
    const [date, setDate] = useState(tomorrow)
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
            const data = await getCalendars(date);
            if (data.isSuccess) {
                const schedules = data.data.items.sort((a, b) => {
                    const timeA = parse(a.startTime, 'HH:mm', new Date())
                    const timeB = parse(b.startTime, 'HH:mm', new Date())
                    return compareAsc(timeA, timeB);
                }).map((schedule) => ({
                    ...schedule,
                    timeRange: `${schedule.startTime} - ${schedule.endTime}`
                }))
                setSkincareSchedules(schedules)
            } else {
                setSkincareSchedules([])
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function getExperts() {
        try {
            setRefreshing(true);
            let StartTime = null;
            let EndTime = null;
            let Role = null;
            if (type === 'skincare') {
                const timeRange = skincareSchedules.find(schedule => schedule.id === timeRangeSkincare)
                StartTime = timeRange.startTime;
                EndTime = timeRange.endTime;
                Role = "ExpertSkinCare";
            } else if (type === 'makeup') {
                StartTime = format(startTime, "HH:mm")
                EndTime = format(endTime, "HH:mm")
                Role = "ExpertMakeup";
            }
            const data = await getAppointmentExperts(date, StartTime, EndTime, Role)
            setExperts(data?.data?.items)
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false)
        }
    }
    useEffect(() => {
        getTimeRange()
    }, [date])
    useEffect(() => {
        if (step === 3 && type && date && (timeRangeSkincare || startTime && endTime)) {
            getExperts()
        } else {
            setExperts([])
        }
    }, [step, type, date, timeRangeSkincare, startTime, endTime])
    const onRefresh = useCallback(() => {
        if (step === 3 && type && date && (timeRangeSkincare || startTime && endTime)) {
            getExperts()
        } else {
            setExperts([])
        }
    }, [step, type, date, timeRangeSkincare, startTime, endTime])
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const mainData = { date: format(date, "yyyy-MM-dd"), expertId: expert, phoneNumber: user.phoneNumber, email: user.email }
            let data = null
            if (type === 'skincare') {
                data = await setSkincareAppointment({ ...mainData, calendarId: timeRangeSkincare });
            } else if (type === 'makeup') {
                data = await setMakeupAppointment({ ...mainData, startTime: format(startTime, "HH:mm"), endTime: format(endTime, "HH:mm") })
            }
            if (data?.isSuccess) {
                Toast.show({
                    type: 'success',
                    text1: 'Đặt lịch hẹn thành công',
                });
                navigation.goBack()
            } else {
                Toast.show({
                    type: 'error',
                    text1: data?.message,
                });
            }
        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Có lỗi xảy ra, xin vui lòng thử lại sau',
            });
        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
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
                <ScrollView>
                    <View style={styles.center}>
                        <TitleText title="Hãy chọn ngày hẹn:" />
                        <DatePicker locale='vi' minimumDate={tomorrow} style={styles.datePicker} date={date} onDateChange={setDate} mode='date' />
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
                            /> :
                            <View style={styles.flexRow}>
                                <View style={styles.center}>
                                    <Text style={styles.labelStyle}>Bắt đầu</Text>
                                    <DatePicker locale='vi' minimumDate={minimumTime} maximumDate={maximumTime} style={styles.timePicker} date={startTime} onDateChange={setStartTime} mode='time' />
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
                                    <DatePicker locale='vi' minimumDate={minimumTime && startTime} maximumDate={maximumTime} style={styles.timePicker} date={endTime} onDateChange={setEndTime} mode='time' />
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
                                disabled={!(type === "skincare" && date && timeRangeSkincare) && !(type === "makeup" && date && startTime && endTime && isAfter(endTime, startTime))}
                            />
                        </View>
                    </View>
                </ScrollView>
            }
            {step === 3 &&
                <View style={styles.center}>
                    <TitleText title="Danh sách các chuyên gia phù hợp:" />
                    <FlatList
                        style={styles.answers}
                        data={experts}
                        keyExtractor={(item) => item.expertId}
                        renderItem={({ item }) => (
                            <View style={{ marginBottom: 10 }}>
                                <QuestionAnswerCheck disabled={loading} active={item.expertId === expert} onPress={() => setExpert(item.expertId)} label={item.expertName} />
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
        </View>
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

