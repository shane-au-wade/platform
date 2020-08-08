import React, { Component, ReactNode } from 'react'

interface Props {}
interface State {}

class Index extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            
        }
    }

    render(): ReactNode {
        return (
            <div>
                hello spyfall
            </div>
        )
    }
}

export default Index
