import React, { Component } from "react";
import ManageAlbum from "./manageAlbum";
import "../../stylesheets/portfolio.css";
import axios from 'axios';
class ManagePortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      albums: [], //เก็บjsonของalbum ในalbumก็เก็บรูปอีกที
      portfolio_album:[]
    };
    this.DeleteAlbum = this.DeleteAlbum.bind(this);
    this.AddAlbum = this.AddAlbum.bind(this);
  }

   componentDidMount() {
    
    //ดึงalbumมาจากdatabase
    this.getAlbum()
    console.log(this.state.albums)
  }

  async getAlbum(){
    var res_port = await axios.get("http://localhost:9000/api/portfolio/" + localStorage.email)
    .catch((err) => console.error(err));
    let albumId = res_port.data.data.albums ; 
    console.log('albumId ',albumId)
    var albums = []
    for (let id of albumId) {
      await axios.get("http://localhost:9000/api/album/" + id)
      .then((res) =>{
        console.log(res.data.data)
        albums.push({ 
          id:res.data.data[0].portfolioID,
          photoLists:res.data.data[0].imageURLs ,
          name:res.data.data[0].albumName,
          _id:res.data.data[0]._id
        })
      })
      .catch((err) => console.error(err));
    }
    this.setState({albums: albums })
    // console.log('albums Array ',albums)
  }

  async DeleteAlbum(id) {
    let albums = await this.state.albums.filter((album) => album.id !== id);
    let albums_target = await this.state.albums.filter((album) => album.id == id);
    this.setState({ albums });
    // แก้databaseส่วนalbumพร้อมทั้งลบรูปทั้งหมด
    var Result = []
    for (let album of albums){
      Result.push(localStorage.email +'-'+this.state.name+'-'+ parseInt(album.id.match(/[^-]+$/),10))
    }
    
    var obj_id ;
    // console.log('Result',Result)
    // console.log('albums_target',albums_target[0]._id)
    // console.log('albums',albums)
    // console.log(albums_target,albums_target[0]._id)
    await axios
    .get("http://localhost:9000/api/portfolio/" + localStorage.email)
    .then((res) => {
      obj_id = res.data.data._id
      // console.log(obj_id)
      // console.log('albums_target',albums_target)
      axios.put("http://localhost:9000/api/portfolio/delete",{
        album_id: Result, 
        _id: obj_id
      });
      axios.delete("http://localhost:9000/api/album/"+  albums_target[0]._id)
    })

  }

  async AddAlbum() {
    var album ;
    if (this.state.albums[this.state.albums.length - 1])  {
      album = await {
        id: parseInt(this.state.albums[this.state.albums.length - 1].id.match(/[^-]+$/),10) + 1 ,
        name: "Added Album",
        photoLists: [],
      };
    }else{
      album = await {
        id: 1,
        name: "Added Album",
        photoLists: [],
      };
    }


    let albums = await this.state.albums;
    albums.push(album);
    this.setState({ albums });
    // สร้างใหม่

    var obj_id ;
    await axios
    .get("http://localhost:9000/api/portfolio/" + localStorage.email)
    .then((res) => {
      obj_id = res.data.data._id
    })
    .catch((err) => console.error(err));

    // put ใน Portfolio
    // console.log('AddAlbum put ---->',obj_id)
    // console.log(this.state.albums)
    await axios.put("http://localhost:9000/api/portfolio/",
    {
      album_id: localStorage.email +'-'+this.state.name+'-'+ album.id, 
      _id: obj_id
    }).then((res)=>{
      console.log(res)
    })
    .then( await axios.post("http://localhost:9000/api/album/"+  localStorage.email +'-'+this.state.name+'-'+ album.id,
    {
      albumName: album.name,
      portfolioID: localStorage.email +'-'+this.state.name+'-'+ album.id,
      imageURLs: album.photoLists
    }).then((res)=>{
      console.log(res)
    })
    )
    .then(window.location.reload(false));

    // //post ใน Album
    // console.log('portfolioID',localStorage.email +'-'+this.state.name+'-'+ album.id)

  }



  render() {
    return (
      <div className="my-5 container">
        <h1 className="text-purple">
          <ion-icon name="images-outline"></ion-icon> Manage Portfolio
        </h1>
        <div class="d-flex align-items-center mt-3">
          <div class="bd-highlight">
            <h2>Albums</h2>
          </div>
          <div class="bd-highlight">
            <a href="#" className="text-success" onClick={this.AddAlbum}>
              <h3>
                <ion-icon name="add-circle"></ion-icon>
              </h3>
            </a>
          </div>
        </div>
        <div className="container">
          {this.state.albums.map((album) => (
            <ManageAlbum
              key={album.id.toString()}
              album={album}
              onDelete={this.DeleteAlbum}
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
