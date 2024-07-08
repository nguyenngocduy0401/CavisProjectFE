import { View, Text, Image, StyleSheet, Button, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import headerLogo from '../../../assets/images/cavis-vertical-logo.png';
import { LinearProgress } from '@rneui/themed';
import DatePicker from 'react-native-date-picker'
import GenderCheck from '../../components/genderCheck/GenderCheck';
import maleIcon from '../../../assets/icons/male-icon.png';
import maleIconActive from '../../../assets/icons/male-icon-active.png';
import femaleIcon from '../../../assets/icons/female-icon.png';
import femaleIconActive from '../../../assets/icons/female-icon-active.png';
import otherGenderIcon from '../../../assets/icons/other-gender-icon.png';
import otherGenderIconActive from '../../../assets/icons/other-gender-icon-active.png';
import GenericButton from '../../components/button/GenericButton';
import GenericWhiteButton from '../../components/button/GenericWhiteButton';
import QuestionAnswerCheck from '../../components/questionAnswerCheck/QuestionAnswerCheck';
import { useNavigation } from '@react-navigation/native';
import TitleText from '../../components/text/TitleText';
import NormalText from '../../components/text/NormalText';
import { getSkinCondition } from '../../services/SkinConditionService';
import { getSkinTypes } from '../../services/SkinTypeService';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import { updateUser } from '../../services/UserService';
import { addSkinAnalyst } from '../../services/PersonalAnalystService';
import InsideHeader from '../../components/insideHeader/InsideHeader';

const screenWidth = Dimensions.get('window').width

export default function Questions({ route }) {
    const navigation = useNavigation();
    const user = useSelector(userSelector)
    const type = route.params?.type
    if (user.checkExistPersonal && !type) {
        navigation.replace('Root')
    }
    const [step, setStep] = useState(user.checkExistPersonal ? 2 : 1);
    const [gender, setGender] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 12)))

    const [skins, setSkins] = useState([]);
    const [skin, setSkin] = useState(null);

    const [concerns, setConcerns] = useState([]);
    const [concernList, setConcernList] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getAllSkins() {
        try {
            const data = await getSkinTypes();
            if (data) {
                setSkins(data?.data?.items)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function getAllConcerns() {
        try {
            const data = await getSkinCondition();
            setConcerns(data?.data?.items)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllSkins()
        getAllConcerns()
    }, [])
    const toggleConcern = (id) => {
        setConcernList(prevList => {
            if (prevList.includes(id)) {
                return prevList.filter(concernId => concernId !== id);
            } else {
                return [...prevList, id];
            }
        });
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!user.checkExistPersonal) {
                await updateUser({ dateOfBirth, gender })
            }
            const list = [...concernList, skin]
            await addSkinAnalyst(list)
                .then(() => navigation.navigate('Root'))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            {type && <InsideHeader title={'Kiểm tra loại da'} />}
            <Image source={headerLogo} style={styles.topLogo} />
            <LinearProgress
                style={styles.progress}
                value={!type ? (step === 1 ? Math.min(1 / 3, 1) : step === 2 ? Math.min(2 / 3, 1) : 1) : (step === 2 ? 0.5 : 1)}
                variant="determinate"
                trackColor="#FBBD98"
                color="#F27272"
            />
            {step === 1 &&
                <>
                    <TitleText title="Giới tính của bạn gì?" />
                    <View style={styles.genderAnswers}>
                        <GenderCheck active={gender === 'male'} onPress={() => setGender('male')} label={'Nam'} icon={gender === 'male' ? maleIconActive : maleIcon} />
                        <GenderCheck active={gender === 'female'} onPress={() => setGender('female')} label={'Nữ'} icon={gender === 'female' ? femaleIconActive : femaleIcon} />
                        <GenderCheck active={gender === 'other'} onPress={() => setGender('other')} label={'Khác'} icon={gender === 'other' ? otherGenderIconActive : otherGenderIcon} />
                    </View>
                    <TitleText title="Bạn sinh ngày nào?" />
                    <DatePicker locale='vi' maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 12))} style={styles.datePicker} date={dateOfBirth} onDateChange={setDateOfBirth} mode='date' />
                    <View style={styles.buttonContainer}>
                        <GenericButton
                            title={'Tiếp theo'}
                            onPress={() => setStep(2)}
                            buttonStyle={[styles.buttonStyleButton, { width: screenWidth - 40 }]}
                            disabled={!(gender && dateOfBirth)}
                        />
                    </View>
                </>
            }
            {step === 2 &&
                <>
                    <TitleText title="Loại da của bạn là gì?" />
                    <View style={styles.skinAnswers}>
                        {skins.length > 0 && skins.map((skinData) => (
                            <View key={skinData.id}>
                                <QuestionAnswerCheck active={skin === skinData.id} onPress={() => setSkin(skinData.id)} label={skinData.skinsName} />
                                {skin === skinData.id && <View style={{ flexDirection: "row" }}>
                                    <View style={{ borderRadius: 20, backgroundColor: "#F6D6C0", width: 4, height: "100%", marginRight: 8 }}></View>
                                    <NormalText text={skinData.description} />
                                </View>}
                            </View>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        {!type ?
                            <>
                                <GenericWhiteButton
                                    title={'Quay lại'}
                                    onPress={() => setStep(1)}
                                    buttonStyle={[styles.whiteButtonStyleButton, { width: screenWidth / 2 - 40 }]}
                                />
                                <GenericButton
                                    title={'Tiếp theo'}
                                    onPress={() => setStep(3)}
                                    buttonStyle={[styles.buttonStyleButton, { width: screenWidth / 2 - 40 }]}
                                    disabled={!skin}
                                />
                            </>
                            :
                            <GenericButton
                                title={'Tiếp theo'}
                                onPress={() => setStep(3)}
                                buttonStyle={[styles.buttonStyleButton, { width: screenWidth - 40 }]}
                                disabled={!skin}
                            />
                        }
                    </View>
                </>
            }
            {step === 3 &&
                <>
                    <TitleText title="Vấn đề da bạn gặp phải là gì?" />
                    <View style={styles.concernAnswers}>
                        {concerns.length > 0 && concerns.map((concern) => (
                            <QuestionAnswerCheck
                                key={concern.id}
                                active={concernList.includes(concern.id)}
                                onPress={() => toggleConcern(concern.id)}
                                label={concern.skinsName}
                            />
                        ))}
                    </View>
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
                            disabled={(!(concernList.length > 0)) || loading}
                        />
                    </View>
                </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
    },
    topLogo: {
        width: 127,
        height: 80,
        marginTop: 50,
    },
    progress: {
        width: "60%",
        marginTop: 40,
        borderRadius: 5,
    },
    genderAnswers: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    datePicker: {
        width: 700,
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
        position: "absolute",
        bottom: 20
    },
    skinAnswers: {
        width: "100%",
        justifyContent: "center",
        gap: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    concernAnswers: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
});

