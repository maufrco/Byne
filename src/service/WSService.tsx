
import React, { useRef } from 'react'
// Singleton
export class WSService extends React.Component<any> {
    private static instance: WSService;
    static url = `${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`
    public ws = useRef<WebSocket>(new WebSocket(WSService.url))

    public static init (): void {
      if (WSService.instance.ws.current) {
        WSService.instance.ws.current.close()
      }
      WSService.instance.ws.current = new WebSocket(this.url)
    }
    
    public static getInstance (): WSService {
      if (!WSService.instance) {
        WSService.instance = new WSService({})
      }
      return WSService.instance
    }
}
