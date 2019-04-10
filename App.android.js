import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MusicControl from 'react-native-music-control';


export default class App extends React.Component {
  constructor(props){
    console.log("init")
    super(props)
    this.state = {
      playing: false
    }
  }

  toggle = () => {
    this.state.playing ? this.pause() : this.play();
  }

  play = () => {
    this.setState({playing: true})
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
      elapsedTime: 0
    })
  }
  
  pause = () => {
    this.setState({playing: false})
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
      elapsedTime: 0
    })
  }

  componentDidMount(){
    MusicControl.enableBackgroundMode(true);

    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)

    MusicControl.on('play', ()=> {
      console.log("playing...")
      this.play();
    });

    MusicControl.on('pause', ()=> {
      console.log("pausing...");
      this.pause();
    });

    MusicControl.setNowPlaying({
      title: 'title',
      artwork: 'https://i.imgur.com/e1cpwdo.png',
      artist: 'artist',
      album: 'album',
      genre: 'genre',
      duration: 100,
      description: 'description',
      date: '1983-01-02T00:00:00Z',
      rating: 84
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.toggle}
          title={this.state.playing ? "PAUSE SONG" : "PLAY SONG"}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
