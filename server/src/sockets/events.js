export const EVENTS = Object.freeze({
  SYSTEM: {
    PING: "system:ping",
  },
  MEETING: {
    JOIN: "meeting:join",
    LEAVE: "meeting:leave",
    RAISE_HAND: "meeting:raise-hand",
    REACTION: "meeting:reaction",
  },
  WEBRTC: {
    OFFER: "webrtc:offer",
    ANSWER: "webrtc:answer",
    ICE_CANDIDATE: "webrtc:ice-candidate",
  },
  CHAT: {
    SEND: "chat:send",
    MESSAGE: "chat:message",
    TYPING: "chat:typing",
    STOP_TYPING: "chat:stop-typing",
  },
  PARTICIPANT: {
    JOINED: "participant:joined",
    LEFT: "participant:left",
    MUTE: "participant:mute",
    CAMERA: "participant:camera",
  },
  SCREEN: {
    START: "screen:start",
    STOP: "screen:stop",
  },
});