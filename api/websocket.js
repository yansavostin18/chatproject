import WebSocket from 'ws';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const ws = new WebSocket.Server({ noServer: true });

        ws.on('connection', (socket) => {
            console.log('New client connected');
            
            socket.on('message', (message) => {
                console.log(`Received: ${message}`);
                // Отправка сообщения всем подключённым клиентам
                ws.clients.forEach((client) => {
                    if (client !== socket && client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            });

            socket.on('close', () => {
                console.log('Client disconnected');
            });
        });

        // Обработка WebSocket-соединения
        res.socket.server.on('upgrade', (request, socket, head) => {
            ws.handleUpgrade(request, socket, head, (ws) => {
                ws.emit('connection', ws, request);
            });
        });

        res.status(200).json({ message: 'WebSocket server is running' });
    } else {
        res.status(404).send('Not found');
    }
}
