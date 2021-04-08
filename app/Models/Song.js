export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return `
      <div onclick="app.songsController.setActive(${this._id})"> 
      <img src="${this.albumArt}">
      <p>${this.artist}</p>
      <p>${this.album}</p>
      </div>
        `;
  }

  get activeTemplate(){
    return /*html*/`
    <div class="d-flex flex-column align-items-center mt-4">
      <button type="button" class="btn btn-outline-info mb-2" type="submit" onclick="">Add to My Music</button>
      <img src="${this.albumArt}" alt="">
      <h4>${this.artist} - ${this.title}</h4>
      <p>Album: ${this.album} | ${this.price}</p>
      <audio controls>
      <source src="${this.preview}">
      </audio>
    </div>
    `
  }

  get playlistTemplate() {
    return `

        `;
  }
}
