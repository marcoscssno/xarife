import _ from 'lodash'

export function titleCase (nome) {
    const novoNome = _.replace(_.startCase(_.toLower(nome)), /\b(De|Da|Das|Do|Dos)\b/g, x => _.toLower(x))
    return novoNome
}

export function desenfeitarMatricula (matricula) {
    const novaMatricula = _.replace(matricula, /(\.| |\-)/g, '')
    return novaMatricula
}

export function enfeitarMatricula (matricula) {
    const novaMatricula = _.replace(matricula, /(\d{3})(\d{3})(\d{1})([0-9a-zA-Z])/g, "\$1.\$2.\$3\-\$4")
    return novaMatricula
}