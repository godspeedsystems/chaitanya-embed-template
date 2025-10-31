import { io, Socket } from 'socket.io-client';
import env from '@/env';

class SocketService {
  private static instance: SocketService;
  public socket: Socket;

  private constructor() {
    this.socket = io(env.socketUrl, {
      transports: ['websocket'],
      autoConnect: false, // We will manually connect
      auth: {
        'x-user-id': env.userId,
      },
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect() {
    if (!this.socket.connected) {
      // Update auth/headers before connecting
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public on(event: string, fn: (...args: any[]) => void) {
    this.socket.on(event, fn);
  }

  public off(event: string, fn?: (...args: any[]) => void) {
    this.socket.off(event, fn);
  }

  public emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args);
  }
}

export const socketService = SocketService.getInstance();
export const socket = socketService.socket;
