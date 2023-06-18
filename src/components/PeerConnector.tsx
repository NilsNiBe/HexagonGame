import React from "react";
import SimplePeer from "simple-peer";
import { TopBar } from "./TopBar";

export const PeerConnector = (props: {
  isHost: boolean;
  toMainMenu: () => void;
}) => {
  const [myId, setMyId] = React.useState("");
  const [otherId, setOtherId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState("");
  const [peer, setPeer] = React.useState<SimplePeer.Instance | undefined>(
    undefined
  );

  React.useEffect(() => {
    var p = new SimplePeer({
      initiator: props.isHost,
      trickle: false,
    });

    p.on("signal", data => {
      const json = JSON.stringify(data);
      setMyId(json);
      navigator.clipboard.writeText(json);
    });

    p.on("data", data => {
      const decoded = new TextDecoder().decode(data);
      setMessages(m => (m === "" ? decoded : m + "\n" + decoded));
      // console.log("got a message from peer: " + decoded);
    });

    setPeer(p);

    return () => {
      peer?.destroy();
    };
  }, []);

  const onConnect = () => {
    peer?.signal(JSON.parse(otherId));
  };

  const onSend = () => {
    // console.log("yourMessage JSON.stringify(data): " + JSON.stringify(message));
    peer?.send(message);
    setMessage("");
  };

  return (
    <div
      style={{
        padding: 50,
        display: "grid",
        width: "80vw",
      }}
    >
      <TopBar toMainMenu={props.toMainMenu} />

      <label>Your ID:</label>

      <textarea defaultValue={myId} />
      <label>Other ID:</label>
      <textarea onChange={e => setOtherId(e.target.value)} value={otherId} />
      <button onClick={onConnect}>Connect</button>

      <label>Enter message:</label>
      <textarea onChange={e => setMessage(e.target.value)} value={message} />
      <button onClick={onSend}>Send</button>
      <pre>{messages}</pre>
    </div>
  );
};
