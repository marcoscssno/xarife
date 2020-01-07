import React from 'react'
import PropTypes from 'prop-types'

import { Field, FieldArray, reduxForm } from 'redux-form'
import { createTextMask } from 'redux-form-input-masks'

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
    },
    flex: {
        flex: 1
    },
    space: {
        margin: theme.spacing.unit,
    },
    grow: {
        flexGrow: 1
    }
})

const myCustomMaskDefinitions = {
    9: {
        regExp: /[0-9]/,
    },
    X: {
        regExp: /[0-9Xx]/,
        transform: char => char.toUpperCase(),
    },
}

const matriculaMask = createTextMask({
    pattern: '999.999-9-X',
    maskDefinitions: myCustomMaskDefinitions,
    guide: false
})

const telefoneMask = createTextMask({
    pattern: '(99) 9999-9999',
    guide: false,
    allowEmpty: true
})

const validate = values => {
    const errors = {}
    const requiredFields = [
        'nome',
        'matricula'
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
    type,
    meta: { touched, error },
    ...custom
}) => (
        <TextField
            variant="outlined"
            error={touched && error && true}
            type={type}
            {...input}
            {...custom}
        />
    )

const renderTelefones = ({ fields, meta: { touched, error }, classes }) => (
    <div>
        {fields.map((telefone, index) => (
            <div key={index} className={classes.root}>
                <Field className={classes.space} name={`${telefone}.tipo`} component={renderTextField} type="text" label="Tipo" />
                <Field className={classes.space} name={`${telefone}.numero`} component={renderTextField} type="tel" label="Telefone" {...telefoneMask} />
                {fields.length > 1 && (<Button className={classes.space} type="button" onClick={() => fields.remove(index)}>Remover</Button>)}
            </div>
        ))}
        <Button className={classes.space} type="button" onClick={() => {fields.push()}}>Adicionar telefone</Button>
    </div>
)

const radioButton = ({ input, ...rest }) => (
    <FormControl>
        <RadioGroup {...input} {...rest}>
            <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
            <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
        </RadioGroup>
    </FormControl>
)

let EditarAgenteForm = props => {
    const { handleSubmit, classes, isLoading, success, message } = props
    console.log(props.initialValues)
    return (
        <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="h6">Editar Agente</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">{message}</Typography>
                </Grid>
                <Grid item md={9} sm={12} xs={12}>
                    <Field fullWidth name="nome" component={renderTextField} type="text" label="Nome completo" />
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <Field fullWidth name="matricula" component={renderTextField} type="text" label="Matrícula" {...matriculaMask} />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="body1">Sexo:</Typography>
                    <Field name="sexo" component={radioButton}>
                        <Radio value="masculino" label="Masculino" />
                        <Radio value="feminino" label="Feminino" />
                    </Field>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Field fullWidth name="mae" component={renderTextField} type="text" label="Mãe" />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Field fullWidth name="pai" component={renderTextField} type="text" label="Pai" />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <FieldArray name="telefone" component={renderTelefones} classes={classes} />
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={isLoading} type="submit" color="primary" variant="contained">
                        {isLoading ? (
                            <CircularProgress className={classes.progress} size={24} />
                        ) : (
                                "Cadastrar"
                            )}
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.agentes.loading,
        success: state.agentes.success,
        message: state.agentes.message,
        initialValues: state.agentes.agente
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAgente: (id) => dispatch(getAgente(id))
    }
}

EditarAgenteForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
}

EditarAgenteForm = reduxForm({
    form: 'editarAgente',
    validate
})(withStyles(styles)(EditarAgenteForm))

EditarAgenteForm = connect(mapStateToProps, mapDispatchToProps)(EditarAgenteForm)

export default EditarAgenteForm