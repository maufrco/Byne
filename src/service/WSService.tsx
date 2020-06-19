
import React, { useRef } from 'react'
// Singleton
export class WSService extends React.Component<any> {
    private static instance: WSService;
    public ws = useRef<WebSocket>(new WebSocket(`${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`, 'json'))

    public onopoen = this.ws.current.onopen = () => {
      try {
        console.log('CONNECTING')
        return
      } catch (error) {
        console.error(error)
      }
    }

    public static getInstance (): WSService {
      if (!WSService.instance) {
        WSService.instance = new WSService({})
      }
      return WSService.instance
    }
}
