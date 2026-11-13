# MeetSphere

Real-time meeting & collaboration platform (video, chat, screen share, AI assistant).

## Stack
React + Vite + Tailwind · Node + Express · MongoDB · Socket.IO · WebRTC

## Run locally
```bash
# terminal 1
cd server && cp .env.example .env && npm install && npm run dev
# terminal 2
cd client && cp .env.example .env && npm install && npm run dev
```

## Architecture
- REST (Axios ↔ Express): auth, meetings, history
- Socket.IO: signaling, chat, presence
- WebRTC: audio/video/screen media (peer-to-peer)