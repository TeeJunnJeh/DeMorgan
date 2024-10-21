const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const promotions = [
  "⚡ Best Seller Alert: Decadent Caramelized Vanilla Bean Pudding is a must-try!",
  "🔥 Most Popular Today: Our Crispy Soft Shell Crab is the top pick for today!",
  "🚀 Most Ordered: Enjoy the Honey Glazed Prawn, our most frequently ordered Dessert!",
];

server.on('connection', (ws) => {
  console.log('Client connected');

  // Send a promotion every 10 seconds
  let promotionIndex = 0;
  setInterval(() => {
    const promotionMessage = promotions[promotionIndex];
    ws.send(JSON.stringify({ type: 'PROMOTION', message: promotionMessage }));
    promotionIndex = (promotionIndex + 1) % promotions.length;
  }, 10000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running');
