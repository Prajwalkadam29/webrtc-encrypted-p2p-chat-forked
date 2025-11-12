const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');
const os = require('os');

const PORT = 3001;

// Get local IP address for display - IMPROVED VERSION
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  
  // Priority 1: Look for WiFi adapter by name
  for (const name of Object.keys(interfaces)) {
    // Skip known virtual adapters
    if (name.toLowerCase().includes('virtualbox') || 
        name.toLowerCase().includes('vmware') || 
        name.toLowerCase().includes('hyper-v') ||
        name.toLowerCase().includes('vethernet') ||
        name.toLowerCase().includes('docker')) {
      continue;
    }
    
    // Prioritize WiFi adapters
    if (name.toLowerCase().includes('wi-fi') || 
        name.toLowerCase().includes('wireless') ||
        name.toLowerCase().includes('wlan')) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          console.log(`✅ Using WiFi adapter: ${name} - ${iface.address}`);
          return iface.address;
        }
      }
    }
  }
  
  // Priority 2: Look for typical home/office IP ranges
  const wifiPatterns = [
    /^192\.168\.[01]\./,  // 192.168.0.x or 192.168.1.x
    /^10\./,              // 10.x.x.x
    /^172\.(1[6-9]|2[0-9]|3[01])\./  // 172.16-31.x.x
  ];
  
  for (const pattern of wifiPatterns) {
    for (const name of Object.keys(interfaces)) {
      // Skip virtual adapters
      if (name.toLowerCase().includes('virtualbox') || 
          name.toLowerCase().includes('vmware') || 
          name.toLowerCase().includes('hyper-v') ||
          name.toLowerCase().includes('vethernet') ||
          name.toLowerCase().includes('docker')) {
        continue;
      }
      
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          if (pattern.test(iface.address)) {
            console.log(`✅ Using network IP: ${name} - ${iface.address}`);
            return iface.address;
          }
        }
      }
    }
  }
  
  // Fallback: First non-internal IPv4 (if nothing else works)
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`⚠️  Using fallback IP: ${name} - ${iface.address}`);
        return iface.address;
      }
    }
  }
  
  return 'localhost';
}

// Create HTTPS server with certificates
const server = https.createServer({
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
}, (req, res) => {
  res.writeHead(200);
  res.end('WebSocket Server Running (HTTPS)');
});

const wss = new WebSocket.Server({ server });

// Store connected clients and rooms
const clients = new Map();
const rooms = new Map();

// ... rest of your code stays exactly the same ...
// (All the wss.on, handleJoin, handleSignal, etc.)

wss.on('connection', (ws) => {
  console.log('✅ New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case 'join':
          handleJoin(ws, data);
          break;
        case 'signal':
          handleSignal(ws, data);
          break;
        case 'leave':
          handleLeave(ws);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    handleLeave(ws);
    console.log('👋 Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function handleJoin(ws, data) {
  const { username, roomId } = data;
  const userId = generateUserId();

  clients.set(ws, { userId, username, roomId });

  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId).add(ws);

  const existingUsers = Array.from(rooms.get(roomId))
    .filter(client => client !== ws)
    .map(client => {
      const info = clients.get(client);
      return { userId: info.userId, username: info.username };
    });

  ws.send(JSON.stringify({
    type: 'room-joined',
    roomId,
    userId,
    users: existingUsers
  }));

  broadcastToRoom(roomId, {
    type: 'user-joined',
    userId,
    username
  }, ws);

  updateUserList(roomId);

  console.log(`👤 ${username} joined room: ${roomId}`);
}

function handleSignal(ws, data) {
  const sender = clients.get(ws);
  if (!sender) return;

  const { targetId, signal } = data;

  for (const [client, info] of clients.entries()) {
    if (info.userId === targetId && info.roomId === sender.roomId) {
      client.send(JSON.stringify({
        type: 'signal',
        fromId: sender.userId,
        signal
      }));
      break;
    }
  }
}

function handleLeave(ws) {
  const clientInfo = clients.get(ws);
  if (!clientInfo) return;

  const { userId, username, roomId } = clientInfo;

  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(ws);

    if (rooms.get(roomId).size === 0) {
      rooms.delete(roomId);
      console.log(`🗑️  Room ${roomId} is now empty and removed`);
    } else {
      broadcastToRoom(roomId, {
        type: 'user-left',
        userId,
        username
      });
      updateUserList(roomId);
      console.log(`👋 ${username} left room: ${roomId}`);
    }
  }

  clients.delete(ws);
}

function broadcastToRoom(roomId, message, excludeWs = null) {
  if (!rooms.has(roomId)) return;

  const messageStr = JSON.stringify(message);
  rooms.get(roomId).forEach(client => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

function updateUserList(roomId) {
  if (!rooms.has(roomId)) return;

  const users = Array.from(rooms.get(roomId)).map(client => {
    const info = clients.get(client);
    return { userId: info.userId, username: info.username };
  });

  broadcastToRoom(roomId, {
    type: 'user-list',
    users
  });
}

function generateUserId() {
  return Math.random().toString(36).substr(2, 9);
}

// Listen on all network interfaces (0.0.0.0)
server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIpAddress();
  
  console.log('\n🚀 WebSocket Server Running (HTTPS):\n');
  console.log(`   ➜  Local:   https://localhost:${PORT}`);
  console.log(`   ➜  Network: https://${localIp}:${PORT}\n`);
  console.log('📱 Access from other devices on your WiFi:');
  console.log(`   Open: https://${localIp}:${PORT}\n`);
  console.log('✅ Server ready for connections\n');
  console.log('💡 Note: You may need to accept the self-signed certificate');
  console.log('   on each device that connects.\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down gracefully...');
  
  wss.clients.forEach(client => {
    client.close();
  });
  
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  
  wss.clients.forEach(client => {
    client.close();
  });
  
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
