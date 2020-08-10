import React, { Component, ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import io from 'socket.io-client';
import {Table, 
        TableHead,
        TableRow,
        TableBody,
        TableCell,
        Card,
        Button,
        } from '@material-ui/core';
 
import { withStyles } from '@material-ui/core/styles';

import SimpleDialog from '../../../public/components/dialog'

interface Props {}
interface State {}

const styles = theme => ({
root: {
    height: '100vh',
    width: '100vw',
   
},
centerContainer: {
    minWidth: 275,
    maxWidth: 500,
    margin: '0 auto',
    height: '100%',
    overflow: 'scroll', 
    textAlign: 'center'
}, 
inputContainer: {
    display: 'flex',
    flexDirection: 'column'
}, 
title: {
    width: '100%',
    textAlign: 'center',
    padding: 10
}, 
spacer: {
    height: '30%'
},
startButton: {
    width: '200px',
    margin: '0 auto',
    marginBottom: '20px'
}
});

class gameRoom extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        
        this.state = {
            gameCode: props.id.toUpperCase(), 
            players: [],
            myName: '', 
            timer: 8, 
            locations: [],
            gameState: 'GAME',
            dialogOpen: false,
            blurOnDialogToggle: {}
        }
    }

    componentDidMount = async () => {

        let myName = localStorage.getItem('myName')

        const socket = io.connect('/spyfall/socket');

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
          });

        socket.emit('join', { gameCode: this.state.gameCode });

        socket.emit('newPlayer', {name: myName, room: this.state.gameCode})

        socket.on('updatePlayers',  (data) => {
            console.log('updating players arr')
           let state = {}
           state.players = data.players
           this.setState(state)
        })

           // update game code

           let res = await fetch('http://localhost:4000/api/spyfall/getLocations')
            let locations = await res.json()

           let state = {}
           state.myName = myName
           state.locations = locations
           this.setState(state);
           console.log(this.state)
    }

    handleChange = (event) => {
        //console.log(event.target.id)
        event.target.value = event.target.value.toUpperCase()
        let state = {}
        state[event.target.id] = event.target.value
        this.setState(state);
    }

    handleJoin = () => {
        console.log(this.state)
    } 

    handleTimeSelect = (event) => {
        console.log(event.target.value)
    }

    enableStart = () => {
        let state = {}
        state.startButton = { background: 'rgba(52, 235, 110, 0.9)'}
        state.disableStart = false
        this.setState(state);
    }

    handleClose = () => {
        let state = {}
        state.dialogOpen = false
        state.blurOnDialogToggle = {back}
        this.setState(state);
      };

    handleClickOpen = () => {
        let state = {}
        state.dialogOpen = true
        this.setState(state);
    };

    render(): ReactNode {
        const { classes } = this.props;

        let players = [{name:'shane'}, {name: 'jon'}, {name: 'alex'}]


        if(this.state.gameState === 'PREGAME')
        {
                return (
                <div className={classes.root}>
                <Card className={classes.centerContainer}>
                    <div className={classes.title}>
                            Spyfall

                            <h1>{this.state.gameCode}</h1>
                    </div>
                

                    <div className={classes.inputContainer}>
                        {/* <TextField id="gameCode" label="Game Code" autoCorrect='off' spellCheck="false" onChange={this.handleChange} style={{width: '200px', margin: '0 auto', marginBottom: '20px'}}></TextField>
                        <TextField id="name" label="Name" autoCorrect='off' spellCheck="false" onChange={this.handleChange}  style={{width: '200px', margin: '0 auto', marginBottom: '20px'}}></TextField> */}

                        {/* Players table that will be updated with socket.io */}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Players</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                this.state.players.map(player => <TableRow key={player.name}>
                                                        <TableCell align="center" >{player.name}</TableCell>
                                                    </TableRow>)
                                }
                            </TableBody>
                        </Table>

                        {/* time select options */}
                        {/* <FormControl style={{width: '100px', margin: '0 auto', marginTop: '20px', marginBottom: '20px'}}>
                            <InputLabel>Timer</InputLabel>
                            <NativeSelect
                            onChange={this.handleTimeSelect}
                            name='timer'
                            defaultValue={8}
                            >
                                <option value={6}>6:00</option>
                                <option value={7}>7:00</option>
                                <option value={8}>8:00</option>
                                <option value={9}>9:00</option>
                                <option value={10}>10:00</option>
                            </NativeSelect>
                        </FormControl> */}
                    </div>
                        
                </Card> 
                </div>
            )
        } else { // game time
            return (
                <div className={classes.root}  style={this.state.blurOnDialogToggle}>
                    {console.log(this.state.locations)}
                <Card className={classes.centerContainer}>
                    <div className={classes.title}>
                            Spyfall: <span>{this.state.gameCode}</span>
                    </div>
                
                <Button color='secondary' onClick={this.handleClickOpen} style={{background: 'white', marginBottom: '20px'}}>
                    Show Role
                </Button>

                

                    <div className={classes.inputContainer}>
                        {/* <TextField id="gameCode" label="Game Code" autoCorrect='off' spellCheck="false" onChange={this.handleChange} style={{width: '200px', margin: '0 auto', marginBottom: '20px'}}></TextField>
                        <TextField id="name" label="Name" autoCorrect='off' spellCheck="false" onChange={this.handleChange}  style={{width: '200px', margin: '0 auto', marginBottom: '20px'}}></TextField> */}

                        {/* Players table that will be updated with socket.io */}
                        <div style={{display:'flex', flexWrap:'wrap', textAlign: 'left'}}>
                            {
                                this.state.locations.map(element => <div style={{width:'50%', paddingLeft: '20px'}} key={element.location}>
                                                       {element.location}
                                                    </div>)
                                }
                        </div>
                    </div>

                    <SimpleDialog open={this.state.dialogOpen} onClose={this.handleClose} ></SimpleDialog>
                        
                </Card> 
            </div>
            )

        }

       
    }
}

export default withStyles(styles, { withTheme: true })(gameRoom)


export const getServerSideProps: GetServerSideProps = async (context) => {
    
    return {
        props: {id: context.params.shortid}
      }
  }