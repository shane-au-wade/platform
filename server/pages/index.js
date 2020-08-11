//import Head from 'next/head'
import Link from 'next/link'
import {
  Paper,
  Button,
  } from '@material-ui/core';

export default function Home() {
  return (
    <div>
      <Paper style={{height: '200px', width: '200px', margin: '0 auto', marginTop: 'calc(100vh - 100vh*0.5 - 100px)', textAlign: 'center'}}elevation={3}>
        <Link href='/spyfall'>
          <Button style={{background: '#fff', color: '#000', height: '36px', marginTop: 'calc(100% * 0.5 - 18px '}}>
            Player Spyfall
          </Button>
        </Link>
        <br/>
        <br/>
        <a href='https://www.spyfall.app/gamerules' style={{color: '#F9DAFE'}}>
          What is Spyfall?
        </a>
      </Paper>
    </div>
  )
}
