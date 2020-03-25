import React, { Component } from "react";
import ManageAlbum from "./manageAlbum";
import "../../stylesheets/portfolio.css";

class ManagePortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      albums: [
        {
          id: 1,
          name: "Cafe",
          photoLists: []
        }
        // {
        //   id: 2,
        //   name: "Chula",
        //   photoLists: []
        // }
      ] //เก็บjsonของalbum ในalbumก็เก็บรูปอีกที
    };
    this.deleteAlbum = this.deleteAlbum.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
  }

  componentDidMount() {
    //ดึงalbumมาจากdatabase
  }

  deleteAlbum(id) {
    let albums = this.state.albums.filter(album => album.id !== id);
    this.setState({ albums });
    //แก้databaseส่วนalbum
  }

  addAlbum() {
    const album = {
      id: this.state.albums[this.state.albums.length - 1]
        ? this.state.albums[this.state.albums.length - 1].id + 1
        : 1,
      name: "Added Album",
      photoLists: []
    };
    let albums = this.state.albums;
    albums.push(album);
    this.setState({ albums });
    console.log(albums);
  }

  render() {
    return (
      <div className="my-5 container">
        <h1>
          <ion-icon name="images-outline"></ion-icon> Manage Portfolio
        </h1>
        <div class="d-flex align-items-center mt-3">
          <div class="bd-highlight">
            <h2>Albums</h2>
          </div>
          <div class="bd-highlight">
            <a href="#" className="text-success" onClick={this.addAlbum}>
              <h3>
                <ion-icon name="add-circle"></ion-icon>
              </h3>
            </a>
          </div>
        </div>
        <div className="container">
          {this.state.albums.map(album => (
            <ManageAlbum
              key={album.id.toString()}
              album={album}
              onDelete={this.deleteAlbum}
              hasSeperateLine={
                album !== this.state.albums[this.state.albums.length - 1]
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ManagePortfolio;
