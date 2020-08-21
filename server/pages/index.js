//import Head from 'next/head'
import Link from 'next/link'
import {
  Paper,
  Button,
  IconButton,
  Avatar, 
  Typography
  } from '@material-ui/core';
import ProfileTile from '../public/components/profileTile'
import SocialConnections from '../public/components/socialConnections'


export default function Home() {
  return (
    <div>

      {/* landing image */}
      <ProfileTile
      ></ProfileTile>
      
        {/* experience */}
        <Paper style={{padding:20}}>
          <div>
            <div>
            Lacroix Boards co
            </div> 
             Full Stack Software Engineer
          </div>
          <br/>
          <div>
            <div>
              OSHU LLC
            </div>
            Web Task Automation
          </div>
          <br/>
          <div>
            <div>
              KeepTruckin
            </div>
            Data Engineering Intern
          </div>
        </Paper>

        {/* projects */}
        <Paper style={{padding:20}}>
          <div>
            Gator Groceries
          </div>
          <br/>
          <div>
            Portable Electric Vehicles
          </div>

        </Paper>

        {/* Philosphy */}

        {/* Contact me */}
        <SocialConnections
          github='https://github.com/shane-au-wade'
          linkedin='https://www.linkedin.com/in/shane-au-wade/'
          instagram='https://www.instagram.com/shane_creates/'
        ></SocialConnections>

        
    </div>
  )
}
