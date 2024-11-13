const cycle_symptoms  = require('../models').cycle_symptoms;

exports.store = async (req, res) => {
    const cycle = {
        
        cycle_id: req.body.cycle_id,
        symptom_id: req.body.symptom_id
       
        
    }
    console.log(cycle);

    cycle_symptoms.create(cycle).then(
        cycle => res.status(200).send(cycle)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await cycle_symptoms.findAll({

    }).then(
        cycle_symptoms => res.status(200).send(cycle_symptoms)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const cycle = await cycle_symptoms.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(cycle);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await cycles.destroy({
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

    if (req.body.cycle_id != null) updatedData['cycle_id']= req.body.cycle_id;
    if (req.body.symptom_id != null) updatedData['symptom_id']= req.body.symptom_id;


    return await cycle_symptoms.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await cycles.findOne({where: {id}})
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