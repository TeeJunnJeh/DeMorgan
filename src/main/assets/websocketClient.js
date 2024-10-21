import { useEffect } from 'react';

export const useWebSocket = (setPromotionMessage) => {
  useEffect(() => {
    const ws = new WebSocket('ws://10.0.2.2:8080'); 

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'PROMOTION') {
        setPromotionMessage(data.message);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, [setPromotionMessage]);
};
