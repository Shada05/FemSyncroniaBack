const symptoms  = require('../models').symptoms;

exports.store = async (req, res) => {
    const sympt = {
        
        name: req.body.name,
        symptom_name: req.body.symptom_name,
        frequency: req.body.frequency

    }
    console.log(sympt);

    symptoms.create(sympt).then(
        sympt => res.status(200).send(sympt)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await symptoms.findAll({

    }).then(
        symptoms => res.status(200).send(symptoms)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const sympt = await symptoms.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(sympt);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await symptoms.destroy({
        where: {
            id: id
        }
    }).then(
        deleted => {
            if (deleted) {
                res.status(200).send({ message: 'data eliminado con éxito' });
            } else {
                res.status(404).send({ message: 'data no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};

exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    let updatedData = {};

    if (req.body.name != null) updatedData['name']= req.body.name;
    if (req.body.symptom_name != null) updatedData['symptom_name']= req.body.symptom_name;
    if (req.body.frequency != null) updatedData['frequency']= req.body.frequency;

    return await symptoms.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await symptoms.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: userUpd });
            } else {
                res.status(404).send({ message: 'data no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};