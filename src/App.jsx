import { useState } from "react";

const dummy_Friends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ label, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
}

function App() {
  const [showAddFriend, setShowAddfriend] = useState(false);
  function handleAddFriendButton() {
    setShowAddfriend((oldStateFlase) => !oldStateFlase);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend ? <AddFriends /> : null}
        <Button
          label={showAddFriend ? "Close" : "Add Friends"}
          onClick={handleAddFriendButton}
        />
      </div>
      <SplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = dummy_Friends;
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You need to pay {friend.name} <strong>₹</strong>
          {Math.abs(friend.balance)}
        </p>
      ) : null}
      {friend.balance > 0 ? (
        <p className="green">
          {friend.name} will pay me <strong>₹</strong>
          {Math.abs(friend.balance)}
        </p>
      ) : null}
      {friend.balance === 0 ? <p>We’re settled</p> : null}
      <Button label="Select" />
    </li>
  );
}

function AddFriends() {
  return (
    <form className="form-add-friend">
      <label>🤓Friend Name </label>
      <input type="text" />
      <label>⭐️Image URL</label>
      <input type="text" />
      <Button label={"Add"} />
    </form>
  );
}

function SplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Divide the bill with ABC </h2>
      <label>💶 Total Bill Amount</label>
      <input type="number" />
      <label>🤑 My spending </label>
      <input type="number" />
      <label>💸 ABC spending </label>
      <input type="number" disabled />
      <label>😜Who is Paying the Bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">ABC</option>
      </select>
      <Button label={"Split Bill"} />
    </form>
  );
}

export default App;
