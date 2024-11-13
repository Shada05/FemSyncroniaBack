const reports  = require('../models').reports;

exports.store = async (req, res) => {
    const report = {
        
        doctor_id: req.body.doctor_id,
        patient_data_id: req.body.patient_data_id,
        pdf_path: req.body.pdf_path,
        generation_date: req.body.generation_date
           
    }
    console.log(report);

    reports.create(report).then(
        report => res.status(200).send(report)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await reports.findAll({

    }).then(
        reports => res.status(200).send(reports)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const report = await reports.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(report);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await reports.destroy({
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

    if (req.body.doctor_id != null) updatedData['doctor_id']= req.body.doctor_id;
    if (req.body.patient_data_id != null) updatedData['patient_data_id']= req.body.patient_data_id;
    if (req.body.pdf_path != null) updatedData['pdf_path']= req.body.pdf_path;
    if (req.body.generation_date != null) updatedData['generation_date']= req.body.generation_date;

    return await reports.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await reports.findOne({where: {id}})
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