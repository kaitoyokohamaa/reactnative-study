import React, {useState, useCallback} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
  Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('screen')

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF']
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png'
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png'
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png'
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png'
  }
]

const Indicator = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row'
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapodate: 'clamp'
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 0.9, 0.6],
          extrapodate: 'clamp'
        })
        return (
          <Animated.View
            key={`indicaton-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              margin: 10,
              opacity,
              transform: [
                {
                  scale
                }
              ]
            }}
          />
        )
      })}
    </View>
  )
}

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg)
  })
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  )
}

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  )
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg']
  })

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0]
  })
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate
          },
          {
            translateX
          }
        ]
      }}
    />
  )
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current

  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  )

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-35deg', '0deg']
  })

  console.log(rotate)
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingBottom: 100}}
        scrollEventThrottle={32}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false}
        )}
        renderItem={({item}) => {
          return (
            <View style={{width, alignItems: 'center', padding: 20}}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center'
                }}
              >
                <Animated.Image
                  source={{uri: item.image}}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                    transform: [
                      {
                        rotate
                      }
                    ]
                  }}
                />
              </View>
              <View style={{flex: 0.3}}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 24,
                    marginBottom: 10,
                    color: '#fff'
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{fontWeight: '300'}}>
                  {item.description}
                </Text>
              </View>
            </View>
          )
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
