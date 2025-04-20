import { useState } from "react";

function Button({ label, onClick, type = "button" }) {
  return (
    <button className="button" onClick={onClick} type={type}>
      {label}
    </button>
  );
}

function App() {
  const [friends, setFriends] = useState([]);
  const [showAddFriend, setShowAddfriend] = useState(false);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleAddFriends(name, image) {
    let newFriend = {
      id: Date.now(),
      name: name,
      image: image,
      balance: 0,
    };

    setFriends((oldState) => [...oldState, newFriend]);
    setShowAddfriend(false);
  }

  function handleAddFriendButton() {
    if (selectFriend) {
      setSelectFriend(null);
    } else {
      setShowAddfriend((oldStateFalse) => !oldStateFalse);
    }
  }

  function handleSplitBill(amount) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + amount }
          : friend
      )
    );
    setSelectFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={(friend) => {
            setSelectFriend(friend);
            if (friend) setShowAddfriend(false); // close AddFriend if SplitBill is to be shown
          }}
          selectFriend={selectFriend}
        />

        {showAddFriend ? (
          <AddFriends handleAddFriends={handleAddFriends} />
        ) : null}

        <Button
          label={showAddFriend ? "Close" : "Add Friends"}
          onClick={handleAddFriendButton}
        />
      </div>
      {selectFriend ? (
        <SplitBill
          friend={selectFriend}
          onClose={() => setSelectFriend(null)}
          onSplitBill={handleSplitBill}
        />
      ) : null}
    </div>
  );
}

function FriendsList({ friends, onSelect, selectFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            onSelect={onSelect}
            selectFriend={selectFriend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelect, selectFriend }) {
  const isSelected = selectFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button
        label={isSelected ? "Close" : "Select"}
        onClick={() => onSelect(!isSelected ? friend : null)}
      />
    </li>
  );
}

function AddFriends({ handleAddFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleImageChange(event) {
    setImage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !image) return;
    handleAddFriends(name, image);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤓Friend Name </label>
      <input type="text" value={name} onChange={handleChangeName} />
      <label>⭐️Image URL</label>
      <input type="text" value={image} onChange={handleImageChange} />
      <Button label={"Add"} type="submit" />
    </form>
  );
}

function SplitBill({ friend, onClose, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const billPaidByFriend = bill ? bill - paidByUser : "";

  function handleSubmit(event) {
    event.preventDefault();

    if (!bill || !paidByUser) return;

    let amount = whoIsPaying === "user" ? billPaidByFriend : -paidByUser;
    onSplitBill(amount);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Divide the bill with {friend.name} </h2>
      <label>💶 Total Bill Amount</label>
      <input
        type="text"
        value={bill}
        onChange={(event) => setBill(Number(event.target.value))}
      />
      <label>🤑 My spending </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val <= bill) setPaidByUser(val);
        }}
      />
      <label>💸 {friend.name} spending </label>
      <input type="text" disabled value={billPaidByFriend} />
      <label>😜Who paid the Bill?</label>
      <select
        value={whoIsPaying}
        onChange={(event) => setWhoIsPaying(event.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button label={`Split Bill`} type="submit" />
      <Button label={"Close"} onClick={onClose} />
    </form>
  );
}

export default App;
