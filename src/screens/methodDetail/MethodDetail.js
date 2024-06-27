import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import WebView from 'react-native-webview';
import { getMethod } from '../../services/MethodService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MethodDetail({ route }) {
    const navigation = useNavigation()
    const { id } = route.params
    const [method, setMethod] = useState(null)

    const [height, setHeight] = useState(0);
    const webViewScript = `
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
  `;
    async function getMethodDetail(id) {
        try {
            // const data = await getMethod(id);
            // setMethod(data?.data)
            setMethod({
                id: 1,
                urlImage: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
                methodName: "New VR Headsets That Will Shape the Metaverse",
                fullName: "Mason Eduard",
                userAvatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg",
                category: "Skincare",
                creationDate: "2024-01-03T14:48:00.000Z",
                description: '<h4><strong><span style="font-size:18pt;">1. Chăm sóc da thường</span></strong></h4><p><span style="font-size:11pt;">Da thường là loại da lý tưởng mà nhiều người mong muốn có được. Đây là loại da không nhờn, không khô, ít mụn và thường có độ ẩm cân bằng. Tuy nhiên, để duy trì làn da khỏe đẹp này, bạn vẫn cần có một quy trình chăm sóc da đúng cách.</span></p><p><strong><span style="font-size:18pt;">Phương pháp chăm sóc:</span></strong></p><ol><li style="list-style-type:decimal;font-size:12pt;"><p><strong><span style="font-size:12pt;">Làm sạch da:</span></strong></p><ul><li style="list-style-type:circle;font-size:12pt;"><p><strong><span style="font-size:12pt;">Tẩy trang:</span></strong><span style="font-size:12pt;"> Sử dụng sản phẩm tẩy trang không chứa cồn để loại bỏ mỹ phẩm và bụi bẩn.</span></p></li><li style="list-style-type:circle;font-size:12pt;"><p><strong><span style="font-size:12pt;">Rửa mặt:</span></strong><span style="font-size:12pt;"> Rửa mặt buổi sáng và tối bằng sữa rửa mặt có độ pH từ 4.5-5.5 để duy trì độ cân bằng tự nhiên của da.</span></p></li><li style="list-style-type:circle;font-size:12pt;"><p><strong><span style="font-size:12pt;">Tẩy tế bào chết:</span></strong><span style="font-size:12pt;"> Tẩy tế bào chết 2 lần/tuần để loại bỏ da chết, giúp da mịn màng hơn.</span></p></li></ul></li><li style="list-style-type:decimal;font-size:12pt;"><p><strong><span style="font-size:12pt;">Toner:</span></strong></p><ul><li style="list-style-type:circle;font-size:12pt;"><p><span style="font-size:12pt;"> Sử dụng toner không chứa cồn để cân bằng độ pH và cấp ẩm cho da sau khi rửa mặt.</span></p></li></ul></li><li style="list-style-type:decimal;font-size:12pt;"><p><strong><span style="font-size:12pt;">Dưỡng ẩm:</span></strong></p><ul><li style="list-style-type:circle;font-size:12pt;"><p><span style="font-size:12pt;"> Sử dụng kem dưỡng ẩm ban ngày và ban đêm để duy trì độ ẩm cho da.</span></p></li><li style="list-style-type:circle;font-size:12pt;"><p><span style="font-size:12pt;"> Đắp mặt nạ 2 lần/tuần, ưu tiên các nguyên liệu tự nhiên như yến mạch, bơ để cung cấp thêm dưỡng chất cho da.</span></p></li></ul></li><li style="list-style-type:decimal;font-size:12pt;"><p><strong><span style="font-size:12pt;">Chống nắng:</span></strong></p><ul><li style="list-style-type:circle;font-size:12pt;"><p><span style="font-size:12pt;"> Thoa kem chống nắng hàng ngày để bảo vệ da khỏi tác hại của tia UV.</span></p></li></ul></li></ol>'
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
            <InsideHeader title={'Phương pháp hữu ích'} />
            {method &&
                <>
                    <View style={styles.topContainer}>
                        <Image source={{ uri: method?.urlImage }} style={styles.image} />
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>{method?.category}</Text>
                        </View>
                        <Text style={styles.title}>{method?.methodName}</Text>
                        <View style={styles.authorContainer}>
                            <View style={styles.author}>
                                <Avatar rounded size={24} source={{ uri: method?.userAvatar }} />
                                <Text style={styles.authorText}>Tác giả: <Text style={{ fontWeight: '600', color: 'black' }}>{method?.fullName}</Text> </Text>
                            </View>
                            {method?.creationDate && <Text style={styles.viewText}>{format(new Date(method.creationDate), 'd, MMM yyyy', { locale: vi })}</Text>}
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: `<meta name="viewport" content="width=device-width">${method.description}` }}
                            style={{
                                height: height,
                            }}
                            automaticallyAdjustContentInsets={false}
                            scrollEnabled={false}
                            onMessage={event => {
                                setHeight(parseInt(event.nativeEvent.data));
                            }}
                            javaScriptEnabled={true}
                            injectedJavaScript={webViewScript}
                            domStorageEnabled={true}
                            useWebKit={true}
                        />
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
        paddingTop: 10,
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
