import { ProxyState } from "../AppState.js";
import { sandBoxApi } from "../Services/AxiosService.js";
import service from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let songs = ProxyState.songs
  let template = ''
  songs.forEach(s => template += s.Template)
  document.getElementById('song-results').innerHTML = template
}

function _drawActiveSong(){
let song = ProxyState.activeSong
document.getElementById('active-song').innerHTML = song.activeTemplate

}

/**Draws the Users saved songs to the page */
function _drawPlaylist() { 
  let template = ''
  ProxyState.playlist.forEach(s => template += s.Template)
  document.getElementById('playlist').innerHTML = template
}

//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on('songs', _drawResults)
    ProxyState.on('activeSong', _drawActiveSong)

    this.getMySongs()
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      service.getMusicByQuery(e.target.query.value);
      _drawResults()
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) { }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }

async getMySongs(){
  try {
    await service.getMySongs()
  } catch (error) {
    console.error(error)
  }
}

setActive(id){
  service.setActive(id)
  _drawActiveSong()
}
}