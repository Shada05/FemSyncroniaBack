const doctors  = require('../models').doctors;

exports.store = async (req, res) => {
    const doctor = {
        
        username: req.body.username,
        lastname: req.body.lastname,
        doctor_status: req.body.doctor_status,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        token: req.body.token,
        specialty: req.body.specialty
        
    }
    console.log(doctor);

    doctors.create(doctor).then(
        doctor => res.status(200).send(doctor)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await doctors.findAll({

    }).then(
        doctors => res.status(200).send(doctors)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const doctor = await doctors.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(doctor);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await doctors.destroy({
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

    if (req.body.username != null) updatedData['username']= req.body.username;
    if (req.body.lastname != null) updatedData['lastname']= req.body.lastname;
    if (req.body.doctor_status != null) updatedData['doctor_status']= req.body.doctor_status;
    if (req.body.email != null) updatedData['email']= req.body.email;
    if (req.body.password != null) updatedData['password']= req.body.password;
    if (req.body.phone != null) updatedData['phone']= req.body.phone;
    if (req.body.token != null) updatedData['token']= req.body.token;
    if (req.body.specialty != null) updatedData['specialty']= req.body.specialty;

    return await doctors.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await doctors.findOne({where: {id}})
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