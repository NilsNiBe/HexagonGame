import React from "react";
import SimplePeer from "vite-compatible-simple-peer";
import { TopBar } from "./TopBar";

export const PeerVideoConnector = (props: {
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
    const createPeerWithStream = (stream: MediaStream) => {
      var p = new SimplePeer({
        initiator: props.isHost,
        trickle: false,
        stream,
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

      p.on("stream", stream => {
        // got remote video stream, now let's show it in a video tag
        var video = document.querySelector("video")!;
        video.srcObject = stream;
        video.play();
      });

      setPeer(p);
    };

    var constraints = { audio: true, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        /* use the stream */
        createPeerWithStream(stream);
      })
      .catch(function (err) {
        /* handle the error */
        console.log(err);
      });

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

      <textarea value={myId} />
      <label>Other ID:</label>
      <textarea onChange={e => setOtherId(e.target.value)} value={otherId} />
      <button onClick={onConnect}>Connect</button>

      <label>Enter message:</label>
      <textarea onChange={e => setMessage(e.target.value)} value={message} />
      <button onClick={onSend}>Send</button>
      <pre>{messages}</pre>
      <video />
    </div>
  );
};
