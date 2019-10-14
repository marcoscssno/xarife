import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm } from 'redux-form'

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
    title: {
        marginBottom: "16px"
    },
    input: {
        marginBottom: "16px"
    },
}

const validate = values => {
    const errors = {}
    const requiredFields = [
        'nome_por_extenso',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obrigatório'
        }
    })
    return errors
}

const renderTextField = ({
    input,
    meta: {touched, error},
    ...custom
}) => (
        <TextField
            {...input}
            error={touched && error && true}
            {...custom}
        />
    )

let NovaDivisaoForm = props => {
    const { handleSubmit, classes } = props

    return (
        <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
            <Card>
                <CardContent>
                    <Typography variant="h4" className={classes.title}>Nova Divisão</Typography>
                        <Field name="nome_por_extenso" component={renderTextField} type="text" label="Usuário" className={classes.input} />
                </CardContent>
                <CardActions>
                    <Button size="large" type="submit" color="primary" variant="contained">Teste</Button>
                </CardActions>
            </Card>
        </form>
    )
}

NovaDivisaoForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

NovaDivisaoForm = reduxForm({
    form: 'login',
    validate
})(withStyles(styles)(NovaDivisaoForm))

NovaDivisaoForm = connect()(NovaDivisaoForm)

export default NovaDivisaoForm