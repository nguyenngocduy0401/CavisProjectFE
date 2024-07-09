import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import Header from '../../components/header/Header';
import TitleText from '../../components/text/TitleText';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { endOfMonth, format, parse, startOfMonth } from 'date-fns';
import { Divider } from '@rneui/themed';
import SeeAllButton from '../../components/button/SeeAllButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthNamesShort: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7'],
  today: "Hôm nay"
};
LocaleConfig.defaultLocale = 'vi';

export default function Insights() {
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const [selected, setSelected] = useState(format(new Date(), "yyyy-MM-dd"));
  const [schedules, setSchedules] = useState([])
  const [schedulesMark, setSchedulesMark] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  async function getSchedules() {
    const date = parse(selected, 'yyyy-MM-dd', new Date());
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    try {
      setRefreshing(true);
      const data = {
        "2024-07-07": [],
        "2024-07-08": [
          {
            expert: {
              fullName: "Nguyễn Văn A",
              role: "ExpertMakeup",
            },
            startTime: "12:00",
            endTime: "14:00",
          },
          {
            expert: {
              fullName: "Nguyễn Văn B",
              role: "ExpertSkincare"
            },
            startTime: "12:00",
            endTime: "14:00",
          }
        ],
        "2024-07-09": [
          {
            expert: {
              fullName: "Nguyễn Văn A",
              role: "ExpertMakeup"
            },
            startTime: "12:00",
            endTime: "14:00",
          }
        ],
        "2024-07-10": [
          {
            expert: {
              fullName: "Nguyễn Văn A",
              role: "ExpertMakeup"
            },
            startTime: "12:00",
            endTime: "14:00",
          }
        ],
        "2024-07-11": [
          {
            expert: {
              fullName: "Nguyễn Văn A",
              role: "ExpertMakeup"
            },
            startTime: "12:00",
            endTime: "14:00",
          }
        ],
        "2024-07-12": [],
        "2024-07-13": [],
      }
      const markedData = {
        '2024-07-08': { marked: true },
        '2024-07-09': { marked: true },
        '2024-07-10': { marked: true },
        '2024-07-11': { marked: true },
      }
      setSchedulesMark(markedData)
      setSchedules(data)
    } catch (error) {
      console.log(error)
    } finally {
      setRefreshing(false);
    }
  }
  useEffect(() => {
    if (isFocused) {
      getSchedules()
    }
  }, [isFocused, selected])
  const onRefresh = useCallback(() => {
    if (isFocused) {
      getSchedules()
    }
  }, [isFocused, selected]);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <TitleText title={'Lịch trình'} style={styles.title} />
        <SeeAllButton text={'Đặt lịch'} onPress={() => navigation.navigate('Booking')} />
      </View>
      <Agenda
        items={schedules}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        selected={selected}
        markedDates={schedulesMark}
        renderItem={(item, isFirst) => (
          <View style={styles.item} >
            <Text style={styles.itemTitle}>{item.expert.fullName}</Text>
            <Text style={styles.itemText}>{item.expert.role === "ExpertSkincare" ? "Tư vấn về skincare" : "Tư vấn về makeup"}</Text>
            <Text style={styles.itemText}>{item.startTime} - {item.endTime}</Text>
          </View>
        )}
        renderEmptyDate={() => (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Divider style={{ marginRight: 10 }} />
          </View>
        )}
        renderEmptyData={() => (
          <TitleText
            style={{
              textAlign: 'center',
              marginLeft: 0
            }}
            title={'Không có lịch hẹn'}
          />
        )}
        showClosingKnob={true}
        refreshing={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        theme={{
          agendaTodayColor: '#F27272',
          agendaKnobColor: '#F27272',
          selectedDotColor: '#F27272',
          selectedDayBackgroundColor: '#F27272',
          todayTextColor: '#F27272',
          dotColor: '#F27272',
        }}
      />
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 20,
    width:'50%'
  },
  item: {
    backgroundColor: '#F27272',
    flex: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
  },
  itemTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  },
  itemText: {
    fontSize: 14,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: 'center'
  },
})