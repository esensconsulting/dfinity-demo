import * as React from 'react';
import { render } from 'react-dom';
import { twitchdemo as canister } from '../../declarations/twitchdemo';
import { readAndCompressImage } from "browser-image-resizer";


class PhoneBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.displayImage = "";
  }

  async greet() {
    const name = document.getElementById("name").value.toString();
    // Interact with twitchdemo actor, calling the greet method
    const greeting = await canister.greet(name);

    document.getElementById("greeting").innerText = greeting;
  }

  async pictureHandler(event) {
    console.log(event.target.files[0])
    const selectedFile = event.target.files[0];
    const config = {
      quality: 1,
      width: 200,
      height: 200,
    };
    readAndCompressImage(selectedFile, config).then(file => {
      var reader = new FileReader();
      reader.onload = function () {
        this.displayImage = reader.result
        document.getElementById("image").src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  async doInsert() {
    let name = document.getElementById("newEntryName").value;
    let desc = document.getElementById("newEntryDesc").value;
    let phone = document.getElementById("newEntryPhone").value;
    let image = document.getElementById("image").src;
    canister.insert(name, { desc, phone , image:( image ? [image] : [])});
  }

  async lookup() {
    let name = document.getElementById("lookupName").value;
    canister.lookup(name).then(opt_entry => {
      let entry = opt_entry.length > 0 ? opt_entry[0] : null;
      if (entry === null || entry === undefined) {
        entry = {
          desc: "",
          phone: "",
        };
      }
      document.getElementById("newEntryName").value = name;
      document.getElementById("newEntryDesc").value = entry.desc;
      document.getElementById("newEntryPhone").value = entry.phone;
      document.getElementById("image").src = entry.image;
    });
  }

  render() {
    return (
      <div>
        <div>
          <table>
            <tr>
              <td>Enter your name :</td>
              <td><input required id="name"></input></td>
              <td><button onClick={() => this.greet()}>greet!</button></td>
            </tr>
          </table>
          <section id="greeting"></section>
        </div>
        <h1>Phone Book</h1>
        <div>
          <h3>Insert or update a new phone book entry:</h3>
          <table>
            <tr><td>Name:</td><td><input required id="newEntryName"></input></td></tr>
            <tr><td>Description:</td><td><input id="newEntryDesc"></input></td></tr>
            <tr><td>Phone:</td><td><input required id="newEntryPhone" type="tel" pattern="[0-9]{10}"></input></td></tr>
            <tr><td>Picture:</td><td><input
              type="file"
              accept="image/*"
              onChange={this.pictureHandler}
            /></td>
              <td>
                <img id="image" src={this.displayImage} />
              </td>
            </tr>
          </table>
          <button onClick={() => this.doInsert()}>Insert or Update</button>
        </div>
        <div>
          Lookup Name: <input id="lookupName"></input> <button onClick={
            () => this.lookup()
          }>Lookup</button>
        </div>
      </div>
    );
  }
}

render(<PhoneBook />, document.getElementById('app'));