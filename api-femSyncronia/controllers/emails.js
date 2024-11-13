const emails  = require('../models').emails;

exports.store = async (req, res) => {
    const email = {
        app_id: req.body.app_id,
        main: req.body.main,
        type: req.body.type,
        host: req.body.host,
        port: req.body.port,
        username: req.body.username,
        password: req.body.password,
        encryption: req.body.encryption,
        from_name: req.body.from_name,
        from_address: req.body.from_address,
    }
    console.log(email);

    emails.create(email).then(
      email => res.status(200).send(email)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await emails.findAll({

    }).then(
        emails => res.status(200).send(emails)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const email = await emails.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(email);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await emails.destroy({
        where: {
            id: id
        }
    }).then(
        deleted => {
            if (deleted) {
                res.status(200).send({ message: 'correo eliminado con éxito' });
            } else {
                res.status(404).send({ message: 'correo no encontrado' });
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

    if (req.body.app_id != null) updatedData['app_id']= req.body.app_id;
    if (req.body.main != null) updatedData['main']= req.body.main;
    if (req.body.type != null) updatedData['type']= req.body.type;
    if (req.body.host != null) updatedData['host']= req.body.host;
    if (req.body.port != null) updatedData['port']= req.body.port;
    if (req.body.username != null) updatedData['username']= req.body.username;
    if (req.body.password != null) updatedData['password']= req.body.password;
    if (req.body.encryption != null) updatedData['encryption']= req.body.encryption;
    if (req.body.from_name != null) updatedData['from_name']= req.body.from_name;
    if (req.body.from_address != null) updatedData['from_address']= req.body.from_address;
    return await emails.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await emails.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: userUpd });
            } else {
                res.status(404).send({ message: 'Correo no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};