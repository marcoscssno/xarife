import React from 'react'
import Layout from './components/Layout'

import Typography from '@material-ui/core/Typography'

class About extends React.Component {
    render () {
        return (
            <Layout>
                <Typography variant="h2" component="h2">About</Typography>
            </Layout>
        )
    }
}

export default About