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
            const data = await getMethod(id);
            setMethod(data?.data)
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
        height: screenWidth / 2 + 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
})
