/**
 * Created by lipeiwei on 16/10/11.
 */

import React, {PropTypes} from 'react';
import {
  ListView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  PixelRatio
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import {getMusicListByMonth} from '../api/music';
import monthArray from '../constant/month';
import commonStyle from '../style/commonStyle';
import {getNavigator} from '../route';

const styles = StyleSheet.create({
  listView: {

  },
  touchableOpacityContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    borderLeftWidth: 3,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderColor: commonStyle.GRAY_COLOR
  },
  image: {
    width: 50,
    height: 50,
    //Image只有borderWidth/borderColor属性
    //而没有borderLeftWidth/borderLeftColor等这一类指定方向的属性
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  titleText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 18,
  },
  authorName: {
    color: commonStyle.LIGHT_BLUE_COLOR,
    fontSize: 14,
    marginTop: 10
  },
  separatorView: {
    marginVertical: 5,
    height: 1 / PixelRatio.get(),
    marginLeft: 78,
    backgroundColor: commonStyle.GRAY_COLOR
  }
});

class MusicListPage extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  getNavigationBarProps() {
    return {
      hideRightButton: true,
      title: `${monthArray[this.props.month]}.${this.props.year}`,
      leftButtonImage: require('../image/return.png')
    };
  }

  componentDidMount() {
    this.fetchData(this.props.year, this.props.month);
  }

  fetchData(year, month) {
    getMusicListByMonth(year, month).then(musicList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(musicList)
      });
    });
  }

  renderBody() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}/>
    );
  }

  renderRow(music, sectionID, rowID) {
    return (
      <TouchableOpacity key={rowID} style={styles.touchableOpacityContainer} onPress={() => this.onListViewItemPressed(music)}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => this.onAvatarPressed(music)}
            style={styles.imageContainer}>
            <Image resizeMode="contain" style={styles.image} source={{uri: music.cover}}/>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.titleText}>{music.title}</Text>
            <Text numberOfLines={1} style={styles.authorName}>{music.author.user_name}</Text>
          </View>
          <Image style={{width: 20}} resizeMode="contain" source={require('../image/forward.png')}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View key={rowID} style={styles.separatorView}/>
    );
  }

  onListViewItemPressed(music) {
    let id = parseInt(music.id);
    getNavigator().push({
      name: 'MusicDetailPage',
      id
    });
  }

  onAvatarPressed() {

  }

}

MusicListPage.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired
};

export default MusicListPage;

const music = {
    "id": "588",
    "title": "好想大声说爱你",
    "cover": "http://image.wufazhuce.com/FtVQSHjwOF6GnHFgZ2SNAkDVvLc3",
    "platform": "2",
    "music_id": "http://music.wufazhuce.com/lgpnLvQEyHPXnKoaS1MuhRculQil",
    "author": {
      "user_id": "6848467",
      "user_name": "BAAD",
      "web_url": "http://image.wufazhuce.com/FqH3f45fqHAObLQ9sQXoB3pjArs6",
      "desc": "J-Rock乐队"
    }
};

