import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import TopMethod from '../../components/topMethod/TopMethod';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MethodDetail({ route }) {
    const navigation = useNavigation()
    const { id } = route.params
    const [method, setMethod] = useState(null)
    async function getMethodDetail(id) {
        try {
            // const data = await getMethod(id);
            // setMethod(data?.data)
            setMethod({
                id: 1,
                image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
                title: "New VR Headsets That Will Shape the Metaverse",
                author: {
                    fullName: "Mason Eduard",
                    avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
                },
                type: "Skincare",
                date: "2024-01-03T14:48:00.000Z",
                contents: [
                    {
                        content: "Cách làm đẹp da mặt bằng mật ong",
                        details:
                            [
                                "Bước 1: Rửa sạch mặt bằng nước ấm, sau đó vỗ nhẹ tay và dùng khăn sạch để lau khô lại.",
                                "Bước 2: Thoa một lớp mỏng mật ong lên da, chờ khoảng 15-20 phút sau đó rửa sạch lại với nước lạnh.",
                            ]
                    },
                    {
                        content: "Cách làm đẹp da mặt bằng sữa chua",
                        details:
                            [
                                "Bước 1: Rửa sạch mặt bằng nước ấm, lau mặt cho khô ráo.",
                                "Bước 2: Thoa đều sữa chua không đường lên da mặt, chờ khoảng 15-20 phút thì rửa sạch lại bằng nước lạnh.",
                                "Mỗi tuần bạn nên thực hiện phương pháp này khoảng 2-3 lần, đảm bảo chỉ sau 1 tháng da bạn sẽ được mịn màng và tươi sáng hơn. Ngoài ra bạn cũng có thể kết hợp sữa chua với những nguyên liệu khác như: Chanh, nghệ, trứng gà,... cách nào cũng hiệu quả.",
                            ]
                    },
                ],
                description: "<h4><strong><span style=\"font-size:11pt;\">1. Chăm sóc da thường</span></strong></h4>\r\n<p><span style=\"font-size:11pt;\">Da thường là loại da lý tưởng mà nhiều người mong muốn có được. Đây là loại da không nhờn, không khô, ít mụn và thường có độ ẩm cân bằng. Tuy nhiên, để duy trì làn da khỏe đẹp này, bạn vẫn cần có một quy trình chăm sóc da đúng cách.</span></p>\r\n<p><strong><span style=\"font-size:11pt;\">Phương pháp chăm sóc:</span></strong></p>\r\n<ol>\r\n    <li style=\"list-style-type:decimal;font-size:11pt;\">\r\n        <p><strong><span style=\"font-size:11pt;\">Làm sạch da:</span></strong></p>\r\n        <ul>\r\n            <li style=\"list-style-type:circle;font-size:11pt;\">\r\n                <p><strong><span style=\"font-size:11pt;\">Tẩy trang:</span></strong><span style=\"font-size:11pt;\">Sử dụng sản phẩm tẩy trang không chứa cồn để loại bỏ mỹ phẩm và bụi bẩn.</span></p>\r\n            </li>\r\n            <li style=\"list-style-type:circle;font-size:11pt;\">\r\n                <p><strong><span style=\"font-size:11pt;\">Rửa mặt:</span></strong><span style=\"font-size:11pt;\">Rửa mặt buổi sáng và tối bằng sữa rửa mặt có độ pH từ 4.5-5.5 để duy trì độ cân bằng tự nhiên của da.</span></p>\r\n            </li>\r\n            <li style=\"list-style-type:circle;font-size:11pt;\">\r\n                <p><strong><span style=\"font-size:11pt;\">Tẩy tế bào chết:</span></strong><span style=\"font-size:11pt;\">Tẩy tế bào chết 2 lần/tuần để loại bỏ da chết, giúp da mịn màng hơn.</span></p>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n    <li style=\"list-style-type:decimal;font-size:11pt;\">\r\n        <p><strong><span style=\"font-size:11pt;\">Toner:</span></strong></p>\r\n        <ul>\r\n            <li style=\"list-style-type:circle;font-size:11pt;\">\r\n                <p><span style=\"font-size:11pt;\">Sử dụng toner không chứa cồn để cân bằng độ pH và cấp ẩm cho da sau khi rửa mặt.</span></p>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n    <li style=\"list-style-type:decimal;font-size:11pt;\">\r\n        <p><strong><span style=\"font-size:11pt;\">Dưỡng ẩm:</span></strong></p>\r\n        <ul>\r\n            <li style=\"list-style-type:circle;font-size:11pt;\">\r\n                <p><span style=\"font-size:11pt;\">Sử dụng kem dưỡng ẩm ban ngày và ban đêm để duy trì độ ẩm cho da.</span></p>\r\n            </li>\r\n            <li style=\"list-style-type:circle;font-size:11pt;\">\r\n                <p><span style=\"font-size:11pt;\">Đắp mặt nạ 2 lần/tuần, ưu tiên các nguyên liệu tự nhiên như yến mạch, bơ để cung cấp thêm dưỡng chất cho da.</span></p>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n    <li style=\"list-style-type:decimal;font-size:11pt;\">\r\n        <p><strong><span style=\"font-size:11pt;\">Chống nắng:</span></strong></p>\r\n        <ul>\r\n            <li style=\"list-style-type:circle;font-size:11pt;\">\r\n                <p><span style=\"font-size:11pt;\">Thoa kem chống nắng hàng ngày để bảo vệ da khỏi tác hại của tia UV.</span></p>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n</ol>\r\n<div id=\"gtx-trans\" style=\"position: absolute; left: -58px; top: 43.5312px;\">\r\n    <div class=\"gtx-trans-icon\"><br></div>\r\n</div>\r\n",
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMethodDetail(id)
    }, [id])
    return (
        <ScrollView style={styles.container}>
            <InsideHeader title={'Phương pháp làm đẹp'} />
            {method &&
                <>
                    <View style={styles.topContainer}>
                        <Image source={{ uri: method.image }} style={styles.image} />
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>{method.type}</Text>
                        </View>
                        <Text style={styles.title}>{method.title}</Text>
                        <View style={styles.authorContainer}>
                            <View style={styles.author}>
                                <Avatar rounded size={24} source={{ uri: method.author.avatar }} />
                                <Text style={styles.authorText}>Tác giả: <Text style={{ fontWeight: '600', color: 'black' }}>{method.author.fullName}</Text> </Text>
                            </View>
                            {method.date && <Text style={styles.viewText}>{format(new Date(method.date), 'd, MMM yyyy', { locale: vi })}</Text>}
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        {method.contents.map((content, index) =>
                            <View key={index}>
                                <TitleText title={content.content} style={styles.content} />
                                {content.details.map((detail, index) => <NormalText key={index} text={detail} style={styles.detail} />)}
                            </View>
                        )}
                    </View>
                </>
            }
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
    content: {
        fontSize: 18,
        marginLeft: 0,
        marginTop: 10,
        marginBottom: 10,
    },
    detail: {
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '70%',
        borderRadius: 16,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorText: {
        textAlign: "left",
        fontSize: 14,
        fontWeight: '300',
        color: "#6E6E6E",
        marginLeft: 5,
    },
    viewText: {
        textAlign: "left",
        fontSize: 12,
        fontWeight: '300',
        color: "#6E6E6E",
        marginLeft: 5,
    },
    viewContainer: {
        flexDirection: 'row'
    },
    title: {
        width: "100%",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 10,
        color: "black",
        marginBottom: 5,
    },
    tagContainer: {
        width: 60,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#FDF0F0",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 40,
        top: 20,
    },
    tagText: {
        fontSize: 12,
        color: "#F27272",
    },
    topContainer: {
        width: screenWidth,
        height: screenWidth / 2 + 100,
        paddingLeft: 20,
        paddingRight: 20,
    },
})