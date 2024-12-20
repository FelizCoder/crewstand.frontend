import { useState, useEffect } from 'react';
import { getWebsocketBase } from '../utils/getWebsocketBase';

interface WebSocketConfig {
  hostname: string;
  route: string;
}

interface WebSocketData<T> {
  data: T | undefined;
  error: Error | null;
}

const useWebSocket = <T>({
  hostname,
  route,
}: WebSocketConfig): WebSocketData<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [backendUri, setBackendUri] = useState<string | undefined>(undefined);
  const [, setSocket] = useState<WebSocket | null>(null);
  
  useEffect(() => {
    async function getAndSetBackendUri() {
      const backendUri = await getWebsocketBase(hostname);
      setBackendUri(backendUri);
    }
    getAndSetBackendUri();
  }, [hostname]);
  
  useEffect(() => {
    if (!backendUri) return;
    
    const ws_url = backendUri + route;
    const ws = new WebSocket(ws_url);
    
    ws.onopen = () => {
      console.debug('WebSocket Connection Opened');
    };
    
    ws.onmessage = (event: WebSocketEventMap['message']) => {
      try {
        console.debug('WebSocket Message Received', event.data);
        const message: T = JSON.parse(event.data);
        console.debug('Parsed Message:', message);
        setData(message);
        if (error) {
          setError(null);
        }
      } catch (error) {
        const error_msg = Error('Invalid JSON received from WebSocket: ' + String(error));
        setError(error_msg);
      }
    };
    
    ws.onerror = (event: WebSocketEventMap['error']) => {
      const error_msg = Error('WebSocket Error: ' + String(event));
      setError(error_msg);
    };
    
    ws.onclose = (event: WebSocketEventMap['close']) => {
      console.debug('WebSocket Connection Closed', event.reason);
      setData(undefined);
    };
    
    setSocket(ws);
    
    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [backendUri, route]);
  
  return { data, error };
};

export default useWebSocket;
