import React from 'react'
import Layout from './components/Layout'

import Typography from '@material-ui/core/Typography'

class HomePage extends React.Component {
    render () {
        return (
            <Layout>
                <Typography variant="h3" component="h2">Welcome!</Typography>
            </Layout>
        )
    }
}

export default HomePage