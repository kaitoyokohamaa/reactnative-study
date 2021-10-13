Animated.ScrollView // Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/

import React, {useRef} from 'react'
import {
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  scrollTo,
  useAnimatedScrollHandler,
  useAnimatedRef
} from 'react-native-reanimated'

const {width, height} = Dimensions.get('screen')
import faker from 'faker'

faker.seed(10)
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men'
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email()
  }
})
const BG_IMG =
  'https://www.wallpapertip.com/wmimgs/5-54022_abstract-pastel-background-pastel.jpg'
const SPACING = 20
const AVATAR_SIZE = 70
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

export default function App() {
  const scrollY = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onEndDrag: () => {
      scrollY.value = 0
    },
    onScroll: (e, ctx) => {
      scrollY.value = e.contentOffset.y
    }
  })
  // todo:FlatList書き換え
  // const renderItem = ({item, index}) => {
  //   const style = useAnimatedStyle(() => {
  //     const scale = interpolate(
  //       scrollY.value,
  //       [-1, 0, ITEM_SIZE * Number(i), ITEM_SIZE * (Number(i) + 2)],
  //       [1, 1, 1, 0],
  //       Extrapolate.CLAMP
  //     )

  //     const opacity = interpolate(
  //       scrollY.value,
  //       [-1, 0, ITEM_SIZE * Number(i), ITEM_SIZE * (Number(i) + 1)],
  //       [1, 1, 1, 0],
  //       Extrapolate.CLAMP
  //     )

  //     return {
  //       transform: [{scale: scale}],
  //       opacity: opacity
  //     }
  //   })
  // return (
  //   <TouchableHighlight
  //     onPress={() => {
  //       console.log('test')
  //     }}
  //   >
  //     <Text>
  //       {item.text}
  //     </Text>
  //   </TouchableHighlight>
  // )

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.ScrollView {...{onScroll}} scrollEventThrottle={1}>
        {DATA.map((item, i) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              scrollY.value,
              [-1, 0, ITEM_SIZE * Number(i), ITEM_SIZE * (Number(i) + 2)],
              [1, 1, 1, 0],
              Extrapolate.CLAMP
            )

            const opacity = interpolate(
              scrollY.value,
              [-1, 0, ITEM_SIZE * Number(i), ITEM_SIZE * (Number(i) + 1)],
              [1, 1, 1, 0],
              Extrapolate.CLAMP
            )

            return {
              transform: [{scale: scale}],
              opacity: opacity
            }
          })

          return (
            <Animated.View
              style={[
                {
                  flexDirection: 'row',
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 0.3,
                  shadowRadius: 20
                },
                style
              ]}
            >
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2
                }}
              />
              <View>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 12, opacity: 0.8, color: '#0099cc'}}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          )
        })}
      </Animated.ScrollView>
    </View>
  )
}
