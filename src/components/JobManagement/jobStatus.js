import React, { Component } from "react";
import { storage } from "../../firebase";
import axios from "axios"

class JobStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: this.props.offer._id,
      statusCode: this.props.offer.progress,
      photographer: this.props.offer.portfolioName,
      photographerEmail: "-",
      employer: this.props.offer.employerName,
      employerEmail: "-",
      title: this.props.offer.title,
      style: this.props.offer.style,
      date: this.props.offer.actDate,
      //   date: "Jan 10 2019",
      time: this.props.offer.meetUpTime,
      location: this.props.offer.location,
      totalFees: this.props.offer.fee,
      currency: "THB",
      uploadProgress: 0,
      isUploading: false,
      file: null,
    };
    this.getStatusMessageEmployer = this.getStatusMessageEmployer.bind(this);
    this.getStatusMessagePhotographer = this.getStatusMessagePhotographer.bind(
      this
    );
    this.uploadImage = this.uploadImage.bind(this);
    this.imgToBeUpload = this.imgToBeUpload.bind(this);
  }

  updateData(data) {
    this.setState({
      jobID: data._id,
      statusCode: data.progress,
      photographer: data.portfolioName,
      photographerEmail: data.portfolioEmail,
      employer: data.employerName,
      employerEmail: data.employerEmail,
      title: data.title,
      style: data.style,
      date: data.actDate,
      //   date: "Jan 10 2019",
      time: data.meetUpTime,
      location: data.location,
      totalFees: data.fee
    })
  }

  handleAcceptJob = () => {
    axios
      .post("http://localhost:9000/api/employerAccept",{
        id: this.state.jobID,
      })
      .then(res => console.res(res))
      .catch(err => console.error(err));
    window.location.href = "/history"
  }

  handleDeclineJob = () => {
    axios
      .post("http://localhost:9000/api/declineOffer",{
        id: this.state.jobID,
      })
      .then(res => console.res(res))
      .catch(err => console.error(err));
    window.location.href = "/"
  }

  pay = () => {
    axios
      .post("http://localhost:9000/api/pay30",{
        id: this.state.jobID,
      })
      .then(res => console.res(res))
      .catch(err => console.error(err));
    window.location.href = "/history"
  }

  imgToBeUpload(e) {
    let file = e.target.files[0];
    if (file) this.setState({ file });
  }

  uploadImage() {
    var uploadTask = storage
      .ref()
      .child(
        this.state.employer +
          "/images/" +
          "jobID=" +
          this.state.jobID +
          "/" +
          this.state.file.name
      )
      .put(this.state.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ uploadProgress });
        this.setState({ isUploading: true });
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.setState({ isUploading: false });
          this.setState({ statusCode: 7 });
          //ใช้ตัวแปร downloadURL ได้เลยเพื่อส่งลิงก์
          //ส่งdownload urlให้employer แล้วdrop job นี้ออกจากตาราง แล้วไปเพิ่มใน history
        });
      }
    );
  }

  getStatusMessage = () => {
    if(this.state.employerEmail == this.props.appState.email){
      return this.getStatusMessageEmployer()
    }else return this.getStatusMessagePhotographer()
  }

  getStatusMessagePhotographer() {
    //สำหรับphotographer
    const { statusCode } = this.state;

    switch (statusCode) {
      case 2: //เคสนี้ให้photographerรอ employer accept proposed fees ถ้าไม่ accept ก็drop job ทิ้ง
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>
              Wait for {this.state.employer} to accept your proposed fees.
            </small>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
          </div>
        );
      case 3: //แค่บอกให้รอemployerจ่ายเงิน
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>
              Wait for {this.state.employer} to pay the 30% of total fees
              deposit.
            </small>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
          </div>
        );
      case 4: //เหมือนกับemployerเลย บอกให้รอถึงวันถ่ายกับถ้าถึงวันถ่ายจะมีปุ่มให้กดว่าเรียบร้อยแล้ว
        // ถ้ากดปุ่มDoneแล้วก็จะเปลี่ยน statusCodeจาก 4 เป็น 5
        if (new Date().toString().substr(4, 11) !== this.state.date) {
          return (
            <div>
              <h2>
                <span class="badge badge-yellow">Waiting</span>
              </h2>
              <small>
                The appointed date is {this.state.date} at {this.state.location}
              </small>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="hourglass-outline"
                ></ion-icon>
              </h1>
            </div>
          );
        } else {
          return (
            <div>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="camera-outline"
                ></ion-icon>
              </h1>
              <h2>
                <span class="badge badge-yellow">Appointed Day!</span>
              </h2>
              Meet <strong>{this.state.employer}</strong> at{" "}
              <strong>{this.state.location}</strong>
              <button className="btn btn-outline-light">Done shooting!</button>
              {/* กดปุ่มเพื่อเปลี่ยนstatusCode */}
            </div>
          );
        }
      case 5: //บอกให้photographerรอemployerจ่ายเงินทั้งหมด
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>
              Wait for {this.state.employer} to pay for the rest fees.
            </small>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
          </div>
        );
      case 6: //เคสนี้ให้photographerอัปไฟล์zip
        //พออัปเสร็จในfunction uploadImage จะมีcommentบอกอยู่ว่าให้ทำไร
        //หลังเคสนี้จะเป็นstatusCode7ไม่ต้องไปอัปเดตในdatabaseแล้ว อัปเสร็จให้drop job ทิ้งเลยละไปเพิ่มลงส่วน history
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">
                Send photos to {this.state.employer}
              </span>
            </h2>
            <small>Upload .zip or .rar</small>
            <p>
              {this.state.isUploading ? (
                <div
                  class="spinner-border"
                  style={{ color: "#ffffff" }}
                  role="status"
                ></div>
              ) : (
                <button
                  className="btn btn-light"
                  onClick={() => document.getElementById("uploader").click()}
                >
                  <ion-icon
                    name="cloud-upload"
                    style={{ fontSize: "42px" }}
                  ></ion-icon>
                </button>
              )}
            </p>
            {this.state.file ? (
              <button
                onClick={() => {
                  if (!this.state.isUploading) this.uploadImage();
                }}
                className="btn btn-outline-light"
              >
                Submit {this.state.file.name}
              </button>
            ) : (
              ""
            )}

            <input
              type="file"
              id="uploader"
              accept=".zip,.rar"
              style={{ display: "none" }}
              onChange={this.imgToBeUpload}
            />
          </div>
        );
      case 7: //อันนี้back-endไม่ต้องทำไร ส่วนแสดงผลเฉย ๆ
        return (
          <div>
            <h2>
              <span class="badge badge-info">All done!</span>
            </h2>
          </div>
        );
    }
  }

  getStatusMessageEmployer() {
    //สำหรับemployer
    const { statusCode } = this.state;
    switch (statusCode) {
      case 1: //เคสนี้คือส่งofferไปแล้วรอphotographerตอบ
        //ถ้าacceptระบบก็ต้องเปลี่ยนstatusCodeให้เป็น2 คือไปอัปเดตในฐานข้อมูล แต่ถ้าdeclineก็drop jobนี้ทิ้งไปเลย
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>Wait for photographer to accept and propose fees</small>
            <h1>
              <ion-icon
                style={{ opacity: "0.5" }}
                name="hourglass-outline"
              ></ion-icon>
            </h1>
          </div>
        );
      case 2: //อันนี้เป็นฝั่งเราตอบรับราคาที่photographerเสนอมา ถ้ารับก็เปลี่ยนstatusCodeเป็น3
        //ถ้าไม่รับก็drop job นี้ทิ้ง
        return (
          <div>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
            <small>Photographer proposes total fees for this job</small>
            <h3>
              {this.state.currency} {this.state.totalFees}
            </h3>
            <button className="mr-3 btn btn-sm btn-outline-light" onClick={this.handleAcceptJob}>
              Accept
            </button>
            {/* เขียนฟังก์ชันขึ้นมาเพื่อเปลี่ยนstatusCodeในdatabase */}
            <button className="btn btn-sm btn-outline-warning" onClick={this.handleDeclineJob}>Decline</button>
          </div>
        );
      case 3: //เคสนี้ก็ให้เปลี่ยนstatusCodeก็ต่อเมื่อจ่าย30%แล้ว
        //ถ้าถึงวันถ่ายแล้วไม่จ่ายให้drop job นี้ทิ้ง
        return (
          <div>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
            <small>
              To start shooting and ensure photographer, pay 30% of total fees
              before appointed date or this job will be dropped.
            </small>
            <h3>
              <span className="text-yellow">
                {this.state.currency} {this.state.totalFees * 0.3}
              </span>{" "}
              from {this.state.currency} {this.state.totalFees}
            </h3>
            <button className="mr-3 btn btn-sm btn-yellow" onClick={this.pay}>
              <strong>
                <ion-icon name="card-outline"></ion-icon> Pay via Credit Card
              </strong>
            </button>
          </div>
        );
      case 4: //อันนี้ไม่มีอะไรแค่แสดงผลว่าให้รอถึงวันถ่ายภาพ กับบอกว่าวันนี้เป็นวันถ่ายภาพ
        if (new Date().toString().substr(5, 11) !== this.state.date) {
          return (
            <div>
              <h2>
                <span class="badge badge-yellow">Waiting</span>
              </h2>
              <small>
                The appointed date is {this.state.date} at {this.state.location}
              </small>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="hourglass-outline"
                ></ion-icon>
              </h1>
            </div>
          );
        } else {
          return (
            <div>
              <h2>
                <span class="badge badge-yellow">Appointed Day!</span>
              </h2>
              Meet <strong>{this.state.photographer}</strong> at{" "}
              <strong>{this.state.location}</strong>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="camera-outline"
                ></ion-icon>
              </h1>
            </div>
          );
        }
      case 5: //เคสนี้ก็ให้employerจ่ายเงินที่เหลือ จ่ายสำเร็จก็เปลี่ยนstatusCodeเป็น6
        return (
          <div>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
            <small>
              Pay the rest fees for photographer to send you photos.
            </small>
            <h3>
              <span className="text-yellow">
                {this.state.currency}
                {this.state.totalFees - this.state.totalFees * 0.3}
              </span>
            </h3>
            <button className="mr-3 btn btn-sm btn-yellow">
              <strong>
                <ion-icon name="card-outline"></ion-icon> Pay via Credit Card
              </strong>
            </button>
          </div>
        );
      case 6: //แค่บอกให้employerรอphotographerส่งภาพมา
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Waiting</span>
            </h2>
            <small>Wait for photographer to send you photos.</small>
            <h1>
              <ion-icon
                style={{ opacity: "0.5" }}
                name="hourglass-outline"
              ></ion-icon>
            </h1>
          </div>
        );
      case 7:
        //เคส7เขียนเผื่อไว้ แต่ไม่น่าจะใช้ จะให้ photographer ส่งลิงก์ไฟล์มาให้ โดยจะไปปรากฎที่ history แทนแล้ว ไม่ใช่ job
        return (
          <div>
            <h2>
              <span class="badge badge-info">Here's your photo!</span>
            </h2>
            <small>Download them</small>
            <p>
              <button className="btn btn-light">
                <ion-icon
                  name="download"
                  style={{ fontSize: "42px" }}
                ></ion-icon>
              </button>
            </p>
            <a href="/review">
              <button className="btn btn-light">
                Review your photographer
              </button>
            </a>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-md-4 my-auto text-center">
            <h1 className="text-purple">
              <ion-icon name="analytics-outline"></ion-icon> Job Status
            </h1>
          </div>
          <div className="col-md-8 bg-purple text-light rounded">
            <div className="row">
              <div className="col-md p-3">
                <p>
                  <strong>Employer: </strong>
                  {this.state.employer}
                </p>
                <p>
                  <strong>Job's title: </strong>
                  {this.state.title}
                </p>
                <p>
                  <strong>Style: </strong>
                  {this.state.style}
                </p>
                <p>
                  <strong>Shoot date: </strong>
                  {this.state.date}
                </p>
                <p>
                  <strong>Time: </strong>
                  {this.state.time}
                </p>
                <p>
                  <strong>Location: </strong>
                  {this.state.location}
                </p>
                <p>
                  <strong>Fees: </strong>
                  {this.state.totalFees}
                  {this.state.currency}
                </p>
              </div>
              <div
                className="col-auto my-3"
                style={{ borderLeft: "2px solid white" }}
              ></div>
              <div className="col-md p-3 text-center my-auto">
                {this.getStatusMessage()}
                {/* ตรงนี้จะให้เช็กว่าเป็นemployerหรือphotographerเพื่อแสดงผลjob status ตาม user type */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobStatus;
