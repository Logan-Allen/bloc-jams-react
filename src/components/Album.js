import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
    constructor(props) {
        super(props);
        
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug;
        });
        
        this.state = {
            
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            isHovered: false
        };
        
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }
    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }
    
    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
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
                        <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.setState({isHovered: index + 1})} onMouseLeave={() => this.setState({isHovered: false})} >
                            <td className="song-actions"  >
                                <button id="song-buttons"> 
                                    {(this.state.currentSong.title === song.title) ? 
                                    (<span className={this.state.isPlaying ? "ion-pause" : "ion-play"} />) :
									this.state.isHovered === index + 1 ? (<span className="ion-play" />) :
									(<span className="song-number">{index + 1}</span>)}
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