import * as React from 'react';
import { render } from 'react-dom';
import { twitchdemo as canister } from '../../declarations/twitchdemo'

class PhoneBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async greet() {
    const name = document.getElementById("name").value.toString();
    // Interact with twitchdemo actor, calling the greet method
    const greeting = await canister.greet(name);

    document.getElementById("greeting").innerText = greeting;
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
      </div>
    );
  }
}

render(<PhoneBook />, document.getElementById('app'));