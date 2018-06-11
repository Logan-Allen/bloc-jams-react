import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
    constructor(props) {
        super(props);
        
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
        
        this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            isHovered: false,
            dynamicClass: "song-number",
            targetId: 0
        };
        
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }
    play() {
        this.audioElement.play();
        this.setState({ 
            isPlaying: true,
            dynamicClass: "icon ion-ios-pause"
        });
    }
    
    pause() {
        this.audioElement.pause();
        this.setState({ 
            isPlaying: false,
            dynamicClass: "icon ion-ios-play"
        });
    }
    
    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }
    
    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        }   else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
}

    mouseEnter(e) {
        console.log(e.target.id);
        if (!this.state.currentSong || !this.state.isPlaying){
            this.setState({
                dynamicClass: "icon ion-ios-play",
                targetId: e.target.id
            });
        }
    }

    mouseLeave(e){
        console.log(e.target);
        if (!this.state.currentSong || !this.state.isPlaying){
            this.setState({
                dynamicClass: "song-number",
                targetId: e.target.id
            });
        }
        else if (this.state.currentSong){
            this.setState({
                dynamicClass: "icon ion-ios-pause",
                targetId: e.target.id
            });
        }
    }

    render() {
        return (
            
            
            <section className="album">
                <section id="album-info">
                  <img id="album-cover-art" src={this.state.album.albumCover} alt="Album cover Art"/>
                  <div className= "album-details">
                    <span id="album-title">{this.state.album.title}</span>
                    <span className="artist">{this.state.album.artist}</span>
                    <span id="release-info">{this.state.album.releaseInfo}</span>
                  </div>
                </section>
                <table id="song-list">
                  <colgroup>
                    <col id="song-number-column"/>
                    <col id="song-title-column"/>
                    <col id="song-duration-column"/>
                  </colgroup>
                  <tbody>
                    {this.state.album.songs.map(( song, index) => (
                        <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                            <td className="song-actions">
                                <button> 
                                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ? "hidden-song" : "song-number"}>{index + 1}</span>
                                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ? "icon ion-ios-pause" : " "}> </span>
                                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ? " " : "icon ion-ios-play"}> </span>
                                </button>
                            </td>
                            <td className="song-title">{song.title}</td>
                            <td className="song-duration">{song.duration}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
            </section>
        );
   }
}

export default Album;